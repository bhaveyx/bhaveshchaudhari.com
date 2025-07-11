import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
    params: Promise<{ type: string; slug: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { type, slug } = await params;
        const viewsDocRef = adminDb.collection("views").doc(type).collection("posts").doc(slug);
        const viewsSnap = await viewsDocRef.get();
        const viewsCount = viewsSnap.data()?.count || 0;
        return NextResponse.json({ views: viewsCount });
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

        if (process.env.NODE_ENV === 'development') {
            const viewsDocRef = adminDb.collection("views").doc(type).collection("posts").doc(slug);
            const viewsSnap = await viewsDocRef.get();
            const viewsCount = viewsSnap.data()?.count || 0;
            return NextResponse.json({ views: viewsCount });
        }

        const viewsDocRef = adminDb.collection("views").doc(type).collection("posts").doc(slug);

        const viewsSnap = await viewsDocRef.get();

        if (!viewsSnap.exists) {
            await viewsDocRef.set({ count: 1 });
            return NextResponse.json({ views: 1 });
        }

        await viewsDocRef.update({ count: FieldValue.increment(1) });
        const updatedSnap = await viewsDocRef.get();

        return NextResponse.json({ views: updatedSnap.data()?.count });
    } catch (error) {
        if (error instanceof Error) {
            return new NextResponse(error.message, { status: 500 });
        }
        return new NextResponse("An unknown error occurred", { status: 500 });
    }
}