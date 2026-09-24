export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      destinations: {
        Row: {
          country: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
        }
        Insert: {
          country: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
        }
        Update: {
          country?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
        }
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          role: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          role?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          role?: string
        }
      }
      tours: {
        Row: {
          created_at: string
          description: string | null
          destination_id: string
          difficulty: string
          duration_days: number
          id: string
          image_url: string | null
          is_featured: boolean
          price: number
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          destination_id: string
          difficulty: string
          duration_days: number
          id?: string
          image_url?: string | null
          is_featured?: boolean
          price: number
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          destination_id?: string
          difficulty?: string
          duration_days?: number
          id?: string
          image_url?: string | null
          is_featured?: boolean
          price?: number
          title?: string
        }
      }
      user_preferences: {
        Row: {
          created_at: string
          id: string
          preferred_budget: string | null
          preferred_difficulty: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          preferred_budget?: string | null
          preferred_difficulty?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          preferred_budget?: string | null
          preferred_difficulty?: string | null
          user_id?: string
        }
      }
      wishlists: {
        Row: {
          id: string
          user_id: string
          tour_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tour_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tour_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
