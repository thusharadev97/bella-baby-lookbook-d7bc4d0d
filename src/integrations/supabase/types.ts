export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      article_submissions: {
        Row: {
          admin_notes: string | null
          author_email: string | null
          author_id: string
          author_name: string | null
          backlinks: Json
          body: string
          category: string
          cover_image_url: string | null
          created_at: string
          decided_at: string | null
          excerpt: string | null
          id: string
          keywords: string | null
          region_focus: string | null
          slug: string | null
          status: Database["public"]["Enums"]["submission_status"]
          submitted_at: string
          title: string
          updated_at: string
          word_count: number
        }
        Insert: {
          admin_notes?: string | null
          author_email?: string | null
          author_id: string
          author_name?: string | null
          backlinks?: Json
          body: string
          category: string
          cover_image_url?: string | null
          created_at?: string
          decided_at?: string | null
          excerpt?: string | null
          id?: string
          keywords?: string | null
          region_focus?: string | null
          slug?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          submitted_at?: string
          title: string
          updated_at?: string
          word_count?: number
        }
        Update: {
          admin_notes?: string | null
          author_email?: string | null
          author_id?: string
          author_name?: string | null
          backlinks?: Json
          body?: string
          category?: string
          cover_image_url?: string | null
          created_at?: string
          decided_at?: string | null
          excerpt?: string | null
          id?: string
          keywords?: string | null
          region_focus?: string | null
          slug?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          submitted_at?: string
          title?: string
          updated_at?: string
          word_count?: number
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          source: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          source?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          source?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          contact_email: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          contact_email?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          contact_email?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      submission_notifications: {
        Row: {
          body: string
          created_at: string
          id: string
          recipient: string
          status: string
          subject: string
          submission_id: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          recipient: string
          status?: string
          subject: string
          submission_id: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          recipient?: string
          status?: string
          subject?: string
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "submission_notifications_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "article_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      submission_reviews: {
        Row: {
          created_at: string
          decision: Database["public"]["Enums"]["submission_status"]
          id: string
          message: string | null
          reviewer_id: string
          submission_id: string
        }
        Insert: {
          created_at?: string
          decision: Database["public"]["Enums"]["submission_status"]
          id?: string
          message?: string | null
          reviewer_id: string
          submission_id: string
        }
        Update: {
          created_at?: string
          decision?: Database["public"]["Enums"]["submission_status"]
          id?: string
          message?: string | null
          reviewer_id?: string
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "submission_reviews_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "article_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      trending_keywords: {
        Row: {
          aesthetic_tag: string
          color_palette: string
          country: string
          created_at: string
          id: string
          keyword: string
          last_updated: string
          search_intent: string
          silhouette: string
        }
        Insert: {
          aesthetic_tag: string
          color_palette: string
          country: string
          created_at?: string
          id?: string
          keyword: string
          last_updated?: string
          search_intent: string
          silhouette: string
        }
        Update: {
          aesthetic_tag?: string
          color_palette?: string
          country?: string
          created_at?: string
          id?: string
          keyword?: string
          last_updated?: string
          search_intent?: string
          silhouette?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_editorial_staff: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "editor" | "contributor"
      submission_status:
        | "draft"
        | "submitted"
        | "in_review"
        | "needs_revision"
        | "approved"
        | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "contributor"],
      submission_status: [
        "draft",
        "submitted",
        "in_review",
        "needs_revision",
        "approved",
        "rejected",
      ],
    },
  },
} as const
