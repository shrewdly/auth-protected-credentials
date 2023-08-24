"use client";

import { useCallback, useState } from "react";

import MainSelector from "../components/users/mainSelector";

const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "http://localhost:3000";

const fetchApi = (endpoint) => {
	return fetch(`/api/${endpoint}`).then((response) => {
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return response.json();
	});
};
// async function handleResponse(response) {
// 	const contentType = response.headers.get("Content-Type") || "";
// 	const isJson = contentType.includes("application/json");
// 	const data = isJson ? await response.json() : await response.text();

// 	if (!response.ok) {
// 		const message = isJson
// 			? data.message || response.statusText
// 			: response.statusText;
// 		throw new Error(message);
// 	}

// 	return data;
// }

const Users = async () => {
	const [isLoadingPost, setLoadingPost] = useState(false);
	const [apiResponse, setApiResponse] = useState(null);
	const [apiError, setApiError] = useState(null);

	const getApiCallback = useCallback(
		(endpoint) => async (e) => {
			setLoadingPost(true);
			setApiError(null);
			try {
				const response = await fetchApi(endpoint);
				setApiResponse(response);
			} catch (e) {
				setApiError(e);
				console.error(e);
			}
			setLoadingPost(false);
		},
		[]
	);

	const onGetUsers = useCallback(getApiCallback("users"), []);
	const users = onGetUsers();

	console.log("Starting Users", users);
	return (
		<div>
			<MainSelector users={users} />
		</div>
	);
};
export default Users;
