import { height } from "../../../animations";
import { AnimatePresence, motion } from "framer-motion";

import Loader from "../../../components/Loader/Loader";

import { ReactComponent as Arrow } from "../../../img/icons/arrowRight.svg";

const Form = ({ title, text, toggle, formSend, isErrorActive, fetching, isFormValid, children }) => {
	const handleToggle = (event) => {
		event.preventDefault();
		toggle();
	};

	return (
		<form onSubmit={formSend} action="#sendform" className="form">
			<h2>{title}</h2>
			<div className="form__body">{children}</div>
			<AnimatePresence>
				{isErrorActive && (
					<motion.div className="error" {...height(15)}>
						{text.error}
					</motion.div>
				)}
			</AnimatePresence>
			<div className="form__footer">
				<a onClick={handleToggle} href="#toggle" className="form__toggle">
					{text.toggle}
				</a>
				<button disabled={!isFormValid} className="form__submit button button_arrow">
					<span>{text.submit}</span>
					<Arrow />
				</button>
			</div>
			<Loader condition={fetching} />
		</form>
	);
};

export default Form;
