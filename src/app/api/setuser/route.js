import dbconnect from "@/services/dbconnect";
import { user } from "@/services/user.model"

const { NextResponse } = require("next/server");



export async function POST(req) {
    let res;
    try {
        await dbconnect();
        const params = await req.json()
        const setuser = await user.create(params);
        const res = await setuser.save()
        console.log(res)
        return NextResponse.json({ "message": res, "success": true })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ "message": error, "success": false })
    }
}