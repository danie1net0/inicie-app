export interface ApiPaginatedResponse<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    next: string;
    prev: string;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: [
      {
        active: boolean;
        label: string;
        url: string;
      },
    ];
    path: string;
    per_page: string;
    to: number;
    total: number;
  };
}
