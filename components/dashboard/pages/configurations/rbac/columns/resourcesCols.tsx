"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export type AppResourcesType = {
    id: string;
    name: string;
    description?: string;
    color?: string;
    is_active: boolean;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
  }



export const resourcesColumns: ColumnDef<AppResourcesType>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Seleziona Tutto"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Seleziona Riga"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
            <div className="flex flex-row items-center space-x-2">
            <Button
                className="text-left text-base font-semibold"
                variant="link"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Nome
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            </div>
        )
    },
  },
  {
    accessorKey: "description",
    header: "Descrizione",
  },
  /* {
    accessorKey: "color",
    header: "Colore",
  }, */
  {
    accessorKey: "color",
    header: ({ column }) => {
        return (
            <div className="flex flex-row items-center space-x-2">
            <Button
                className="text-left text-base font-semibold"
                variant="link"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Colore
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            </div>
        )
    },
  },
  {
    accessorKey: "is_active",
    header: "Attivo",
  },
  {
    accessorKey: "created_at",
    header: "Creato il",
  },
  {
    accessorKey: "created_by",
    header: "Creato da",
  },
  {
    accessorKey: "updated_at",
    header: "Agiornato il",
  },
  {
    accessorKey: "updated_by",
    header: "Aggiornato da",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="link" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

