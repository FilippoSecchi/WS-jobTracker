"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type UserCookiesType = {
    session_id: string;
    role_id?: string;
    id: string;
    user_auth: string;
    user_role?: string;
    email: string;
    email_verified: boolean;
  }

export const columns: ColumnDef<UserCookiesType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "user_role",
    header: "Role",
  },
]