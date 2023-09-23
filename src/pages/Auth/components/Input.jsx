import { height } from "../../../animations";
import { AnimatePresence, motion } from "framer-motion";

import { ReactComponent as Checkmark } from "../../../img/icons/checkmark.svg";

const Input = ({ id, type, text, isErrorActive, events, inputValid }) => {
	return (
		<div className="form-item">
			<label htmlFor={id} className="form-item__label">
				{text.label}
			</label>
			<div className="form-item__field">
				<input autoComplete="on" type={type} id={id} {...events} />
				<Checkmark className={`form-item__checkmark${inputValid ? " form-item__checkmark_active" : ""}`} />
			</div>
			<AnimatePresence>
				{isErrorActive && (
					<motion.div {...height(Array.isArray(text.error) ? text.error.length * 15 : 15)} className="error">
						{Array.isArray(text.error) ? text.error.map((p, key) => <p key={key}>{p}</p>) : text.error}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Input;
