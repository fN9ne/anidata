import { useEffect, useState } from "react";

export const useValidations = (value, validations) => {
	const [isEmpty, setEmpty] = useState(true);
	const [minLengthError, setMinLengthError] = useState(true);
	const [gapExistence, setGapExistence] = useState(false);
	const [inputValid, setInputValid] = useState(false);
	const [cyrillicExistence, setCyrillicExistence] = useState(false);
	const [latinExistence, setLatinExistence] = useState(false);

	useEffect(() => {
		for (const validation in validations) {
			// eslint-disable-next-line
			switch (validation) {
				case "isEmpty":
					setEmpty(value.length === 0);
					break;
				case "minLength":
					setMinLengthError(value.length < validations[validation]);
					break;
				case "gapExistence":
					setGapExistence(/\s/.test(value));
					break;
				case "cyrillicExistence":
					setCyrillicExistence(/[а-яё]/i.test(value));
					break;
				case "latinExistence":
					setLatinExistence(/[a-z]/i.test(value));
					break;
			}
		}
	}, [value]); // eslint-disable-line

	useEffect(() => {
		setInputValid(!isEmpty && !minLengthError && !gapExistence && !cyrillicExistence && latinExistence);
	}, [isEmpty, minLengthError, gapExistence, cyrillicExistence, latinExistence]);

	return {
		isEmpty,
		minLengthError,
		gapExistence,
		cyrillicExistence,
		latinExistence,
		inputValid,
	};
};
