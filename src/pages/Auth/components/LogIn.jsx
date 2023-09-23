import Form from "./Form";
import Input from "./Input";

import { useInput } from "../../../hooks/useInput";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hashString, api } from "../../../functions";
import { useState, useEffect } from "react";
import { authorizeUserAction } from "../../../redux/reducers";

const LogIn = ({ title, toggle }) => {
	const [isFormValid, setFormValid] = useState(false);
	const [isCorrectData, setCorrectData] = useState(null);
	const [fetching, setFetching] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const username = useInput("", {
		isEmpty: true,
		minLength: 5,
		gapExistence: true,
		cyrillicExistence: true,
		latinExistence: true,
	});
	const password = useInput("", {
		isEmpty: true,
		minLength: 8,
		gapExistence: true,
		cyrillicExistence: true,
		latinExistence: true,
	});

	const formSend = (event) => {
		event.preventDefault();

		if (isFormValid) {
			setFetching(true);

			api("GET")
				.then((response) => {
					const users = response.record;
					const findedUser = users.filter(
						(user) => user.username === username.value && user.password === hashString(password.value)
					);

					setCorrectData(findedUser.length > 0);

					if (findedUser.length > 0) {
						const userData = { username: username.value, content: findedUser[0].content };

						dispatch(authorizeUserAction(userData));

						navigate("/app");
					}
				})
				.finally(() => setFetching(false));
		}
	};

	useEffect(() => setFormValid(username.inputValid && password.inputValid), [username, password]);

	return (
		<Form
			title={title}
			text={{ toggle: "Sign up", submit: "Log in", error: "Invalid username or password" }}
			toggle={toggle}
			formSend={formSend}
			isFormValid={isFormValid}
			isErrorActive={isCorrectData === false}
			fetching={fetching}
		>
			<Input
				id="logInUsername"
				type="text"
				text={{
					label: "Usename",
					error: username.gapExistence
						? "Username mustn't contain gaps"
						: username.cyrillicExistence
						? ["Cyrillic characters mustn't be used", "in the username"]
						: username.isEmpty
						? "Username mustn't be empty"
						: username.minLengthError
						? "Username must be at least 5 characters"
						: !username.latinExistence
						? "Username must contain latin characters"
						: "",
				}}
				events={{ onBlur: username.onBlur, onChange: username.onChange }}
				isErrorActive={!username.inputValid && username.isDirty}
				inputValid={username.inputValid}
			/>
			<Input
				id="logInPassword"
				type="password"
				text={{
					label: "Password",
					error: password.gapExistence
						? "Password mustn't contain gaps"
						: password.cyrillicExistence
						? ["Cyrillic characters mustn't be used", "in the password"]
						: password.isEmpty
						? "Password mustn't be empty"
						: password.minLengthError
						? "Password must be at least 8 characters"
						: !password.latinExistence
						? "Password must contain latin characters"
						: "",
				}}
				events={{ onBlur: password.onBlur, onChange: password.onChange }}
				isErrorActive={!password.inputValid && password.isDirty}
				inputValid={password.inputValid}
			/>
		</Form>
	);
};

export default LogIn;
