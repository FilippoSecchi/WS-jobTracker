"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Copy, MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  //DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
//import { tr } from "zod/v4/locales"
import { toast } from "sonner"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type AppRolesType = {
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



export const rolesColumns: ColumnDef<AppRolesType>[] = [
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
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
        return (
            <div className="flex flex-row items-center space-x-2">
            <Button
                className="text-left text-base font-semibold"
                variant="link"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Descrizione
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            </div>
        )
    },
    enableSorting: true,
    enableHiding: true,
  },
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
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => {
        return (
            <div className="flex flex-row items-center space-x-2">
            <Button
                className="text-left text-base font-semibold"
                variant="link"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Stato
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            </div>
        )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
        return (
            <div className="flex flex-row items-center space-x-2">
            <Button
                className="text-left text-base font-semibold"
                variant="link"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Creato il
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            </div>
        )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "created_by",
    header: ({ column }) => {
        return (
            <div className="flex flex-row items-center space-x-2">
            <Button
                className="text-left text-base font-semibold"
                variant="link"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Creato da
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            </div>
        )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
        return (
            <div className="flex flex-row items-center space-x-2">
            <Button
                className="text-left text-base font-semibold"
                variant="link"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Aggiornato il
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            </div>
        )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "updated_by",
    header: ({ column }) => {
        return (
            <div className="flex flex-row items-center space-x-2">
            <Button
                className="text-left text-base font-semibold"
                variant="link"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Aggiornato da
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            </div>
        )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    header: () => {
        return (
            <div className="flex flex-row items-center space-x-2">
              <p className="text-left text-base font-semibold px-3">
                Azioni
              </p>
            </div>
        )
    },
    cell: ({ row }) => {
      const rowData = row.original 
      return (
        <Drawer>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" className="h-8 w-8 p-0">
                <span className="sr-only">Apri Menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuLabel className="font-bold bg-violet-800 text-white text-center">Azioni</DropdownMenuLabel> */}
              <DropdownMenuItem
                className="font-bold hover:bg-violet-800 hover:text-white text-center"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(rowData.id)
                    toast.success("ID copiato negli appunti")
                  } catch (err) {
                    console.error(err)
                    toast.error("Errore nel copiare l'ID")
                  }
                }}
              >
                <Copy /> Copia ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* Open a drawer with details and actions for this row */}
              <DrawerTrigger asChild>
                <DropdownMenuItem>Dettagli</DropdownMenuItem>
              </DrawerTrigger>
              <DropdownMenuItem
                onClick={async () => {
                  try {
                    // TODO: call delete API here
                    toast.success("Eliminato con successo")
                  } catch (err) {
                    console.error(err)
                    toast.error("Errore durante l'eliminazione")
                  }
                }}
              >
                Elimina
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DrawerContent>
            <div className="mx-auto w-full max-w-full sm:w-3/4 lg:w-3/4 xl:w-4/5 2xl:w-4/5">
              <DrawerHeader>
                <DrawerTitle>Dettagli Ruolo</DrawerTitle>
                <DrawerDescription>ID: {rowData.id}</DrawerDescription>
              </DrawerHeader>
              <ScrollArea className="h-[50vh] w-full rounded-md border-none p-4">
                <>
              <div className="p-4 space-y-3">
                <div><span className="font-semibold">Nome:</span> {rowData.name}</div>
                <div><span className="font-semibold">Descrizione:</span> {rowData.description}</div> 
                <div><span className="font-semibold">Colore:</span> {rowData.color}</div> 
                <div><span className="font-semibold">Stato:</span> {rowData.is_active ? "Attivo" : "Disattivo"}</div>
                <div className="text-sm text-muted-foreground">
                  <div>Creato il: {new Intl.DateTimeFormat('it-IT', { dateStyle: 'long'}).format(new Date(rowData.created_at))}</div>
                  <div>Creato da: {rowData.created_by}</div>
                  <div>Aggiornato il: {String(rowData.updated_at)}</div>
                  <div>Aggiornato da: {rowData.updated_by}</div>
                </div>
              </div>
              </>
              </ScrollArea>
              <DrawerFooter>
                <Button onClick={() => toast.message("Modifica", { description: `Form di modifica per ID: ${rowData.id}` })}>
                  Modifica (TODO)
                </Button>
                <Button
                  variant="destructive"
                  onClick={async () => {
                    try {
                      // TODO: call delete API here
                      toast.success("Eliminato con successo")
                    } catch (err) {
                      console.error(err)
                      toast.error("Errore durante l'eliminazione")
                    }
                  }}
                >
                  Elimina
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Chiudi</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      )
    },
  },
]


