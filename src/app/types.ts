import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface Options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export interface Products {
  items: Product[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  rating: number;
  ownerId: number;
  ownerName: string;
  description: string;
  createdAt: string;
  category: string;
  available: boolean;
  views: number;
  tags: string[];
  location: string;
}

export interface PaginationParams {
  [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  page: number;
  perPage: number;
}
export type PopupMode = 'add' | 'edit' | 'view' | 'custom' | null;

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export type UserRole = 'admin' | 'user';

export interface AuthUser {
  id: number;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  verified: boolean;
  avatar: string;
  createdAt: string;
  lastLogin: string | null;
  favorites: number[];
}

export interface RegisterPayload {
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface UpdateUserPayload {
  email?: string;
  name?: string;
  role?: 'admin' | 'user';
  isActive?: boolean;
  verified?: boolean;
  avatar?: string;
  [key: string]: any; // fallback
}
