export interface Transaction {
  id: number;
  contractName: string;
  accountNumber: string;
  amountPaid: number;
}
export interface TransactionResponse {
  transactions: Transaction[];
}
