import axios, { AxiosInstance, AxiosError } from "axios";

interface RestClientOptions {
  baseUrl: string;
  apiKey: string;
  writeApiKey: string;
}

interface CommonOptions {
  endpoint: string;
}

// see also: https://microcms.io/docs/content-api/get-list-contents
interface GetOptions extends CommonOptions {
  params?: {
    limit?: number;
    depth?: number;
    filters?: string;
  };
}

interface PostOptions<T> extends CommonOptions {
  data: T;
}

// interface DeleteOptions extends CommonOptions {
//   contentId: string;
// }

export class MicroCMSRestClient {
  constructor({ baseUrl, apiKey, writeApiKey }: RestClientOptions) {
    this.microCms = axios.create({
      baseURL: baseUrl,
      headers: {
        "X-API-KEY": apiKey,
        "X-WRITE-API-KEY": writeApiKey,
      },
    });
  }

  private microCms: AxiosInstance;

  public async get<T>({ endpoint, params = { limit: 100 } }: GetOptions) {
    const res = await this.microCms.get<T>(endpoint, {
      params,
    });
    return res.data;
  }

  public async post<T, U>({ endpoint, data }: PostOptions<T>) {
    const res = await this.microCms
      .post<U>(endpoint, data)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .catch((e: AxiosError<U>) => e.response!);
    return res;
  }

  // TODO: MicroCMSがDELETE/PUTに対応したら処理できるようにする
  // public async delete({ endpoint, contentId }: DeleteOptions) {
  //   const res = await this.microCms.delete(endpoint);
  // }
}

// TODO:ちゃんとチェックする
if (
  !process.env.NEXT_PUBLIC_MICROCMS_URL ||
  !process.env.NEXT_PUBLIC_MICROCMS_API_KEY ||
  !process.env.NEXT_PUBLIC_MICROCMS_WRITE_API_KEY
) {
  throw Error(`not set microcms config to env
${process.env.NEXT_PUBLIC_MICROCMS_URL}
${process.env.NEXT_PUBLIC_MICROCMS_API_KEY}`);
}

export const restClient = new MicroCMSRestClient({
  baseUrl: process.env.NEXT_PUBLIC_MICROCMS_URL,
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY,
  writeApiKey: process.env.NEXT_PUBLIC_MICROCMS_WRITE_API_KEY,
});
