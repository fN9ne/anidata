import { NavLink } from "react-router-dom";

import { ReactComponent as YourAnimeIcon } from "../../../img/icons/your_anime.svg";
import { ReactComponent as AnimeListIcon } from "../../../img/icons/catalog.svg";

const Navbar = () => {
	const routes = [
		{
			name: "main menu",
			content: [
				{ path: "list", text: "Your anime", icon: <YourAnimeIcon /> },
				{ path: "catalog", text: "Catalog", icon: <AnimeListIcon /> },
			],
		},
	];

	return (
		<nav className="nav">
			<ul className="nav__list">
				{routes.map((category, key) => (
					<li className="nav-item" key={key}>
						<h3>{category.name}</h3>
						<ul className="nav-item__list">
							{category.content.map((route, key) => (
								<li className="nav-item__item" key={key}>
									<NavLink className="nav-item__link" to={route.path}>
										{route.icon}
										<span>{route.text}</span>
									</NavLink>
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navbar;
