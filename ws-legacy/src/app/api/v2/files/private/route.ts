import { gcsService } from "@/common/libs/GoogleCloudStorageService";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const filePath = searchParams.get("filePath");

    if (!filePath) throw new Error("Get files private: No file path");

    const signedUrl = await gcsService.getPrivateFileSignedUrlInBin({
      filePath,
    });

    return new NextResponse(JSON.stringify({ signedUrl }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: `Get File: ${error}` }), {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const filePath = searchParams.get("filePath");

    if (!filePath) throw new Error("Get files private: No file path");

    const formData = await req.formData();
    const file = formData.get("file") as File;

    await gcsService.uploadPrivateFileInBin({
      file,
      filePath,
    });

    return new NextResponse(
      JSON.stringify({ message: "Upload files success" }),
      {
        status: 200,
      },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: `Upload File: ${error}` }),
      {
        status: 500,
      },
    );
  }
}
