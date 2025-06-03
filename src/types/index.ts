export interface Skip {
  id: number;
  size: number;
  type: string;
  price: number;
  currency: string;
  hirePeriod: number;
  image: string;
  allowedOnRoad: boolean;
}

export interface ApiResponse {
  skips: Skip[];
  location: {
    postcode: string;
    area: string;
  };
}