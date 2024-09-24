export interface Coupon {
    code: string;
    discountType: 'percent' | 'fixed'; // Percentual ou valor fixo
    discountValue: number; // Percentual (0 a 100) ou valor monetário
    isUsed: boolean; // Flag que indica se o cupom já foi utilizado
}