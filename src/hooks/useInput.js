import { useState } from "react";
import { useValidations } from "./useValidations";

export const useInput = (initialValue, validations) => {
	const [value, setValue] = useState(initialValue);
	const [isDirty, setDirty] = useState(false);

	const valid = useValidations(value, validations);

	const onChange = (event) => {
		setValue(event.target.value);
	};

	const onBlur = () => {
		setDirty(true);
	};

	return {
		value,
		isDirty,
		onChange,
		onBlur,
		...valid,
	};
};
