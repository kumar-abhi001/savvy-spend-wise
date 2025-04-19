
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, TrendingDown, LightbulbIcon } from "lucide-react";
import { SavingTip, getGeminiInsights } from "@/services/backendService";

export function GeminiInsights() {
  const [isLoading, setIsLoading] = useState(false);
  const [savingTips, setSavingTips] = useState<SavingTip[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // In a real implementation, this would connect to your Django backend
      // which would then use the Gemini API
      const response = await getGeminiInsights();
      setSavingTips(response.savingTips);
    } catch (err) {
      setError("Could not fetch AI insights. Please try again later.");
      console.error("Error fetching insights:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2 bg-gradient-to-r from-primary to-purple-600 text-white rounded-t-lg">
        <CardTitle className="text-xl flex items-center gap-2">
          <LightbulbIcon className="h-5 w-5" />
          Gemini Financial Assistant
        </CardTitle>
        <CardDescription className="text-white/80">
          AI-powered insights to improve your financial health
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {error && (
          <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {savingTips.length > 0 ? (
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <TrendingDown className="h-4 w-4" />
              Money-Saving Recommendations
            </h3>
            
            {savingTips.map((tip, i) => (
              <div key={i} className="p-4 bg-secondary/50 rounded-lg">
                <p className="mb-2">{tip.tip}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{tip.category}</span>
                  <span className="font-medium text-green-600">
                    Potential savings: ${tip.potentialSaving}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Get personalized financial advice powered by Gemini AI
            </p>
            <Button
              onClick={fetchInsights}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Analyzing your expenses..." : "Get AI Insights"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
