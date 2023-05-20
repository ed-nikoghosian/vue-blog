import RequestInstance from '@/services/axios';
import { User } from '@/services/types';

export const authAPI = {
  async createUser(user: User) {
    const existingUser = await RequestInstance().get<User[]>(`/users?email=${user.email}`);
    if (existingUser.data?.length && existingUser.data[0].email === user.email) {
      return Promise.reject({ message: 'This email is allready taken' });
    }
    const response = await RequestInstance().post<User>('/users', user);

    return response.data;
  },
  async getUser(token: string) {
    const response = await RequestInstance().get<User[]>(`/users?token=${token}`);

    return response.data?.length ? response.data[0] : null;
  },
};
