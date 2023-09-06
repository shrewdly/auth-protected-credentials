"use client";
import MainSelector from "../components/users/mainSelector";

const fetchUsers = () => {
	const { signal } = new AbortController();
	const response = fetch("/api/auth/users/", {
		cache: "no-store",
	});
	// console.log("Step2", response.data);

	return handleResponse(response).then((data) => data.users);
};
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

const Users = () => {
	const users = fetchUsers();
	console.log("Starting Users", users);
	return (
		<div>
			<MainSelector users={users} />
		</div>
	);
};
export default Users;
