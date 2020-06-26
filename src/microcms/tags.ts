import { Tag } from "./type";
import { restClient, MicroCMSRestClient } from "./RestClient";

interface Response {
  contents: Tag[];
  totalCount: number;
  offset: number;
  limit: number;
}

const ENDPOINT = "/tags";

interface CreateTagResponse {
  ok: boolean;
  message: string;
  tag: string;
}

class TagsClient {
  constructor(client: MicroCMSRestClient) {
    this.client = client;
  }
  private client: MicroCMSRestClient;

  public async fetchAllTags(): Promise<Tag[]> {
    const res = await this.client.get<Response>({ endpoint: ENDPOINT });
    return res.contents;
  }

  public async createTag(tag: string): Promise<CreateTagResponse> {
    const res = await this.client.post<{ tag: string }, { message: string }>({
      endpoint: ENDPOINT,
      data: {
        tag: "",
      },
    });

    console.log("[res]", res);

    if (res.status === 201 && res.data.message === "Created") {
      return {
        ok: true,
        message: "タグの新規作成に成功しました。",
        tag,
      };
    }

    if (
      res.status === 400 &&
      res.data.message ===
        "'tag' field invalid. The value sent does not meet the number of characters allowed."
    ) {
      return {
        ok: false,
        message: "タグは1文字以上である必要があります。",
        tag,
      };
    }

    return {
      ok: false,
      message:
        "予期しないエラーが発生しました。システム管理者に連絡してください。",
      tag,
    };
  }
}

export const tagsClient = new TagsClient(restClient);
