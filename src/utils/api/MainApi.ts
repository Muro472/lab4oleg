import { ApiService } from 'src/utils/general/ApiService';
import UsersJSON from 'src/utils/database/users.json';
import ItemsJSON from 'src/utils/database/items.json';
import { GetUsers, GetItems, User } from 'src/utils/types/MainApi';

class MainService extends ApiService {
  public getUsers(page: number, pageSize: number): GetUsers {
    return this.sendRequest<GetUsers>('GET', UsersJSON, page, pageSize);
  }

  public getItems(page: number, pageSize: number): GetItems {
    return this.sendRequest<GetItems>('GET', ItemsJSON, page, pageSize);
  }

  public findItemsById(id: string[]): GetItems {
    const data = ItemsJSON.filter((item) => id.includes(item.id));
    return {
      content: data,
      totalPages: 1,
    };
  }

  public logIn(email: string, password: string): User | string {
    const data = UsersJSON.find((user) => user.email === email);
    if (data && data.password === password) {
      return data;
    }
    return 'Wrong email or password';
  }
}

export const MainApi = new MainService();
