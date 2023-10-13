import { ReactComponent as UserIcon } from "../../../img/icons/user.svg";
import { ReactComponent as LogOutIcon } from "../../../img/icons/logout.svg";

import { toggleLogoutModalAction } from "../../../redux/reducers";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
	const username = useSelector((state) => state.user.username);

	const dispatch = useDispatch();

	const openLogoutModal = () => dispatch(toggleLogoutModalAction(true));

	return (
		<div className="profile">
			<h3>Profile</h3>
			<div className="profile__username">
				<UserIcon />
				<span>{username}</span>
			</div>
			<button onClick={openLogoutModal} className="profile__logout">
				<LogOutIcon />
				<span>Log out</span>
			</button>
		</div>
	);
};

export default Profile;
