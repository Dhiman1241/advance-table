"use client";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { tableData } from "@/lib/data";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col px-16 py-4">
      <DataTable data={tableData} columns={columns} />
    </main>
  );
}
