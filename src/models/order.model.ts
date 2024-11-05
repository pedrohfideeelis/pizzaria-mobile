export interface Order {
    id: number;
    items: any[];
    total: number;
    address: string;
    paymentMethod: string;
    status: string;
    date: string;
  }
  