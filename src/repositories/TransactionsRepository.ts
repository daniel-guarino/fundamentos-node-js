import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}


interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    if (this.transactions.length === 0) {
      throw Error("You don't have any transaction");
    }

    return this.transactions

  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((accumulated, totalAccumuled) => accumulated + totalAccumuled.value,0);

    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((accumulated, totalAccumulated) => accumulated + totalAccumulated.value,0);

    const total = income - outcome;

    const balance : Balance = { income, outcome, total };

    return balance;
  }

  public create({ title, value, type }:CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;


  }
}

export default TransactionsRepository;
