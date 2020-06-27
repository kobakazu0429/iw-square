import { Creator } from "./type";
import { restClient, MicroCMSRestClient } from "./RestClient";

interface Response {
  contents: Creator[];
  totalCount: number;
  offset: number;
  limit: number;
}

type CreatePayload = Omit<
  Creator,
  "id" | "createdAt" | "updatedAt" | "publishedAt"
>;

interface CreateResponse {
  ok: boolean;
  message: string;
  creator: CreatePayload;
}

const ENDPOINT = "/creators";

class CreatorsClient {
  constructor(client: MicroCMSRestClient) {
    this.resuClient = client;
  }
  private resuClient: MicroCMSRestClient;

  public async fetchAllCreators(): Promise<Creator[]> {
    const res = await this.resuClient.get<Response>({ endpoint: ENDPOINT });
    return res.contents;
  }

  public async createCreator(data: CreatePayload): Promise<CreateResponse> {
    const res = await this.resuClient.post<CreatePayload, string>({
      endpoint: ENDPOINT,
      data,
    });

    if (res.status === 201) {
      return {
        ok: true,
        message: "クリエイターの新規作成に成功しました。",
        creator: data,
      };
    }

    return {
      ok: false,
      message:
        "予期しないエラーが発生しました。システム管理者に連絡してください。",
      creator: data,
    };
  }
}

export const creatorsClient = new CreatorsClient(restClient);
