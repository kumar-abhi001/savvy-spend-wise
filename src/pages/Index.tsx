
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Plus, TrendingUp, PiggyBank, Calendar, DollarSign, Tag, BarChart3, MessageSquareText } from "lucide-react";
import { GeminiInsights } from "@/components/ai-insights/GeminiInsights";

// Sample data for demonstration
const EXPENSE_CATEGORIES = [
  "Food", "Transportation", "Housing", "Utilities", "Entertainment", "Healthcare", "Shopping", "Education", "Travel", "Other"
];

const DUMMY_EXPENSES = [
  { id: 1, amount: 25.50, category: "Food", date: "2023-04-15", description: "Grocery shopping" },
  { id: 2, amount: 45.00, category: "Transportation", date: "2023-04-14", description: "Gas" },
  { id: 3, amount: 850.00, category: "Housing", date: "2023-04-10", description: "Rent" },
  { id: 4, amount: 15.99, category: "Entertainment", date: "2023-04-13", description: "Movie tickets" },
  { id: 5, amount: 120.00, category: "Utilities", date: "2023-04-11", description: "Electricity bill" },
];

const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#D6BCFA', '#F2FCE2', '#FEF7CD', '#FEC6A1'];

const DUMMY_MONTHLY_DATA = [
  { name: 'Jan', expenses: 2400 },
  { name: 'Feb', expenses: 1398 },
  { name: 'Mar', expenses: 2800 },
  { name: 'Apr', expenses: 3908 },
  { name: 'May', expenses: 4800 },
  { name: 'Jun', expenses: 3800 },
];

const DUMMY_AI_TIPS = [
  "Based on your spending patterns, you could save $120 monthly by reducing restaurant expenses.",
  "Your utility bills are higher than average. Consider energy-efficient appliances to save long-term.",
  "You're spending consistently on subscriptions. Review unused services to cut monthly costs.",
  "Good job maintaining your transportation budget under control!"
];

const Index = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);
  const [newExpense, setNewExpense] = useState({
    amount: "",
    category: "",
    date: new Date().toISOString().slice(0, 10),
    description: ""
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [aiAnalysisLoading, setAiAnalysisLoading] = useState(false);
  const [aiTips, setAiTips] = useState(DUMMY_AI_TIPS);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExpense(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setNewExpense(prev => ({ ...prev, category: value }));
  };

  const handleAddExpense = () => {
    if (!newExpense.amount || !newExpense.category) return;
    
    const expense = {
      id: expenses.length + 1,
      amount: parseFloat(newExpense.amount),
      category: newExpense.category,
      date: newExpense.date,
      description: newExpense.description
    };
    
    setExpenses([expense, ...expenses]);
    setNewExpense({
      amount: "",
      category: "",
      date: new Date().toISOString().slice(0, 10),
      description: ""
    });
    setIsAddDialogOpen(false);
  };

  const calculateCategoryTotals = () => {
    const totals: Record<string, number> = {};
    expenses.forEach(expense => {
      if (totals[expense.category]) {
        totals[expense.category] += expense.amount;
      } else {
        totals[expense.category] = expense.amount;
      }
    });
    return Object.entries(totals).map(([name, value]) => ({ name, value }));
  };

  const getAiBudgetAnalysis = () => {
    setAiAnalysisLoading(true);
    // In a real implementation, this would make a call to your Django backend
    // which would then use the Gemini API to generate budget insights
    setTimeout(() => {
      setAiAnalysisLoading(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gradient mb-2">Savvy Spend Wise</h1>
        <p className="text-muted-foreground">Your AI-Powered Expense Tracker</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="dashboard" className="text-sm">Dashboard</TabsTrigger>
              <TabsTrigger value="expenses" className="text-sm">Expenses</TabsTrigger>
              <TabsTrigger value="budget" className="text-sm">Budget</TabsTrigger>
              <TabsTrigger value="reports" className="text-sm">Reports</TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Monthly Spending
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={DUMMY_MONTHLY_DATA}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="expenses" stroke="#9b87f5" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <PiggyBank className="h-5 w-5" />
                      Spending by Category
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={calculateCategoryTotals()}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {calculateCategoryTotals().map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Recent Expenses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expenses.slice(0, 5).map(expense => (
                      <div key={expense.id} className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                        <div>
                          <div className="font-medium">{expense.description}</div>
                          <div className="text-sm text-muted-foreground">
                            {expense.category} • {new Date(expense.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="font-semibold">${expense.amount.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Expenses</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Expenses Tab */}
            <TabsContent value="expenses">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xl">Expenses List</CardTitle>
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="flex items-center gap-1">
                        <Plus className="h-4 w-4" /> Add Expense
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add Expense</DialogTitle>
                        <DialogDescription>
                          Enter the details of your new expense here.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="amount" className="text-right">
                            Amount
                          </Label>
                          <div className="col-span-3 relative">
                            <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="amount"
                              name="amount"
                              value={newExpense.amount}
                              onChange={handleInputChange}
                              className="pl-8"
                              placeholder="0.00"
                              type="number"
                              step="0.01"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="category" className="text-right">
                            Category
                          </Label>
                          <div className="col-span-3">
                            <Select onValueChange={handleCategoryChange} value={newExpense.category}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {EXPENSE_CATEGORIES.map(category => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="date" className="text-right">
                            Date
                          </Label>
                          <Input
                            id="date"
                            name="date"
                            value={newExpense.date}
                            onChange={handleInputChange}
                            className="col-span-3"
                            type="date"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="description" className="text-right">
                            Description
                          </Label>
                          <Input
                            id="description"
                            name="description"
                            value={newExpense.description}
                            onChange={handleInputChange}
                            className="col-span-3"
                            placeholder="What was this expense for?"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={handleAddExpense}>Save Expense</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expenses.map(expense => (
                      <div key={expense.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-secondary/30 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-full bg-primary/10`}>
                            <Tag className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{expense.description}</div>
                            <div className="text-sm text-muted-foreground">
                              {expense.category} • {new Date(expense.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="font-semibold">${expense.amount.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Budget Tab */}
            <TabsContent value="budget">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Budget Planning
                  </CardTitle>
                  <CardDescription>
                    Set and manage your monthly budget categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-8 rounded-lg border-2 border-dashed border-muted-foreground/20 text-center">
                    <h3 className="text-lg font-medium mb-2">AI Budget Planning</h3>
                    <p className="text-muted-foreground mb-4">
                      Our AI can analyze your spending patterns and suggest optimal budget allocations.
                    </p>
                    <Button onClick={() => alert("This would connect to Gemini API in the full implementation")}>
                      Generate Smart Budget
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Financial Reports
                  </CardTitle>
                  <CardDescription>
                    Detailed analytics of your spending habits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-8 rounded-lg border-2 border-dashed border-muted-foreground/20 text-center">
                    <h3 className="text-lg font-medium mb-2">Advanced Reports</h3>
                    <p className="text-muted-foreground mb-4">
                      Generate detailed financial reports to help you understand your spending habits.
                    </p>
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                      <Button variant="outline">Monthly Report</Button>
                      <Button variant="outline">Annual Report</Button>
                      <Button variant="outline">Category Analysis</Button>
                      <Button variant="outline">Savings Potential</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* AI Assistant Sidebar */}
        <div className="lg:col-span-1">
          <GeminiInsights />
        </div>
      </div>
    </div>
  );
};

export default Index;
