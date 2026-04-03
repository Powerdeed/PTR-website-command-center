export interface Service {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  status: boolean;
}

export interface NewService {
  name: string;
  description: string;
  imageUrl: string;
  status: boolean;
}
