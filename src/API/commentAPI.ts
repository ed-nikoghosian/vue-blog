import RequestInstance from '@/services/axios';
import { CommentData, Comment } from '@/services/types';

export const commentAPI = {
  async getComments(postId: number, parent: null | string | number = 0) {
    const response = await RequestInstance().get<Comment[]>(
      `/comments?postId=${postId}&parent=${parent || 0}`
    );

    return response.data;
  },
  async addComment(data: CommentData, parent: number | null = null) {
    const response = await RequestInstance().post<Comment>('/comments', {
      ...data,
      parent: parent || 0,
      createdAt: new Date().toDateString(),
    });

    return response.data;
  },
};
