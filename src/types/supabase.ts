export interface Database {
  public: {
    Tables: {
      applications: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone_number: string;
          loan_amount: number;
          address: string;
          bank_details: {
            bank_name: string;
            account_number: string;
            ifsc_code: string;
          };
          status: 'pending' | 'contacted' | 'approved' | 'rejected';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['applications']['Row'], 'id' | 'created_at' | 'updated_at' | 'status'>;
        Update: Partial<Database['public']['Tables']['applications']['Row']>;
      };
    };
  };
}
