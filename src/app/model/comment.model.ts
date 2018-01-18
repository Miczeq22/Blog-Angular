export interface Comment {
  id?: number;
  userId: number;
  articleId: number;
  title: string;
  content: string;
  likes?: number;
  lastUpdateDate?: Date;
}
