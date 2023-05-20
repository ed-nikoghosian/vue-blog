import RequestInstance from '@/services/axios';
import { Response, Post, PostRequestData, PostData } from '@/services/types';

export const postAPI = {
  async getPosts() {
    const response = await RequestInstance().get<Response<Post[]>>('/posts');

    return response.data;
  },
  async getPostById(postId: number) {
    const response = await RequestInstance().get<Response<Post[]>>(`/posts/${postId}`);

    return response.data;
  },
  async createPost(data: PostRequestData) {
    const response = await RequestInstance().post<Response<Post>>('/posts', data);

    return response.data;
  },
  async editPost(postId: number, data: PostData) {
    const response = await RequestInstance().patch<Response<Post>>(`/posts/${postId}`, data);

    return response.data;
  },
  async deletePost(postId: number) {
    const response = await RequestInstance().delete<Response<{ message: string }>>(
      `/posts/${postId}`
    );

    return response.data;
  },
};
