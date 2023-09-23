import Form from "./Form";
import Input from "./Input";

import { useInput } from "../../../hooks/useInput";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api, hashString } from "../../../functions";
import { useEffect, useState } from "react";
import { authorizeUserAction } from "../../../redux/reducers";

const SignUp = ({ toggle }) => {
	const [fetching, setFetching] = useState(false);
	const [isUserExistence, setUserExistence] = useState(null);
	const [isFormValid, setFormValid] = useState(false);

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
	const passwordConfirm = useInput("", {
		isEmpty: true,
		minLength: 8,
		gapExistence: true,
		cyrillicExistence: true,
		latinExistence: true,
	});

	const isPasswordsMatch = () => {
		return password.value === passwordConfirm.value && password.value !== "" && passwordConfirm.value !== "";
	};

	const formSend = (event) => {
		event.preventDefault();

		if (isFormValid) {
			setFetching(true);

			api("GET")
				.then((response) => {
					const users = response.record;

					const userExistence = users.filter((user) => user.username === username.value).length > 0;

					setUserExistence(userExistence);

					return { userExistence, users };
				})
				.then((response) => {
					const { userExistence, users } = response;

					if (!userExistence) {
						const body = [
							...users,
							{
								username: username.value,
								password: hashString(password.value),
								content: [],
							},
						];

						api("PUT", body)
							.then(() => {
								const userData = { username: username.value, content: [] };

								dispatch(authorizeUserAction(userData));

								navigate("/app");
							})
							.finally(() => setFetching(false));
					} else {
						setFetching(false);
					}
				});
		}
	};

	useEffect(() => {
		setFormValid(
			username.inputValid && password.inputValid && passwordConfirm.inputValid && password.value === passwordConfirm.value
		);
	}, [username, password, passwordConfirm]);

	return (
		<Form
			title="Sign up"
			text={{ toggle: "Log in", submit: "Sign up", error: "User with such username already registered" }}
			toggle={toggle}
			formSend={formSend}
			isErrorActive={isUserExistence}
			fetching={fetching}
			isFormValid={isFormValid}
		>
			<Input
				id="signUpUsername"
				type="text"
				text={{
					label: "Username",
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
				id="signUpPassword"
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
			<Input
				id="signUpPasswordConfirm"
				type="password"
				text={{
					label: "Confirm password",
					error: passwordConfirm.isDirty && !isPasswordsMatch() ? "Password must match" : "",
				}}
				events={{ onBlur: passwordConfirm.onBlur, onChange: passwordConfirm.onChange }}
				isErrorActive={passwordConfirm.isDirty && !isPasswordsMatch()}
				inputValid={isPasswordsMatch()}
			/>
		</Form>
	);
};

export default SignUp;
