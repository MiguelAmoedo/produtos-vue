export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    expiry_date: string;
    image: string;
    category_id: number;
    category_name: string;
  }
  
  export interface Pagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
  }
  
  export interface ProductsResponse {
    data: Product[];
    pagination: Pagination;
  }
  