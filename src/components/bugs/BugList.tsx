import React, { useState } from "react";
import {
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TextField,
	InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment";
import { Link } from "react-router-dom";

interface Bug {
	_id: string;
	title: string;
	priority: string;
	status: string;
	createdBy: { _id: string; username: string; displayName: string };
	product: string;
	createdAt: string;
}

interface BugListProps {
	bugs: Bug[];
	limit?: number;
	platform?: string;
}

const BugList: React.FC<BugListProps> = ({ bugs, limit, platform }) => {
	const [searchTerm, setSearchTerm] = useState<string>("");

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const filteredBugs = bugs
		.filter((bug) => {
			if (platform) {
				return bug.product === platform;
			}
			return true;
		})
		.filter((bug) => {
			if (searchTerm) {
				return bug.title
					.toLowerCase()
					.includes(searchTerm.toLowerCase());
			}
			return true;
		})
		.slice(0, limit);

	return (
		<div>
			<TextField
				label="Search Bugs"
				variant="outlined"
				value={searchTerm}
				onChange={handleSearch}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start"><SearchIcon /></InputAdornment>
					),
				}}
			/>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Title</TableCell>
						<TableCell>Platform</TableCell>
						<TableCell>Priority</TableCell>
						<TableCell>Status</TableCell>
						<TableCell>Creator</TableCell>
						<TableCell>Created At</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{filteredBugs.map((bug, i) => (
						<TableRow key={i}>
							<TableCell>
								<Link to={`/bugs/${bug._id}`}>
									{bug.title ? bug.title.charAt(0).toUpperCase() +
										bug.title.slice(1) : ""}
								</Link>
							</TableCell>
							<TableCell>
								{bug.product
									? bug.product.charAt(0).toUpperCase() +
									bug.product.slice(1)
									: ""}
							</TableCell>
							<TableCell>
								{bug.priority
									? bug.priority.charAt(0).toUpperCase() +
									bug.priority.slice(1)
									: ""}
							</TableCell>
							<TableCell>
								{bug.status
									? bug.status.charAt(0).toUpperCase() +
									bug.status.slice(1)
									: ""}
							</TableCell>
							<TableCell>
								{bug.createdBy && bug.createdBy.username
									? bug.createdBy.username
											.charAt(0)
											.toUpperCase() +
									bug.createdBy.username.slice(1)
									: "Anonymous User"}
							</TableCell>
							<TableCell>
								{moment(bug.createdAt).format(
									"YYYY-MM-DD HH:mm:ss"
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default BugList;
