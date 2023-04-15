import { ApiService, PagebleResponse } from 'src/utils/general/ApiService';
import UsersJSON from 'src/utils/database/users.json';
import ItemsJSON from 'src/utils/database/items.json';
import { GetUsers, GetItems } from 'src/utils/types/MainApi';

class MainService extends ApiService {
  public getUsers(page: number, pageSize: number): GetUsers {
    return this.sendRequest<GetUsers>('GET', UsersJSON, page, pageSize);
  }
  public getItems(page: number, pageSize: number): GetItems {
    return this.sendRequest<GetItems>('GET', ItemsJSON, page, pageSize);
  }
}

export const MainApi = new MainService();
