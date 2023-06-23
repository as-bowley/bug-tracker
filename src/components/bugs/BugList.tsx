import React from "react";
import {
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
} from "@mui/material";
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
}

const BugList: React.FC<BugListProps> = ({ bugs }) => {
	return (
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
				{bugs.map((bug) => (
					<TableRow key={bug._id}>
						<TableCell>
							<Link to={`/bugs/${bug._id}`}>{bug.title}</Link>
						</TableCell>
						<TableCell>{bug.product}</TableCell>
						<TableCell>{bug.priority}</TableCell>
						<TableCell>{bug.status}</TableCell>
						<TableCell>
							{bug.createdBy
								? bug.createdBy.username
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
	);
};

export default BugList;
