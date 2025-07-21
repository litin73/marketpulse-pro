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
      alerts: {
        Row: {
          id: string
          user_id: string
          symbol: string
          trigger_type: 'price' | 'ath'
          trigger_value: number
          is_fired: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          symbol: string
          trigger_type: 'price' | 'ath'
          trigger_value: number
          is_fired?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          symbol?: string
          trigger_type?: 'price' | 'ath'
          trigger_value?: number
          is_fired?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      news: {
        Row: {
          id: string
          symbol: string
          title: string
          url: string
          source: string
          published_at: string
          created_at: string
        }
        Insert: {
          id?: string
          symbol: string
          title: string
          url: string
          source: string
          published_at: string
          created_at?: string
        }
        Update: {
          id?: string
          symbol?: string
          title?: string
          url?: string
          source?: string
          published_at?: string
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          user_id: string
          symbol: string
          text: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          symbol: string
          text: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          symbol?: string
          text?: string
          created_at?: string
        }
      }
      checklist_items: {
        Row: {
          id: string
          user_id: string
          text: string
          is_completed: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          text: string
          is_completed?: boolean
          sort_order: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          text?: string
          is_completed?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
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
