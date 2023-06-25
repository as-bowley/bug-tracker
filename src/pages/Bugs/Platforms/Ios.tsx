import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BugList from "../../../components/bugs/BugList";
import { fetchAllBugs } from "../../../redux/thunks/bugThunks";
import { RootState } from "../../../redux/types";
import { Bug } from "../../../redux/types/bugTypes";

const Ios: React.FC = () => {
	const dispatch = useDispatch();
	const [bugs, setBugs] = useState<Bug[]>([]);
	const token = useSelector((state: RootState) => state.auth.token);
	const bugState = useSelector((state: RootState) => state.bug);

	useEffect(() => {
		dispatch(fetchAllBugs(token));
	}, [dispatch, token]);

	useEffect(() => {
		setBugs(bugState.bugs);
	}, [bugState.bugs]);

	return <BugList platform="ios" bugs={bugs} />;
};

export default Ios;
