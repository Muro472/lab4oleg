import { PagebleResponse } from 'src/utils/general/ApiService';

export interface Item {
  name: string;
  price: string;
  description: string;
  imageUrl: string;
}

export type GetItems = PagebleResponse<Item>;

export interface User {
  userName: string;
  email: string;
  password: string;
}

export type GetUsers = PagebleResponse<User>;