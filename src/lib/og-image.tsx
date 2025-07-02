import { ImageResponse } from "next/og"
import type { BlogPost } from "./blog"
import { WEBSITE_DOMAIN } from "@/constants"

export const runtime = "edge"

interface OGImageProps {
    title: string
    description?: string
    author?: string
    authorImage?: string
    category?: string
    tags?: string[]
    type?: "blog" | "homepage" | "page"
    publishedAt?: string
}

export async function generateOGImage({
    title,
    description,
    author = "Bhavesh Chaudhari",
    authorImage = "https://pbs.twimg.com/profile_images/1940107426335690752/RZh81wHs_400x400.jpg",
    type = "blog",
    publishedAt,
}: OGImageProps) {
    try {
        return new ImageResponse(
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    backgroundColor: "#ffffff",
                    backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                    padding: "60px",
                    fontFamily: "Inter, sans-serif",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        marginBottom: "40px",
                    }}
                >
                    {
                        type === "blog" && <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                            }}
                        >
                            {authorImage && (
                                <img
                                    src={authorImage}
                                    alt={author}
                                    style={{
                                        width: "75px",
                                        height: "75px",
                                        borderRadius: "50%",
                                        border: "3px solid #10b981",
                                    }}
                                />
                            )}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "30px",
                                        fontWeight: "600",
                                        color: "#111827",
                                    }}
                                >
                                    {author}
                                </div>
                                {
                                    publishedAt && <div
                                        style={{
                                            fontSize: "22px",
                                            color: "#6b7280",
                                        }}
                                    >
                                        {
                                            publishedAt
                                        }
                                        {/* {new Date().toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })} */}
                                    </div>
                                }
                            </div>
                        </div>
                    }
                    {/* <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}
                    >
                        <div
                            style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #10b981, #059669)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                                fontSize: "24px",
                                fontWeight: "600",
                            }}
                        >
                            BC
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "24px",
                                    fontWeight: "600",
                                    color: "#111827",
                                }}
                            >
                                Bhavesh Chaudhari
                            </div>
                            <div
                                style={{
                                    fontSize: "16px",
                                    color: "#6b7280",
                                }}
                            >
                                Developer & Tech Writer
                            </div>
                        </div>
                    </div> */}

                    {/* {category && (
                        <div
                            style={{
                                backgroundColor: "#d1fae5",
                                color: "#065f46",
                                padding: "8px 16px",
                                borderRadius: "20px",
                                fontSize: "14px",
                                fontWeight: "500",
                            }}
                        >
                            {category}
                        </div>
                    )} */}
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        width: "100%",
                        justifyContent: "center",
                    }}
                >
                    <h1
                        style={{
                            fontSize: type === "homepage" ? "64px" : "54px",
                            fontWeight: "600",
                            color: "#111827",
                            lineHeight: "1.1",
                            marginBottom: "24px",
                            maxWidth: "90%",
                        }}
                    >
                        {title}
                    </h1>

                    {type !== "blog" && description && (
                        <p
                            style={{
                                fontSize: "24px",
                                color: "#4b5563",
                                lineHeight: "1.4",
                                marginBottom: "32px",
                                maxWidth: "85%",
                            }}
                        >
                            {description.length > 150 ? `${description.substring(0, 150)}...` : description}
                        </p>
                    )}
                    {/* 
                    {tags.length > 0 && (
                        <div
                            style={{
                                display: "flex",
                                gap: "12px",
                                flexWrap: "wrap",
                                marginTop: "20px",
                            }}
                        >
                            {tags.slice(0, 4).map((tag, index) => (
                                <div
                                    key={index}
                                    style={{
                                        backgroundColor: "#f3f4f6",
                                        color: "#374151",
                                        padding: "6px 12px",
                                        borderRadius: "12px",
                                        fontSize: "14px",
                                    }}
                                >
                                    {tag}
                                </div>
                            ))}
                        </div>
                    )} */}
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        marginTop: "40px",
                        paddingTop: "32px",
                        borderTop: "2px solid #e5e7eb",
                    }}
                >
                    {/* <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}
                    >
                        {authorImage && (
                            <img
                                src={authorImage || "/placeholder.svg"}
                                alt={author}
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    borderRadius: "50%",
                                    border: "3px solid #10b981",
                                }}
                            />
                        )}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "600",
                                    color: "#111827",
                                }}
                            >
                                {author}
                            </div>
                            <div
                                style={{
                                    fontSize: "14px",
                                    color: "#6b7280",
                                }}
                            >
                                {new Date().toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </div>
                        </div>
                    </div> */}

                    <div
                        style={{
                            fontSize: "20px",
                            color: "#10b981",
                            fontWeight: "500",
                            display: "flex",
                        }}
                    >
                        www.{WEBSITE_DOMAIN}
                    </div>
                </div>

                <div
                    style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        width: "300px",
                        height: "300px",
                        background: "linear-gradient(135deg, #10b981, #059669)",
                        opacity: "0.1",
                        borderRadius: "50%",
                        transform: "translate(50%, -50%)",
                    }}
                />
                {/* <div
                    style={{
                        position: "absolute",
                        bottom: "0",
                        left: "0",
                        width: "150px",
                        height: "150px",
                        background: "linear-gradient(135deg, #34d399, #10b981)",
                        opacity: "0.1",
                        borderRadius: "50%",
                        transform: "translate(-50%, 50%)",
                    }}
                /> */}
            </div>,
            {
                width: 1200,
                height: 630,
            },
        )
    } catch (error) {
        console.error("Error generating OG image:", error)

        // fallback simple image
        return new ImageResponse(
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#10b981",
                    color: "white",
                    fontSize: "48px",
                    fontWeight: "600",
                    textAlign: "center",
                    padding: "60px",
                }}
            >
                <div style={{ marginBottom: "20px" }}>Bhavesh Chaudhari</div>
                <div style={{ fontSize: "24px", opacity: "0.9" }}>Developer & Tech Writer</div>
            </div>,
            {
                width: 1200,
                height: 630,
            },
        )
    }
}

export function generateBlogPostOGImage(post: BlogPost) {
    console.log("Generating OG image for blog post:", post.title)

    return generateOGImage({
        title: post.title,
        description: post.excerpt,
        author: post.author,
        authorImage: post.authorImage,
        category: post.category,
        tags: post.tags,
        type: "blog",
        publishedAt: post.publishedAt
    })
}

export function generateHomepageOGImage() {
    return generateOGImage({
        title: "Bhavesh Chaudhari",
        description: "Programmer. Bringing Ideas To Life. Δ ThinkLearnExecute.",
        type: "homepage",
    })
}
