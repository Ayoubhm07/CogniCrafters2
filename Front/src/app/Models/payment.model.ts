export interface Payment {
  id: string;
  amount: number;
  currency: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  // Ajoutez d'autres propriétés si nécessaire
}
