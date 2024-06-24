"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import {
	DataTableFacetedFilterExperience,
	DataTableFacetedFilterRole,
} from "./data-table-faceted-filter";


interface DataTableToolbarProps<TData> {
	table: Table<TData>;
}

const category = [
    { key: "Health", value: "Health" },
    { key: "Clothing", value: "Clothing" },
    { key: "Activity", value: "Activity" },
    { key: "Home", value: "Home" },
    { key: "Pets", value: "Pets" },
    { key: "Automotive", value: "Automotive" },
    { key: "Entertainment", value: "Entertainment" },
    { key: "Beauty", value: "Beauty" },
    { key: "Electronics", value: "Electronics" }
]

const subcategory = [
    { key: "Nutrition", value: "Nutrition" },
    { key: "Mens", value: "Mens" },
    { key: "Outdoors", value: "Outdoors" },
    { key: "Camping", value: "Camping" },
    { key: "Cleaning", value: "Cleaning" },
    { key: "Aquarium", value: "Aquarium" },
    { key: "Cat", value: "Cat" },
    { key: "Tire", value: "Tire" },
    { key: "Jewelry", value: "Jewelry" },
    { key: "Movie", value: "Movie" },
    { key: "Furniture", value: "Furniture" },
    { key: "Baby", value: "Baby" },
    { key: "First Aid", value: "First Aid" },
    { key: "Home Improvement", value: "Home Improvement" },
    { key: "Bath", value: "Bath" },
    { key: "Kids", value: "Kids" },
    { key: "Sports", value: "Sports" },
    { key: "Party", value: "Party" },
    { key: "Computer", value: "Computer" },
    { key: "Dog", value: "Dog" },
    { key: "Technology", value: "Technology" },
    { key: "Book", value: "Book" },
    { key: "Toy", value: "Toy" },
    { key: "Engine", value: "Engine" },
    { key: "Music", value: "Music" },
    { key: "Dining", value: "Dining" },
    { key: "Skin Care", value: "Skin Care" },
    { key: "Camera", value: "Camera" },
    { key: "Swimming", value: "Swimming" },
    { key: "Kitchen", value: "Kitchen" },
    { key: "Game", value: "Game" },
    { key: "Phone", value: "Phone" },
    { key: "Medicine", value: "Medicine" },
    { key: "Car", value: "Car" },
    { key: "Vitamin", value: "Vitamin" },
    { key: "Fitness", value: "Fitness" },
    { key: "Makeup", value: "Makeup" },
    { key: "Storage", value: "Storage" },
    { key: "Womens", value: "Womens" },
    { key: "Biking", value: "Biking" },
    { key: "Bedding", value: "Bedding" }
]


export function DataTableToolbar<TData>({
	table,
}: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;
	return (
		<div className="flex items-center justify-between bg-mydarkblue bg-opacity-10 p-4 rounded-md space-x-2">
			<div className="flex md:flex-row flex-col md:items-center md:space-x-2 md:space-y-0 space-y-2 w-full">
				<Input
					placeholder="Search"
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("name")?.setFilterValue(event.target.value)
					}
					className="h-8 md:w-72"
				/>
				{table.getColumn("category") && (
					<DataTableFacetedFilterRole
						column={table.getColumn("category")}
						title="Category"
						options={category}
					/>
				)}
				{table.getColumn("subcategory") && (
					<DataTableFacetedFilterExperience
						column={table.getColumn("subcategory")}
						title="Sub Category"
						options={subcategory}
					/>
				)}
				{isFiltered && (
					<Button
						variant="ghost"
						onClick={() => {
							table.resetColumnFilters();
						}}
						className="h-8 px-2 lg:px-3"
					>
						Reset
						<Cross2Icon className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>
			<div className="lg:flex hidden">
				<DataTableViewOptions table={table} />
			</div>
		</div>
	);
}
