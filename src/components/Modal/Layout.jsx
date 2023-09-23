import "./Modal.scss";

import { motion } from "framer-motion";
import { opacity } from "../../animations";
import { useDispatch } from "react-redux";
import { closeAllModalsAction } from "../../redux/reducers";

const Layout = ({ className, children }) => {
	const dispatch = useDispatch();

	const closeModal = (event) => (!event.target.closest(".modal__content") ? dispatch(closeAllModalsAction()) : null);

	return (
		<motion.div onClick={closeModal} {...opacity} className="modal">
			<div className="modal__body">
				<div className={`modal__content${className ? ` ${className}` : ""}`}>{children}</div>
			</div>
		</motion.div>
	);
};

export default Layout;
