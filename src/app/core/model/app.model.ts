export interface Transaction {
  id: number;
  contractorName: string;
  accountNumber: string;
  amountPaid: number;
  isAddedToCart?: boolean;
}
export interface TransactionResponse {
  transactions: Transaction[];
}
