import MainSelector from "../components/users/mainSelector";

async function fetchUsers() {
	const { signal } = new AbortController();
	const response = await fetch("http://localhost:3000/api/users", {
		cache: "no-store",
	});
	// console.log("Step2", response.data);

	return handleResponse(response).then((data) => data.users);
}
async function handleResponse(response) {
	const contentType = response.headers.get("Content-Type") || "";
	const isJson = contentType.includes("application/json");
	const data = isJson ? await response.json() : await response.text();

	if (!response.ok) {
		const message = isJson
			? data.message || response.statusText
			: response.statusText;
		throw new Error(message);
	}

	return data;
}

const Users = async () => {
	const users = await fetchUsers();
	console.log("Starting Users", users);
	return (
		<div>
			<MainSelector users={users} />
		</div>
	);
};
export default Users;
