import axios, { AxiosInstance, AxiosError } from "axios";

const UNAUTHENTICATED_UPLOAD_PRESET = "se3x8sv0";
interface RestClientOptions {
  baseUrl: string;
}

interface UploadOptions {
  data: string;
}

interface UploadResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  width: number;
  height: number;
  format: string;
  created_at: Date;
  resource_type: string;
  tags: any[];
  bytes: number;
  type: string;
  etag: string;
  url: string;
  secure_url: string;
  signature: string;
  original_filename: string;
  placeholder: boolean;
}

interface UploadImageResponse {
  ok: boolean;
  message: string;
  publicId: UploadResponse["public_id"];
}

export class CloudinaryRestClient {
  constructor({ baseUrl }: RestClientOptions) {
    this.cloudinary = axios.create({
      baseURL: baseUrl,
    });
  }

  private cloudinary: AxiosInstance;

  public async uploadImage({
    data,
  }: UploadOptions): Promise<UploadImageResponse> {
    const res = await this.cloudinary
      .post<UploadResponse>("", {
        file: data,
        upload_preset: UNAUTHENTICATED_UPLOAD_PRESET,
      })
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .catch((e: AxiosError<UploadResponse>) => e.response!);

    if (res.status === 200) {
      return {
        ok: true,
        message: "画像のアップロードに成功しました。",
        publicId: res.data.public_id,
      };
    }

    return {
      ok: false,
      message: "画像のアップロードに失敗しました。",
      publicId: res.data.public_id,
    };
  }
}

export const cloudinaryRestClient = new CloudinaryRestClient({
  baseUrl: "https://api.cloudinary.com/v1_1/iw-square/image/upload",
});
