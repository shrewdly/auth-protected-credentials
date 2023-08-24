import UsersList from "@/components/users/usersList";
import { useSession } from "next-auth/react";

// import Register from "./register";

const Users = ({ option, setOption }) => {
	const { status, data: session } = useSession();

	if (status === "loading") {
		return "";
	}

	return (
		<div>
			{status === "authenticated" && session.user.role === "ADMIN" ? (
				<div>
					<p>Logged in as admin</p>
					{option === "view" && <UsersList setOption={setOption} />}
					{option === "addUser" && <Register />}
					{option === "editUser" && <p>Edit user</p>}
				</div>
			) : (
				<p>Unauthorised access</p>
			)}
		</div>
	);
};
export default Users;
