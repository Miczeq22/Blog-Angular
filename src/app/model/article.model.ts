
export interface Article {
  id?: number;
  title: string;
  content: string;
  userId: number;
  likes?: number;
  imgUrl?: string;
  lastUpdateDate?: Date;
}
