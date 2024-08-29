import { Storage } from "@google-cloud/storage";

class GoogleCloudStorageService {
  #options = {
    projectId: process.env.GCS_PROJECT_ID,
    credentials: {
      client_email: process.env.GCS_CLIENT_EMAIL,
      private_key: process.env.GCS_PRIVATE_KEY?.split(String.raw`\n`).join(
        "\n",
      ),
    },
    apiEndPoint: undefined,
  };

  async getBinBucket({ rootFolderName }: { rootFolderName: string }) {
    return new Storage({
      ...this.#options,
      apiEndpoint: "bin.docenty.ai",
    }).bucket(rootFolderName);
  }

  async getPrivateFileInBin({ filePath }: { filePath: string }) {
    const rootFolderName = "pri-files";
    const replacedFilePath = filePath.replace("pri-files/", "");
    return (
      await this.getBinBucket({
        rootFolderName,
      })
    ).file(replacedFilePath);
  }

  async getPrivateFileSignedUrlInBin({ filePath }: { filePath: string }) {
    const now = Date.now();
    const expires = new Date(now + 60 * 60 * 1000);
    const binPrivateFile = await this.getPrivateFileInBin({
      filePath,
    });
    const signedUrl = (
      await binPrivateFile.getSignedUrl({
        action: "read",
        expires: expires.getTime(),
        version: "v4",
        responseDisposition: "attachment",
      })
    )[0];

    return signedUrl;
  }

  async uploadPrivateFileInBin({
    file,
    filePath,
  }: {
    file: File;
    filePath: string;
  }) {
    const contentType = file.type;
    const now = Date.now();
    const expires = new Date(now + 5 * 60 * 1000);
    const privateFileInBin = await this.getPrivateFileInBin({
      filePath,
    });

    const signedUrl = (
      await privateFileInBin.getSignedUrl({
        action: "write",
        expires: expires.getTime(),
        contentType,
        version: "v4",
      })
    )[0];

    const res = await fetch(signedUrl, {
      method: "PUT",
      headers: { "Content-Type": contentType },
      body: file,
    });

    if (!res.ok) throw new Error("PUT: uploadPrivateFileInBin");
  }
}

export const gcsService = new GoogleCloudStorageService();
