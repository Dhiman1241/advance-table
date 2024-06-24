"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ITable } from "@/lib/data";
import { DataTableColumnHeader } from "./data-table-column-header";

export const columns: ColumnDef<ITable>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => {
      return <div className="flex">{row.getValue("id")}</div>;
    },
    filterFn: 'equalsString'
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return <div className="flex w-48">{row.getValue("name")}</div>;
    },
    filterFn: 'includesStringSensitive',
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      return <div className="flex">{row.getValue("category")}</div>;
    },
    enableColumnFilter: false,
    filterFn: (row,id,value) =>{
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "subcategory",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sub Category" />
    ),
    cell: ({ row }) => {
      return <div className="flex">{row.getValue("subcategory")}</div>;
    },
    enableColumnFilter: false,
    filterFn: (row,id,value) =>{
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      return <div className="flex">{formatDate(row.getValue("createdAt"))}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
    cell: ({ row }) => {
      return <div className="flex">{formatDate(row.getValue("updatedAt"))}</div>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      return <div className="flex">{formatPrice(row.getValue("price"))}</div>;
    },
    filterFn: "inNumberRange"
  },
  {
    accessorKey: "sale_price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sale Price" />
    ),
    cell: ({ row }) => {
      return <div className="flex">{formatPrice(row.getValue("sale_price"))}</div>;
    },
    filterFn: "inNumberRange"
  },
];

function formatDate(data: string) {
  const date = new Date(data);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatPrice(data: number){
  if(!data) return "-";
  return `$${data}`

 }
