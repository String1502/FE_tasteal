export type CommentReq = {
  account_id: string;
  comment: string;
  image?: string;
};

export type CommentReqPut = {
  comment: string;
  image?: string;
};
