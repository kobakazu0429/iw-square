import { Work } from "./type";
import { restClient, MicroCMSRestClient } from "./RestClient";

interface Response {
  contents: Work[];
  totalCount: number;
  offset: number;
  limit: number;
}

const ENDPOINT = "/works";

class WorksClient {
  constructor(client: MicroCMSRestClient) {
    this.resuClient = client;
  }
  private resuClient: MicroCMSRestClient;

  public async fetchAllWorks(): Promise<Work[]> {
    const res = await this.resuClient.get<Response>({ endpoint: ENDPOINT });
    return res.contents;
  }
}

export const worksClient = new WorksClient(restClient);
