import axios, { AxiosInstance } from "axios";

interface Options {
  baseUrl: string;
  apiKey: string;
  writeApiKey: string;
}

// see also: https://microcms.io/docs/content-api/get-list-contents
interface GetOptions {
  endpoint: string;
  params?: {
    limit?: number;
    depth?: number;
  };
}

interface PostOptions<T> {
  endpoint: string;
  data: T;
}

export class MicroCMSRestClient {
  constructor({ baseUrl, apiKey, writeApiKey }: Options) {
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

  public async post<T, U>({ endpoint, data }: PostOptions<U>) {
    const res = await this.microCms.post<T>(endpoint, data);
    return res.data;
  }
}

// TODO:ちゃんとチェックする
if (
  !process.env.MICROCMS_URL ||
  !process.env.MICROCMS_API_KEY ||
  !process.env.MICROCMS_WRITE_API_KEY
) {
  throw Error("not set microcms config to env");
}

export const restClient = new MicroCMSRestClient({
  baseUrl: process.env.MICROCMS_URL,
  apiKey: process.env.MICROCMS_API_KEY,
  writeApiKey: process.env.MICROCMS_WRITE_API_KEY,
});
