
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchInput from "@/components/SearchInput";
import VerseCard from "@/components/VerseCard";

// Sample data
const featuredVerses = [
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
  }
];

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 lg:py-36 flex items-center min-h-[80vh]">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-slide-down">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight mb-6">
                Ancient Wisdom, <br className="hidden sm:inline" />
                <span className="text-primary">Simply Explained</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                Discover the timeless teachings of Sanskrit texts through accessible explanations and modern context.
              </p>
              
              <div className="mt-10 animate-fade-in animation-delay-300">
                <SearchInput onSearch={handleSearch} />
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Verses Section */}
        <section className="py-16 bg-accent/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-display font-medium tracking-tight mb-4">
                Featured Verses
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Explore these selected verses from ancient Sanskrit texts, with clear translations and explanations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {featuredVerses.map((verse, index) => (
                <div key={verse.id} className="animate-scale-in" style={{ animationDelay: `${index * 150}ms` }}>
                  <VerseCard {...verse} />
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <a 
                href="/explore" 
                className="inline-flex items-center justify-center px-6 py-3 border border-primary bg-primary text-primary-foreground rounded-full text-sm font-medium shadow-sm hover:bg-primary/90 transition-colors duration-200"
              >
                Explore All Verses
              </a>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-medium tracking-tight mb-4">
                How It Works
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Discover how we make ancient Sanskrit wisdom accessible to everyone.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  title: "Search",
                  description: "Look for specific verses, concepts, or keywords from ancient Sanskrit texts.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )
                },
                {
                  title: "Understand",
                  description: "Read clear translations and simple explanations that provide context and meaning.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  )
                },
                {
                  title: "Apply",
                  description: "Discover how these ancient teachings can be relevant and valuable in modern life.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  )
                }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border transition-all duration-300 hover:shadow-md animate-fade-in" style={{ animationDelay: `${i * 200}ms` }}>
                  <div className="p-3 rounded-full bg-secondary mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
