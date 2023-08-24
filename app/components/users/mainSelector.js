"use client";

import React, { useState } from "react";
import Register from "@/app/components/users/register";
import UsersList from "@/app/components/users/usersList";

const MainSelector = ({ users }) => {
	const [main, setMain] = useState("listView");
	return (
		<div>
			{main === "listView" && (
				<UsersList main={main} setMain={setMain} users={users} />
			)}
			{main === "register" && <Register main={main} setMain={setMain} />}
		</div>
	);
};

export default MainSelector;
