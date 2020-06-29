import { Work } from "./type";
import { restClient, MicroCMSRestClient } from "./RestClient";

interface Response {
  contents: Work[];
  totalCount: number;
  offset: number;
  limit: number;
}

interface CreatePayload
  extends Weaken<
    Omit<Work, "id" | "createdAt" | "updatedAt" | "publishedAt">,
    "tags" | "creator"
  > {
  tags: string[];
  creator: string;
}

interface CreateResponse {
  ok: boolean;
  message: string;
  creator: CreatePayload;
}

const ENDPOINT = "/works";

class WorksClient {
  constructor(client: MicroCMSRestClient) {
    this.resuClient = client;
  }
  private resuClient: MicroCMSRestClient;

  public async fetchAllWorks({
    onlyPublic = true,
  }: {
    onlyPublic?: boolean;
  } = {}): Promise<Work[]> {
    const onlyPublicFilter = "status[equals]public";
    const filters = onlyPublic ? onlyPublicFilter : "";

    const res = await this.resuClient.get<Response>({
      endpoint: ENDPOINT,
      params: {
        filters,
        limit: 100,
      },
    });
    return res.contents;
  }

  public async createWork(data: CreatePayload): Promise<CreateResponse> {
    console.log(data);

    const res = await this.resuClient.post<CreatePayload, string>({
      endpoint: ENDPOINT,
      data,
    });

    if (res.status === 201) {
      return {
        ok: true,
        message: "作品の新規作成に成功しました。",
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

export const worksClient = new WorksClient(restClient);
