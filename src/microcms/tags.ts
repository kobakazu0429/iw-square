import { Tag } from "./type";
import { restClient, MicroCMSRestClient } from "./RestClient";

interface Response {
  contents: Tag[];
  totalCount: number;
  offset: number;
  limit: number;
}

const ENDPOINT = "/tags";

class TagsClient {
  constructor(client: MicroCMSRestClient) {
    this.resuClient = client;
  }
  private resuClient: MicroCMSRestClient;

  public async fetchAllTags(): Promise<Tag[]> {
    const res = await this.resuClient.get<Response>({ endpoint: ENDPOINT });
    return res.contents;
  }
}

export const tagsClient = new TagsClient(restClient);
