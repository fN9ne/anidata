import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { toggleLogoutModalAction, throwUserAction } from "../../redux/reducers";

const Logout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const closeModal = () => dispatch(toggleLogoutModalAction(false));
	const logOut = () => {
		closeModal();
		dispatch(throwUserAction());
		navigate("/auth");
	};

	return (
		<Layout className="logout-modal">
			<h2>Are you sure?</h2>
			<div className="text">
				By clicking on the "Log out" button, you will log out of your account and will not be able to use the service until you
				log in.
			</div>
			<div className="logout-modal__footer">
				<button onClick={logOut} className="button">
					Log out
				</button>
				<button onClick={closeModal} className="button button_gray">
					Cancel
				</button>
			</div>
		</Layout>
	);
};

export default Logout;
