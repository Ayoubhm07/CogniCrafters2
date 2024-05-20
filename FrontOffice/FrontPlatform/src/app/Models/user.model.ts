export enum Sex {
  Male = 'MALE',
  Female = 'FEMALE',
}

export interface ApiUser {
  attributes?: {
    adresse?: string[];
    image?: string[];
    phone?: string[];
    sex?: string[];
    verified?: string[];
  };
  email: string;
  firstName: string;
  lastName: string;
}

export interface User {
  id?: string;
  userName?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  adresse?: string | null;
  sex?: Sex | null;
  phone?: number | null;
  verified?: boolean;
  image?: string | null;
  isEnabled?: boolean;
}
