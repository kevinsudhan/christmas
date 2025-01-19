-- Clean up existing objects
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users CASCADE;
DROP TRIGGER IF EXISTS update_customers_updated_at ON public.customers CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_customer() CASCADE;
DROP FUNCTION IF EXISTS public.generate_customer_id() CASCADE;
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;
DROP TABLE IF EXISTS public.customers CASCADE;
DROP SEQUENCE IF EXISTS customer_id_seq CASCADE;

-- Create sequence
CREATE SEQUENCE customer_id_seq START 1;

-- Create customers table
CREATE TABLE public.customers (
    id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    customer_id TEXT UNIQUE,
    full_name TEXT,
    email TEXT,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for own profile" ON public.customers
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Enable insert for authenticated users" ON public.customers
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Function to generate customer ID
CREATE OR REPLACE FUNCTION public.generate_customer_id() 
RETURNS TEXT AS $$
DECLARE
    new_id TEXT;
BEGIN
    new_id := 'EBS-' || 
              to_char(CURRENT_DATE, 'YY') || '-' ||
              LPAD(nextval('customer_id_seq')::TEXT, 4, '0');
    RETURN new_id;
EXCEPTION WHEN OTHERS THEN
    RAISE LOG 'Error in generate_customer_id: %', SQLERRM;
    RAISE;
END;
$$ LANGUAGE plpgsql;

-- Function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_customer()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    new_customer_id TEXT;
BEGIN
    -- Generate customer ID first to handle any errors
    new_customer_id := public.generate_customer_id();
    
    IF new_customer_id IS NULL THEN
        RAISE EXCEPTION 'Failed to generate customer ID';
    END IF;

    BEGIN
        INSERT INTO public.customers (id, customer_id, full_name, email, phone)
        VALUES (
            NEW.id,
            new_customer_id,
            NEW.raw_user_meta_data->>'full_name',
            NEW.email,
            NEW.raw_user_meta_data->>'phone'
        );
    EXCEPTION WHEN OTHERS THEN
        RAISE LOG 'Error in handle_new_customer: %', SQLERRM;
        RAISE;
    END;

    RETURN NEW;
END;
$$;

-- Create trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_customer();

-- Grant permissions
GRANT USAGE ON SEQUENCE customer_id_seq TO service_role;
GRANT ALL ON public.customers TO service_role;
GRANT ALL ON public.customers TO authenticated;
