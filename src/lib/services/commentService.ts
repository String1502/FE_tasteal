import { getApiUrl } from '../constants/api';
import { CommentEntity } from '../models/entities/CommentEntity/CommentEntity';

class CommentService {
  public static async Create(
    recipeId: number,
    uid: string,
    comment: string
  ): Promise<CommentEntity> {
    const url = getApiUrl('CreateComment', recipeId.toString());
    const body = {
      account_id: uid,
      comment: comment,
    };

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  }
  public static async Get(recipeId: number) {
    const url = getApiUrl('GetComments', recipeId.toString());
    const res = await fetch(url, {
      method: 'GET',
    });
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  }
}

export default CommentService;
