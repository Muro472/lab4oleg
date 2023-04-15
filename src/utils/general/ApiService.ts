export type PagebleResponse<T> = {
  content: T[];
  totalPages: number;
};

export class ApiService {
  protected sendRequest<T>(
    type: 'GET' | 'POST' | 'PUT' | 'DELETE',
    JSON: { [key: string]: string }[],
    page: number,
    pageSize: number
  ) {
    if (type === 'GET') {
      return this.getPagebleData<T>(JSON, page, pageSize);
    }

    return {
      content: [],
      totalPages: 0,
    };
  }

  private getPagebleData<T>(
    JSON: { [key: string]: string }[],
    page: number,
    pageSize: number
  ) {
    const length = JSON.length;
    const totalPages = Math.ceil(length / pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const data = JSON.slice(start, end);

    return {
      content: data,
      totalPages: totalPages,
    } as T;
  }
}
