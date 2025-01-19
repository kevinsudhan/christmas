export interface Database {
  public: {
    Tables: {
      applications: {
        Row: {
          id: string;
          customer_id: string;
          firstname: string;
          middlename?: string;
          lastname: string;
          email: string;
          mobilenumber: string;
          currentcompany: string;
          monthlysalary: number;
          nettakehome: number;
          bankingdetails: string;
          producttype: string;
          status: 'pending' | 'completed' | 'acknowledged' | 'processing';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['applications']['Row'], 'id' | 'created_at' | 'updated_at' | 'status'>;
        Update: Partial<Database['public']['Tables']['applications']['Row']>;
      };
      customers: {
        Row: {
          id: string;
          customer_id: string;
          full_name: string;
          email: string;
          phone_number: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['customers']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['customers']['Row']>;
      };
    };
  };
}
