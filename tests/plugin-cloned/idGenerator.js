
export {idGenerator};

let next = Number.MAX_SAFE_INTEGER;
const prefix = `0-id-`;
const idGenerator = function () {
	const id = `${prefix}${next}`;
	next -= 1;
	return id;
};
