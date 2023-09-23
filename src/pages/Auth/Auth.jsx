import "./Auth.scss";

import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import AnimatePage from "../../components/AnimatePage";

import { scale } from "../../animations";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { ReactComponent as Logo } from "../../img/logo.svg";

const Auth = () => {
	const isUserAuthorized = useSelector((state) => state.user.authorized);

	const navigate = useNavigate();

	const [isLogInVisible, setLogInVisible] = useState(true);
	const [isSignUpVisible, setSignUpVisible] = useState(false);

	const toggleForms = () => {
		setLogInVisible((prev) => !prev);
		setSignUpVisible((prev) => !prev);
	};
	useEffect(() => {
		if (isUserAuthorized) navigate("/app");
	}, [isUserAuthorized]);

	return (
		<AnimatePage className="auth">
			<div className="auth__body">
				<div className="auth__wrapper">
					<div className="auth__container">
						<Logo className="auth__logo" />
						<div className="text">
							Hi! AniData - is a web-service for storing anime-titles. To work with the service, you need to log in.
						</div>
						<AnimatePresence mode="wait" initial={false}>
							{isLogInVisible && (
								<motion.div key={1} {...scale}>
									<LogIn title="Log in" toggle={toggleForms} />
								</motion.div>
							)}
							{isSignUpVisible && (
								<motion.div key={2} {...scale}>
									<SignUp title="Sign up" toggle={toggleForms} />
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
			</div>
		</AnimatePage>
	);
};

export default Auth;
