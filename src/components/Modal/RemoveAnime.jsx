import { useDispatch, useSelector } from "react-redux";
import Layout from "./Layout";
import { toggleAnime, togglePending, toggleRemoveAnimeModalAction } from "../../redux/reducers";

const RemoveAnime = () => {
	const dispatch = useDispatch();

	const removeAnime = useSelector((state) => state.user.removeAnime);
	const { name, id } = removeAnime;

	const closeModal = () => {
		dispatch(toggleRemoveAnimeModalAction(false));
	};

	const handleRemoveAnime = () => {
		dispatch(toggleAnime(id));
		dispatch(togglePending(true));
		closeModal();
	};

	return (
		<Layout className="modal1">
			<h2>Are your sure?</h2>
			<div className="text">
				Do you really want to remove the anime <span>«{name}»</span> from your anime list?
			</div>
			<div className="modal1__footer">
				<button onClick={handleRemoveAnime} className="button button_red">
					Remove
				</button>
				<button onClick={closeModal} className="button button_gray">
					Cancel
				</button>
			</div>
		</Layout>
	);
};

export default RemoveAnime;
