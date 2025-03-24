
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 animate-blur-in">
          <h1 className="text-4xl font-display font-medium mb-8">About SimpleSanskrit</h1>
          
          <div className="prose prose-lg prose-slate max-w-none">
            <p className="text-lg leading-relaxed text-muted-foreground">
              SimpleSanskrit is dedicated to making the profound wisdom of ancient Sanskrit texts 
              accessible to everyone through clear, contemporary explanations and translations.
            </p>
            
            <h2 className="text-2xl font-medium mt-12 mb-4">Our Mission</h2>
            <p className="mb-6">
              Our mission is to bridge the gap between ancient wisdom and modern understanding, 
              making the timeless teachings of Sanskrit texts relevant and applicable to everyday life.
            </p>
            
            <h2 className="text-2xl font-medium mt-12 mb-4">Our Approach</h2>
            <p className="mb-6">
              We believe that ancient wisdom shouldn't be locked behind complex language and arcane references. 
              Our approach is to present these teachings in clear, accessible language while preserving their
              depth and subtlety.
            </p>
            <p>
              Each verse is accompanied by:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>The original Sanskrit text</li>
              <li>Accurate transliteration</li>
              <li>Clear translation in modern English</li>
              <li>Accessible explanation of the core meaning</li>
              <li>Historical context to understand the setting</li>
              <li>Philosophical significance for deeper appreciation</li>
            </ul>
            
            <h2 className="text-2xl font-medium mt-12 mb-4">Why Sanskrit Wisdom Matters</h2>
            <p className="mb-6">
              The ancient texts of India contain insights on psychology, ethics, consciousness, and the human 
              condition that remain remarkably relevant today. These teachings have influenced countless lives 
              across millennia and continue to offer practical wisdom for navigating our complex modern world.
            </p>
            
            <h2 className="text-2xl font-medium mt-12 mb-4">Join Us on This Journey</h2>
            <p>
              Whether you're a scholar of philosophy, a spiritual seeker, or simply curious about ancient wisdom, 
              SimpleSanskrit offers a doorway into one of humanity's richest intellectual and spiritual traditions. 
              We invite you to explore these teachings and discover their relevance to your own life and questions.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
