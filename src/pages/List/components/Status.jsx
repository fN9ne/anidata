import { useDispatch, useSelector } from "react-redux";
import Dropdown from "./Dropdown";
import { changeContent, togglePending } from "../../../redux/reducers";

const Status = ({ status, id }) => {
	const { content } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	const changeStatus = (status) => {
		const newContent = content.map((item) => {
			if (item.id === id) {
				return {
					...item,
					status: status,
					isFavourite: false,
					statusOptions: {
						stoppedAt: status === "In progress" ? 1 : null,
					},
				};
			}

			return item;
		});

		dispatch(changeContent(newContent));
		dispatch(togglePending(true));
	};

	return (
		<Dropdown onClick={(status) => changeStatus(status)} buttonText={status} list={["Watched", "In progress", "In plans"]} />
	);
};

export default Status;
