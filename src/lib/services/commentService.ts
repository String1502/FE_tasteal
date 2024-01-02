import { getApiUrl } from '../constants/api';
import { CommentEntity } from '../models/entities/CommentEntity/CommentEntity';

class CommentService {
  public static Create(
    recipeId: number,
    uid: string,
    comment: string
  ): Promise<CommentEntity> {
    const url = getApiUrl('CreateComment', recipeId.toString());
    const body = {
      account_id: uid,
      comment: comment,
    };

    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    });
  }
  public static Get(recipeId: number) {
    const url = getApiUrl('GetComments', recipeId.toString());
    return fetch(url, {
      method: 'GET',
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    });
  }
}

export default CommentService;
