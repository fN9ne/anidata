import "./Sidebar.scss";

import Navbar from "./components/Navbar";
import Profile from "./components/Profile";

import { ReactComponent as Logo } from "../../img/logo.svg";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { opacity, slideRight } from "../../animations";

const Sidebar = () => {
	const [isBurgerActive, setBurgerActive] = useState(false);

	const closeBurger = (event) => !event.target.closest(".sidebar-burger-content__body") && setBurgerActive(false);

	return (
		<>
			<aside className="sidebar">
				<div className="sidebar__content">
					<div className="sidebar__main">
						<Logo className="sidebar__logo" />
						<Navbar />
					</div>
					<Profile />
					<div
						onClick={() => setBurgerActive((prev) => !prev)}
						className={`sidebar-burger-menu${isBurgerActive ? " sidebar-burger-menu_active" : ""}`}
					>
						<svg viewBox="0 0 32 32">
							<path
								className="sidebar-burger-menu__line sidebar-burger-menu__line_top-bottom"
								d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
							></path>
							<path className="sidebar-burger-menu__line" d="M7 16 27 16"></path>
						</svg>
					</div>
				</div>
			</aside>
			<AnimatePresence>
				{isBurgerActive && (
					<motion.div onClick={closeBurger} {...opacity} className="sidebar-burger-content">
						<motion.div {...slideRight} className="sidebar-burger-content__body">
							<Navbar />
							<Profile />
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default Sidebar;
