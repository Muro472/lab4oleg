import { PagebleResponse } from 'src/utils/general/ApiService';

export interface Item {
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  id: string;
}

export type GetItems = PagebleResponse<Item>;

export interface User {
  userName: string;
  email: string;
  password: string;
  id: string;
  avatar: string;
}

export type GetUsers = PagebleResponse<User>;
