import "./Loader.scss";

import { opacity } from "../../animations";
import { AnimatePresence, motion } from "framer-motion";

const Loader = ({ condition }) => {
	return (
		<AnimatePresence>
			{condition && (
				<motion.div className="loader" {...opacity}>
					<svg viewBox="25 25 50 50">
						<circle r="20" cy="50" cx="50" />
					</svg>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Loader;
