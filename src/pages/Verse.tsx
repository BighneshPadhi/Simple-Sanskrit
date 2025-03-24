
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Sample verses data - in a real app, this would come from an API
const verseData = {
  "bg-2-47": {
    id: "bg-2-47",
    source: "Bhagavad Gita, Chapter 2, Verse 47",
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    transliteration: "karmaṇy-evādhikāras te mā phaleṣhu kadāchana | mā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi ||",
    translation: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, and never be attached to inaction.",
    explanation: "This is one of the most quoted verses from the Bhagavad Gita. Lord Krishna advises Arjuna to focus on his duty without being attached to the results. The verse teaches that we should perform our responsibilities with dedication but without anxiety about the outcome. This principle helps free us from stress and disappointment while maintaining motivation to act with excellence. It embodies the concept of 'Nishkama Karma' or desireless action, which is central to the philosophy of Karma Yoga.",
    historical_context: "This verse appears in the battlefield of Kurukshetra when Arjuna is confused about his duty as a warrior. Krishna provides this wisdom to help Arjuna overcome his hesitation and understand the right approach to action.",
    philosophical_significance: "This verse addresses the fundamental questions of human motivation, action, and detachment. It offers a practical philosophy that balances engagement with the world and inner peace. The teaching has influenced many aspects of Indian thought and has parallels in various philosophical traditions worldwide that emphasize process over outcome."
  },
  "bg-4-7": {
    id: "bg-4-7",
    source: "Bhagavad Gita, Chapter 4, Verse 7",
    sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
    transliteration: "yadā yadā hi dharmasya glānir bhavati bhārata | abhyutthānam adharmasya tadātmānaṁ sṛijāmyaham ||",
    translation: "Whenever there is a decline in righteousness and an increase in unrighteousness, at that time I manifest myself on earth.",
    explanation: "In this verse, Lord Krishna explains the purpose of divine incarnations. He says that whenever dharma (righteousness, duty, cosmic order) declines and adharma (unrighteousness) rises, he takes birth on earth. This verse introduces the concept of divine intervention in human affairs to restore cosmic balance.",
    historical_context: "This verse is part of Krishna's explanation to Arjuna about his divine nature and the purpose of his incarnations throughout different ages. It appears in the chapter on Transcendental Knowledge.",
    philosophical_significance: "This verse establishes the cyclical nature of cosmic order and divine intervention. It introduces the concept of avatars (divine incarnations) and suggests that the divine takes human form to guide humanity back to righteousness when needed. This idea has profoundly influenced Hindu thought on divine manifestation and cosmic cycles."
  },
  "up-1-3": {
    id: "up-1-3",
    source: "Chandogya Upanishad, 6.8.7",
    sanskrit: "तत् त्वम् असि",
    transliteration: "Tat Tvam Asi",
    translation: "Thou art that. (You are the ultimate reality)",
    explanation: "This profound statement, comprising just three words, is one of the Mahavakyas (great sayings) of the Upanishads. It declares the unity of the individual soul (Atman) with the ultimate reality (Brahman). The teaching suggests that our true nature is not separate from the divine essence of the universe.",
    historical_context: "This phrase appears in the Chandogya Upanishad, where the sage Uddalaka Aruni instructs his son Shvetaketu about the nature of reality through a series of examples and analogies.",
    philosophical_significance: "This Mahavakya is central to Advaita Vedanta philosophy, which emphasizes non-dualism. It represents one of the highest teachings of Hindu philosophy - that the individual self and the universal consciousness are one and the same. This insight has influenced spiritual practices that aim to help practitioners realize this unity through direct experience."
  }
};

const Verse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [verse, setVerse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate API fetch with timeout
    const fetchVerse = () => {
      setLoading(true);
      setTimeout(() => {
        if (id && verseData[id as keyof typeof verseData]) {
          setVerse(verseData[id as keyof typeof verseData]);
          setError(null);
        } else {
          setError("Verse not found");
        }
        setLoading(false);
      }, 800);
    };
    
    fetchVerse();
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse space-y-8 max-w-3xl w-full px-4">
            <div className="h-8 bg-secondary rounded w-3/4 mx-auto"></div>
            <div className="h-16 bg-secondary rounded w-full"></div>
            <div className="space-y-4">
              <div className="h-4 bg-secondary rounded w-full"></div>
              <div className="h-4 bg-secondary rounded w-5/6"></div>
              <div className="h-4 bg-secondary rounded w-4/5"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-medium mb-4">Verse Not Found</h2>
            <p className="text-muted-foreground mb-6">
              We couldn't find the verse you're looking for.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary bg-primary text-primary-foreground rounded-full text-sm font-medium shadow-sm hover:bg-primary/90 transition-colors duration-200"
            >
              Return Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 animate-blur-in">
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
          
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
              {verse?.source}
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-display font-medium leading-tight">
              {verse?.translation}
            </h1>
            
            <div className="bg-accent rounded-lg p-6 my-8">
              <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-3">Sanskrit Original</h2>
              <p className="sanskrit text-xl leading-relaxed">
                {verse?.sanskrit}
              </p>
              <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mt-6 mb-3">Transliteration</h2>
              <p className="text-base italic leading-relaxed text-foreground/90">
                {verse?.transliteration}
              </p>
            </div>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-medium mb-4">Explanation</h2>
                <p className="text-foreground/90 leading-relaxed">
                  {verse?.explanation}
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-medium mb-4">Historical Context</h2>
                <p className="text-foreground/90 leading-relaxed">
                  {verse?.historical_context}
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-medium mb-4">Philosophical Significance</h2>
                <p className="text-foreground/90 leading-relaxed">
                  {verse?.philosophical_significance}
                </p>
              </section>
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default Verse;
