import { NextRequest, NextResponse } from "next/server";

const getRequestParams = (email: string) => {
    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

    if (!API_KEY || !AUDIENCE_ID) {
        throw new Error("Mailchimp API Key or Audience ID is not configured.");
    }

    const DATACENTER = API_KEY.split("-")[1];

    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

    const data = {
        email_address: email,
        status: "subscribed"
    };

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`
    };

    return {
        url,
        data,
        headers
    };
};

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email || email.length === 0) {
            return new NextResponse("Please provide email", { status: 400 });
        }

        const { url, data, headers } = getRequestParams(email);

        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Mailchimp API Error:", errorData);
            // Mailchimp returns 400 for already subscribed members
            if (response.status === 400 && errorData.title === "Member Exists") {
                return NextResponse.json({ message: "You are already subscribed!" }, { status: 400 });
            }
            throw new Error(errorData.detail || "Mailchimp subscription failed.");
        }

        return NextResponse.json({ message: "Successfully subscribed!" }, { status: 201 });
    } catch (error) {
        console.error("Subscription error:", error);
        return NextResponse.json(
            { message: "Oops ! something went wrong...Please email me at bhic2030@gmail.com, i will add you to the mailing list." },
            { status: 400 }
        );
    }
}