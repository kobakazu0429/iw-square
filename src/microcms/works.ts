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
}

export const worksClient = new WorksClient(restClient);
