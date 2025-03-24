
import React, { useState } from "react";
import { askQuestion, GeminiResponse } from "@/lib/gemini";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface QuestionFormProps {
  verseContext?: string;
  className?: string;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ verseContext, className }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }
    
    setLoading(true);
    setAnswer(null);
    
    try {
      const response: GeminiResponse = await askQuestion(question, verseContext);
      
      if (response.success) {
        setAnswer(response.content);
      } else {
        toast.error(response.error || "Failed to get an answer");
      }
    } catch (error) {
      console.error("Error asking question:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="question" className="text-sm font-medium">
            Ask a question about Sanskrit wisdom
          </label>
          <Textarea
            id="question"
            placeholder="E.g., What is the concept of dharma? or Explain the meaning of 'karma'"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={loading || !question.trim()}
          className="w-full sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Getting Answer...
            </>
          ) : "Ask Question"}
        </Button>
      </form>
      
      {answer && (
        <div className="mt-6 p-4 bg-muted/50 rounded-lg animate-fade-in">
          <h3 className="font-medium mb-2">Answer:</h3>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            {answer.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionForm;
