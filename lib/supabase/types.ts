
// task5 project adjust

// optimize code detail
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: { id: string; slug: string; name: string; sort_order: number }
        Insert: { id?: string; slug: string; name: string; sort_order?: number }
        Update: { slug?: string; name?: string; sort_order?: number }
        Relationships: []
      }
      products: {
        Row: {
          id: string
          category_slug: string
          slug: string
          name: string
          description: string | null
          image_path: string | null
          price_hint: string | null
          external_url: string | null
          is_active: boolean
          updated_at: string
        }
        Insert: {
          id: string
          category_slug: string
          slug: string
          name: string
          description?: string | null
          image_path?: string | null
          price_hint?: string | null
          external_url?: string | null
          is_active?: boolean
          updated_at?: string
        }
        Update: {
          category_slug?: string
          slug?: string
          name?: string
          description?: string | null
          image_path?: string | null
          price_hint?: string | null
          external_url?: string | null
          is_active?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      journal_posts: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string | null
          body: string
          published_at: string | null
          updated_at: string
        }
        Insert: {
          id: string
          slug: string
          title: string
          excerpt?: string | null
          body: string
          published_at?: string | null
          updated_at?: string
        }
        Update: {
          slug?: string
          title?: string
          excerpt?: string | null
          body?: string
          published_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      farm_regions: {
        Row: {
          id: string
          slug: string
          title: string
          description: string | null
          image_path: string | null
          cta_label: string | null
          cta_href: string | null
          x: number
          y: number
        }
        Insert: {
          id: string
          slug: string
          title: string
          description?: string | null
          image_path?: string | null
          cta_label?: string | null
          cta_href?: string | null
          x: number
          y: number
        }
        Update: {
          slug?: string
          title?: string
          description?: string | null
          image_path?: string | null
          cta_label?: string | null
          cta_href?: string | null
          x?: number
          y?: number
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          user_id: string
          preferred_categories: string[]
          updated_at: string
        }
        Insert: {
          user_id: string
          preferred_categories: string[]
          updated_at?: string
        }
        Update: { preferred_categories?: string[]; updated_at?: string }
        Relationships: []
      }
      inquiries: {
        Row: {
          id: string
          user_id: string | null
          product_id: string | null
          category_slug: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          product_id?: string | null
          category_slug: string
          message: string
          created_at?: string
        }
        Update: {
          user_id?: string | null
          product_id?: string | null
          category_slug?: string
          message?: string
        }
        Relationships: []
      }
      sync_runs: {
        Row: {
          id: string
          status: "success" | "error"
          source: string
          message: string | null
          ran_at: string
        }
        Insert: {
          id?: string
          status: "success" | "error"
          source: string
          message?: string | null
          ran_at?: string
        }
        Update: {
          status?: "success" | "error"
          source?: string
          message?: string | null
          ran_at?: string
        }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}

// task4 project adjust
