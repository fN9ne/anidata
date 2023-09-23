import "./Sidebar.scss";

import Navbar from "./components/Navbar";

import { ReactComponent as Logo } from "../../img/logo.svg";
import { ReactComponent as UserIcon } from "../../img/icons/user.svg";
import { ReactComponent as LogOutIcon } from "../../img/icons/logout.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogoutModalAction } from "../../redux/reducers";

const Sidebar = () => {
	const username = useSelector((state) => state.user.username);

	const dispatch = useDispatch();

	const openLogoutModal = () => dispatch(toggleLogoutModalAction(true));

	return (
		<aside className="sidebar">
			<div className="sidebar__content">
				<div className="sidebar__main">
					<Logo className="sidebar__logo" />
					<Navbar />
				</div>
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
			</div>
		</aside>
	);
};

export default Sidebar;
