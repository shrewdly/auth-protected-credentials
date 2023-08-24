import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
	// const page_str = request.nextUrl.searchParams.get("page");
	// const limit_str = request.nextUrl.searchParams.get("limit");

	// const page = page_str ? parseInt(page_str, 10) : 1;
	// const limit = limit_str ? parseInt(limit_str, 10) : 10;
	// // const skip = (page - 1) * limit;

	// const users = await prisma.user.findMany({
	// 	// skip,
	// 	take: limit,
	// });
	const users = await prisma.user.findMany();

	let json_response = {
		status: "success",
		results: users.length,
		users,
	};
	return NextResponse.json(json_response);
}

export async function POST(request) {
	console.log("step 2");
	try {
		const json = await request.json();

		const user = await prisma.user.create({
			data: json,
		});

		let json_response = {
			status: "success",
			data: {
				user,
			},
		};
		return new NextResponse(JSON.stringify(json_response), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		if (error.code === "P2002") {
			let error_response = {
				status: "fail",
				message: "user with title already exists",
			};
			return new NextResponse(JSON.stringify(error_response), {
				status: 409,
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
