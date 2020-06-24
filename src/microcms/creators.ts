import { Creator } from "./type";
import { restClient, MicroCMSRestClient } from "./RestClient";

interface Response {
  contents: Creator[];
  totalCount: number;
  offset: number;
  limit: number;
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
}

export const creatorsClient = new CreatorsClient(restClient);
