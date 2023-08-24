import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
	const id = params.id;
	const user = await prisma.user.findUnique({
		where: {
			id,
		},
	});

	if (!user) {
		let error_response = {
			status: "fail",
			message: "No user with the Provided ID Found",
		};
		return new NextResponse(JSON.stringify(error_response), {
			status: 404,
			headers: { "Content-Type": "application/json" },
		});
	}

	let json_response = {
		status: "success",
		data: {
			user,
		},
	};
	return NextResponse.json(json_response);
}

export async function PATCH(request, { params }) {
	try {
		const id = params.id;
		let json = await request.json();

		const updated_user = await prisma.user.update({
			where: { id },
			data: json,
		});

		let json_response = {
			status: "success",
			data: {
				user: updated_user,
			},
		};
		return NextResponse.json(json_response);
	} catch (error) {
		if (error.code === "P2025") {
			let error_response = {
				status: "fail",
				message: "No user with the Provided ID Found",
			};
			return new NextResponse(JSON.stringify(error_response), {
				status: 404,
				headers: { "Content-Type": "application/json" },
			});
		}

		let error_response = {
			status: "error",
			message: error.message,
		};
		return new NextResponse(JSON.stringify(error_response), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}

export async function DELETE(request, { params }) {
	try {
		const id = params.id;
		await prisma.user.delete({ where: { id: id } });

		return new NextResponse(null, { status: 204 });
	} catch (error) {
		if (error.code === "P2025") {
			let error_response = {
				status: "fail",
				message: "No user with the Provided ID Found",
			};
			return new NextResponse(JSON.stringify(error_response), {
				status: 404,
				headers: { "Content-Type": "application/json" },
			});
		}

		let error_response = {
			status: "error",
			message: error.message,
		};
		return new NextResponse(JSON.stringify(error_response), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}