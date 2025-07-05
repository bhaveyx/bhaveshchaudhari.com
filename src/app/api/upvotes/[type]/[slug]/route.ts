import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
    params: Promise<{ type: string; slug: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { type, slug } = await params;
        const upvotesDocRef = adminDb.collection("upvotes").doc(type).collection("posts").doc(slug);
        const upvotesSnap = await upvotesDocRef.get();
        const upvotesCount = upvotesSnap.data()?.count || 0;
        return NextResponse.json({ upvotes: upvotesCount });
    } catch (error) {
        if (error instanceof Error) {
            return new NextResponse(error.message, { status: 500 });
        }
        return new NextResponse("An unknown error occurred", { status: 500 });
    }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
    try {
        const { type, slug } = await params;

        const upvotesDocRef = adminDb.collection("upvotes").doc(type).collection("posts").doc(slug);

        const upvotesSnap = await upvotesDocRef.get();

        if (!upvotesSnap.exists) {
            await upvotesDocRef.set({ count: 1 });
            return NextResponse.json({ upvotes: 1 });
        }

        await upvotesDocRef.update({ count: FieldValue.increment(1) });
        const updatedSnap = await upvotesDocRef.get();

        return NextResponse.json({ upvotes: updatedSnap.data()?.count });
    } catch (error) {
        if (error instanceof Error) {
            return new NextResponse(error.message, { status: 500 });
        }
        return new NextResponse("An unknown error occurred", { status: 500 });
    }
}