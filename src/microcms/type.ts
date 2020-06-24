export interface Tag {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  tag: string;
}

export interface Creator {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  name: string;
  icon: string;
  twitter_id: string;
  facebook_id: string;
}

export interface Work {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  title: string;
  image_url: string;
  tags: Tag[];
  creator: Creator;
  status: "public" | "pending" | "private";
}
