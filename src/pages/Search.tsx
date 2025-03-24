
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchInput from "@/components/SearchInput";
import VerseCard from "@/components/VerseCard";

// Sample verses data - in a real app, this would come from an API
const allVerses = [
  {
    id: "bg-2-47",
    source: "Bhagavad Gita 2.47",
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    translation: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, and never be attached to inaction.",
  },
  {
    id: "bg-4-7",
    source: "Bhagavad Gita 4.7",
    sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
    translation: "Whenever there is a decline in righteousness and an increase in unrighteousness, at that time I manifest myself on earth.",
  },
  {
    id: "up-1-3",
    source: "Chandogya Upanishad",
    sanskrit: "तत् त्वम् असि",
    translation: "Thou art that. (You are the ultimate reality)",
  },
  {
    id: "bg-2-22",
    source: "Bhagavad Gita 2.22",
    sanskrit: "वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि। तथा शरीराणि विहाय जीर्णान्यन्यानि संयाति नवानि देही॥",
    translation: "As a person sheds worn-out garments and puts on new ones, likewise, at the time of death, the soul casts off its worn-out body and enters into a new one.",
  },
  {
    id: "bg-3-27",
    source: "Bhagavad Gita 3.27",
    sanskrit: "प्रकृतेः क्रियमाणानि गुणैः कर्माणि सर्वशः। अहंकारविमूढात्मा कर्ताहमिति मन्यते॥",
    translation: "All activities are carried out by the three modes of material nature. But in ignorance, the soul, deluded by false identification with the body, thinks itself to be the doer.",
  },
  {
    id: "up-2-1",
    source: "Katha Upanishad",
    sanskrit: "उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत",
    translation: "Arise, awake, and stop not till the goal is reached.",
  }
];

const Search: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<typeof allVerses>([]);
  const [loading, setLoading] = useState(false);
  
  // Extract search query from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    setSearchQuery(query);
    
    if (query) {
      performSearch(query);
    } else {
      setResults([]);
    }
  }, [location.search]);
  
  const performSearch = (query: string) => {
    setLoading(true);
    
    // Simulate API search with timeout
    setTimeout(() => {
      const filteredResults = allVerses.filter(verse => {
        const searchTerm = query.toLowerCase();
        return (
          verse.source.toLowerCase().includes(searchTerm) ||
          verse.sanskrit.toLowerCase().includes(searchTerm) ||
          verse.translation.toLowerCase().includes(searchTerm)
        );
      });
      
      setResults(filteredResults);
      setLoading(false);
    }, 800);
  };
  
  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto mb-12">
            <SearchInput 
              onSearch={handleSearch} 
              placeholder="Search for verses, concepts, or topics..." 
              className="mb-8"
            />
            
            {searchQuery && (
              <div className="text-center text-sm text-muted-foreground animate-fade-in">
                {loading ? "Searching..." : `${results.length} results for "${searchQuery}"`}
              </div>
            )}
          </div>
          
          <div className="max-w-5xl mx-auto">
            {loading ? (
              <div className="grid grid-cols-1 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-lg border border-border p-6 animate-pulse">
                    <div className="h-4 bg-secondary rounded w-1/4 mb-4"></div>
                    <div className="h-6 bg-secondary rounded w-3/4 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-secondary rounded w-full"></div>
                      <div className="h-4 bg-secondary rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {searchQuery && results.length === 0 ? (
                  <div className="text-center py-16">
                    <h2 className="text-xl font-medium mb-2">No results found</h2>
                    <p className="text-muted-foreground mb-8">
                      We couldn't find any verses matching your search.
                    </p>
                    <button
                      onClick={() => navigate("/")}
                      className="inline-flex items-center justify-center px-6 py-3 border border-primary bg-primary text-primary-foreground rounded-full text-sm font-medium shadow-sm hover:bg-primary/90 transition-colors duration-200"
                    >
                      Return Home
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 animate-fade-in">
                    {results.map((verse, index) => (
                      <div key={verse.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                        <VerseCard {...verse} className="h-full" />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
