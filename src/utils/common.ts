export const jsonParse = (str: string) => {
	try {
		return {
			isJson: true,
			value: JSON.parse(str)
		};
	} catch (err) {
		return {
			isJson: false,
			value: str
		};
	}
};
