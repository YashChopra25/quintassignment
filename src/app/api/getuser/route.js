import bcrpt from "bcrypt"
import dbconnect from "@/services/dbconnect";
import { user } from "@/services/user.model";
import { NextResponse } from "next/server";


export async function POST(req) {
    let result;
    try {
        let success = true;
        await dbconnect()
        const { email, password } = await req.json();
        console.log(email+ " " +password)
        result = await user.find({ email }, { password: 1 })
        if (!result.length) {
            result = "Invalid credentail";
            success = false;e;
        }
        let isverify = await bcrpt.compare(password, result?.[0].password)
        if (!isverify) {
            result = "Invalid credentail";
            success = false;
        }
        return NextResponse.json({ "message": result, "success": success })
    } catch (error) {
        return NextResponse.json({ "message": result, "success": false })
    }
}
