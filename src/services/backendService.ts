
// This file will integrate with the Django backend once it's set up

export interface Expense {
  id: number;
  amount: number;
  category: string;
  date: string;
  description: string;
}

export interface BudgetRecommendation {
  category: string;
  recommendedAmount: number;
  reasoning: string;
}

export interface SavingTip {
  tip: string;
  potentialSaving: number;
  category: string;
}

// These functions are placeholders that would connect to your Django backend
export const fetchExpenses = async (): Promise<Expense[]> => {
  // This would make a fetch request to your Django API
  // Example: return await fetch('/api/expenses').then(res => res.json());
  
  // For now, return demo data
  return [
    { id: 1, amount: 25.50, category: "Food", date: "2023-04-15", description: "Grocery shopping" },
    { id: 2, amount: 45.00, category: "Transportation", date: "2023-04-14", description: "Gas" },
    { id: 3, amount: 850.00, category: "Housing", date: "2023-04-10", description: "Rent" },
    { id: 4, amount: 15.99, category: "Entertainment", date: "2023-04-13", description: "Movie tickets" },
    { id: 5, amount: 120.00, category: "Utilities", date: "2023-04-11", description: "Electricity bill" },
  ];
};

export const addExpense = async (expense: Omit<Expense, 'id'>): Promise<Expense> => {
  // This would make a POST request to your Django API
  // Example: return await fetch('/api/expenses', { 
  //   method: 'POST', 
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(expense)
  // }).then(res => res.json());
  
  // For now, return a mock response
  return {
    id: Math.floor(Math.random() * 1000),
    ...expense
  };
};

export const getGeminiInsights = async (): Promise<{
  budgetRecommendations: BudgetRecommendation[];
  savingTips: SavingTip[];
}> => {
  // This would call your Django backend which would use the Gemini API
  // Example: return await fetch('/api/insights').then(res => res.json());
  
  // For now, return mock data
  return {
    budgetRecommendations: [
      {
        category: "Food",
        recommendedAmount: 400,
        reasoning: "Based on your household size and average spending patterns"
      },
      {
        category: "Entertainment",
        recommendedAmount: 150,
        reasoning: "Consider reducing slightly to meet savings goals"
      }
    ],
    savingTips: [
      {
        tip: "Consider meal prepping to reduce food expenses",
        potentialSaving: 80,
        category: "Food"
      },
      {
        tip: "Your utility bills could be reduced with energy-efficient appliances",
        potentialSaving: 45,
        category: "Utilities"
      }
    ]
  };
};
