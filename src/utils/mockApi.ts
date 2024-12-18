export const fetchReports = (): Promise<any[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            TransactionId: "TX1234",
            date: "2024-12-12",
            accountHolder: "Irene",
            transactionType: "Deposit",
            amount: 5000,
            accountBalance: 20000,
          },
          {
            TransactionId: "TX5678",
            date: "2024-12-15",
            accountHolder: "John",
            transactionType: "Withdrawal",
            amount: 3000,
            accountBalance: 17000,
          },
        ]);
      }, 1000);
    });
  };
  