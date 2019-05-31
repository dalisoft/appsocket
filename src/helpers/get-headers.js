export default (headers) => {
	if (Array.isArray(headers)) {
		return headers.reduce((acc, { name, value }) => {
			if (name && value) {
				acc[name] = value;
			}
			return acc;
		}, {});
	}
	return headers;
};
