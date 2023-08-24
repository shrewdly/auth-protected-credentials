"use client";

import { useSession } from "next-auth/react";
import { BriefcaseIcon, UsersIcon } from "@heroicons/react/20/solid";

import {
	ChevronDoubleRightIcon,
	CpuChipIcon,
	CurrencyPoundIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const depts = [
	{
		name: "Empties",
		href: "/users",
		initials: "CD",
		members: 12,
		bgColor: "bg-purple-600",
	},
	{
		name: "Machines",
		href: "/users",
		initials: "T",
		members: 16,
		bgColor: "bg-yellow-500",
	},
	{
		name: "Floats",
		href: "/users",
		initials: "RC",
		members: 8,
		bgColor: "bg-green-500",
	},
	{
		name: "Users",
		href: "/users",
		initials: "GA",
		members: 16,
		bgColor: "bg-pink-600",
	},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const AdminMenu = () => {
	const { status, data: session } = useSession();

	if (status === "loading") {
		return "";
	}
	return (
		<div>
			{status === "authenticated" && session.user.role === "ADMIN" ? (
				<div>
					<div>
						<ul className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
							{depts.map((dept) => (
								<li
									key={dept.name}
									className="col-span-1 flex rounded-md shadow-sm"
								>
									<div
										className={classNames(
											dept.bgColor,
											"flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white"
										)}
									>
										{dept.name === "Employees" && (
											<UsersIcon className="h-8 w-8" aria-hidden="true" />
										)}
										{dept.name === "Empties" && (
											<BriefcaseIcon className="h-8 w-8" aria-hidden="true" />
										)}
										{dept.name === "Floats" && (
											<CurrencyPoundIcon
												className="h-8 w-8"
												aria-hidden="true"
											/>
										)}
										{dept.name === "Machines" && (
											<CpuChipIcon className="h-8 w-8" aria-hidden="true" />
										)}
									</div>
									<div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
										<div className="flex-1 truncate px-4 py-2 text-sm">
											<Link
												href={dept.href}
												className="font-medium text-gray-900 hover:text-green-500 hover:cursor-grab "
											>
												{dept.name}
											</Link>
											<p className="text-gray-500">{dept.members} Members</p>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			) : (
				<p>Please ask you manager for access to this page</p>
			)}
			{/* {!data || role ? redirect("/") : <p>Welcome to admin user</p>} */}
		</div>
	);
};

export default AdminMenu;
