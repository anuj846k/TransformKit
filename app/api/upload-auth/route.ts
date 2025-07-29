// @ts-nocheck
import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  try {
    // Generate authentication parameters using ImageKit SDK
    const { token, expire, signature } = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
      // Add buffer for production timing issues
      expire: Math.floor(Date.now() / 1000) + (45 * 60), // 45 minutes instead of default
    });

    return Response.json({
      token,
      expire,
      signature,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    });
  } catch (error) {
    console.error("Upload auth error:", error);
    return Response.json(
      { error: "Failed to generate upload authentication" },
      { status: 500 }
    );
  }
}