
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

// Enhanced formatText function to properly handle markdown formatting
const formatText = (text: string): string => {
  // Handle bold text
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Handle italics
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Handle headers
  text = text.replace(/^### (.*?)$/gm, '<h3 class="text-lg font-medium mt-4 mb-2">$1</h3>');
  text = text.replace(/^## (.*?)$/gm, '<h2 class="text-xl font-medium mt-5 mb-3">$1</h2>');
  text = text.replace(/^# (.*?)$/gm, '<h1 class="text-2xl font-medium mt-6 mb-4">$1</h1>');
  
  // Handle lists
  text = text.replace(/^\* (.*?)$/gm, '<li>$1</li>');
  
  return text;
};

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
      // Create a prompt that specifically requests explanation based on the verse context
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
            {verseContext 
              ? "Ask a question about this verse" 
              : "Ask a question about Sanskrit wisdom"}
          </label>
          <Textarea
            id="question"
            placeholder={verseContext 
              ? "E.g., What is the significance of this verse? or How does this apply to modern life?" 
              : "E.g., What is the concept of dharma? or Explain the meaning of 'karma'"}
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
          <div 
            className="prose prose-sm max-w-none text-muted-foreground"
            dangerouslySetInnerHTML={{ 
              __html: answer.split('\n').map(paragraph => 
                paragraph ? `<p>${formatText(paragraph)}</p>` : '<br/>'
              ).join('')
            }}
          />
        </div>
      )}
    </div>
  );
};

export default QuestionForm;
