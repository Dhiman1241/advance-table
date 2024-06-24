"use client";

import * as React from "react";
import {
	ColumnDef,
	ColumnFiltersState,
	FilterFn,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { ITable } from "@/lib/data";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

  
 

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [rowSelection, setRowSelection] = React.useState({});
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [sorting, setSorting] = React.useState<SortingState>([]);

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters,
		},
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	});

	return (
		<div className="space-y-4 md:p-8 p-2 md:pt-0 rounded-md bg-gray-100">
			<DataTableToolbar table={table} />
			<div className="rounded-md border bg-white">
				<Table>
					<TableHeader className="bg-gray-300">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											className="text-black p-2"
											key={header.id}
											colSpan={header.colSpan}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
												  )}
												  {header.column.getCanFilter() ? (
													<div>
														<Filter column={header.column} table={table}/>
													</div>
                        						  ) : null}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
									className="hover:bg-mydarkblue hover:bg-opacity-10"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-72 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<DataTablePagination table={table} />
		</div>
	);
}

export function Filter({

	column,
  
	table,
  
  }: {
  
	column: any;
  
	table: any;
  
  }) {
  
	if (column.id.toLowerCase() === "select") {
  
	  return <div className="w-full h-full bg-gray-300"></div>;
  
	}
  
	const firstValue = table
  
	  .getPreFilteredRowModel()
  
	  .flatRows[0]?.getValue(column.id);
  
   
  
	const columnFilterValue = column.getFilterValue();
  
   
  
	const sortedUniqueValues =
  
	  typeof firstValue === "number" || firstValue === 0
  
		? []
  
		: column &&
  
		  !column.id.includes("computed_specialty_report") &&
  
		  !column.id.includes("actual_specialty_report")
  
		? Array.from(column.getFacetedUniqueValues().keys()).sort()
  
		: [];
  
   
  
	// const isDateType =  firstValue? (firstValue as string).includes("/"): false;
  
	const isDateType = false;
  
   
  
	if (isDateType) {
  
	  return (
  
		<div className="flex w-full h-full">
  
		  <div className="flex space-x-2">
  
			<input
  
			  type="date"
  
			  // min={Date(column.getFacetedMinMaxValues()?.[0] ?? "")}
  
			  // max={Date(column.getFacetedMinMaxValues()?.[1] ?? "")}
  
			  value={(columnFilterValue as [string, string])?.[0] ?? ""}
  
			  onChange={(e) => {
  
				column.setFilterValue((old: [string, string]) => [
  
				  e.target.value,
  
				  old?.[1],
  
				]);
  
				console.log("MIN VALUE CHANGED", e.target.value);
  
			  }}
  
			  placeholder={`Min ${
  
				column.getFacetedMinMaxValues()?.[0]
  
				  ? `(${column.getFacetedMinMaxValues()?.[0]})`
  
				  : ""
  
			  }`}
  
			  className="w-24 h-full px-2 py-1 text-xs border rounded shadow"
  
			/>
  
			<input
  
			  type="date"
  
			  // min={Date(column.getFacetedMinMaxValues()?.[0] ?? "")}
  
			  // max={Date(column.getFacetedMinMaxValues()?.[1] ?? "")}
  
			  value={(columnFilterValue as [string, string])?.[1] ?? ""}
  
			  onChange={(e) => {
  
				column.setFilterValue((old: [string, string]) => [
  
				  old?.[0],
  
				  e.target.value,
  
				]);
  
				console.log("MAX VALUE CHANGED", e.target.value);
  
			  }}
  
			  placeholder={`Max ${
  
				column.getFacetedMinMaxValues()?.[1]
  
				  ? `(${column.getFacetedMinMaxValues()?.[1]})`
  
				  : ""
  
			  }`}
  
			  className="w-24 h-full px-2 py-1 text-xs border rounded shadow"
  
			/>
  
		  </div>
  
		</div>
  
	  );
  
	}
  
	return typeof firstValue === "number" ? (
  
	  <div className="flex w-full">
  
		<div className="flex space-x-2">
  
		  <input
  
			type="number"
  
			min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
  
			max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
  
			value={(columnFilterValue as [number, number])?.[0] ?? ""}
  
			onChange={(e) =>
  
			  column.setFilterValue((old: [number, number]) => [
  
				e.target.value,
  
				old?.[1],
  
			  ])
  
			}
  
			placeholder={`Min ${
  
			  column.getFacetedMinMaxValues()?.[0]
  
				? `(${column.getFacetedMinMaxValues()?.[0]})`
  
				: ""
  
			}`}
  
			className="w-24 h-full px-2 py-1 text-xs border rounded shadow"
  
		  />
  
		  <input
  
			type="number"
  
			min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
  
			max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
  
			value={(columnFilterValue as [number, number])?.[1] ?? ""}
  
			onChange={(e) =>
  
			  column.setFilterValue((old: [number, number]) => [
  
				old?.[0],
  
				e.target.value,
  
			  ])
  
			}
  
			placeholder={`Max ${
  
			  column.getFacetedMinMaxValues()?.[1]
  
				? `(${column.getFacetedMinMaxValues()?.[1]})`
  
				: ""
  
			}`}
  
			className="w-24 h-full px-2 py-1 text-xs border rounded shadow"
  
		  />
  
		</div>
  
	  </div>
  
	) : (
  
	  <>
  
		{column &&
  
		  !column.id.includes("computed_specialty_report") &&
  
		  !column.id.includes("actual_specialty_report") && (
  
			<div className="flex w-full h-full">
  
			  <datalist id={column.id + "list"}>
  
				{sortedUniqueValues?.slice(0, 5000).map((value: any) => (
  
				  <option value={value} key={value} />
  
				))}
  
			  </datalist>
  
			  <input
  
				type="text"
  
				value={(columnFilterValue ?? "") as string}
  
				onChange={(e) => column.setFilterValue(e.target.value)}
  
				placeholder={`Search... (${
  
				  column.getFacetedUniqueValues().size
  
				})`}
  
				// placeholder={`Search... `}
  
				className="w-full px-2 py-1 text-xs border rounded shadow"
  
				list={column.id + "list"}
  
			  />
  
			</div>
  
		  )}
  
	  </>
  
	);
  
  }