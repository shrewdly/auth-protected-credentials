import { User } from "@prisma/client";

const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "http://localhost:3000";

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

export async function apiCreateUser(userData) {
	const response = await fetch(`/api/users/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: userData,
	});

	return handleResponse(response).then((data) => data.data.user);
}

export async function apiFetchSingleUser(userId) {
	const response = await fetch(`/api/users/${userId}`);

	return handleResponse(response).then((data) => data.data.user);
}

export async function apiFetchUsers() {
	console.log("Step1");
	const response = await fetch(`/api/users`, {
		next: {
			revalidate: 10,
		},
	});
	// console.log("Step2", response.data);

	return handleResponse(response).then((data) => data.users);
}

export async function apiDeleteUser(userId) {
	const response = await fetch(`/api/users/${userId}`, {
		method: "DELETE",
	});

	if (response.status !== 204) {
		const errorResponse = await response.json();
		if (errorResponse) {
			throw new Error(errorResponse.message);
		} else {
			throw new Error(`API error: ${response.status}`);
		}
	}
}
