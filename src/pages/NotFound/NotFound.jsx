import { useNavigate } from "react-router-dom";
import "./NotFound.scss";
import AnimatePage from "../../components/AnimatePage";

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<AnimatePage className="notfound">
			<div className="notfound__content">
				<div className="notfound__status">
					<span>4</span>
					<span>0</span>
					<span>4</span>
				</div>
				<div className="notfound__title">Oops. The page you were looking for doesn’t exist.</div>
				<div className="notfound__subtitle">You may have mistyped the address or the page may have moved.</div>
				<button onClick={() => navigate(-1)} className="button button_lightblue">
					RETURN ME BACK
				</button>
			</div>
		</AnimatePage>
	);
};

export default NotFound;
