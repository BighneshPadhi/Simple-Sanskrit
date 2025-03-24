
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import QuestionForm from "@/components/QuestionForm";

// Sample verses data - in a real app, this would come from an API
const allVerses = [
  {
    id: "bg-2-47",
    source: "Bhagavad Gita 2.47",
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    translation: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, and never be attached to inaction.",
    explanation: "This famous verse emphasizes performing one's duties without attachment to results. It teaches the principle of detachment and selfless action, which is central to the Bhagavad Gita's teachings."
  },
  {
    id: "bg-4-7",
    source: "Bhagavad Gita 4.7",
    sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
    translation: "Whenever there is a decline in righteousness and an increase in unrighteousness, at that time I manifest myself on earth.",
    explanation: "In this verse, Krishna explains the purpose of divine incarnations. Whenever dharma (righteousness) declines and adharma (unrighteousness) becomes prevalent, the divine manifests to restore balance."
  },
  {
    id: "up-1-3",
    source: "Chandogya Upanishad",
    sanskrit: "तत् त्वम् असि",
    translation: "Thou art that. (You are the ultimate reality)",
    explanation: "This is one of the four Mahavakyas (great sayings) from the Upanishads. It points to the identity of the individual soul (Atman) with the universal soul (Brahman), a central teaching in Vedanta philosophy."
  },
  {
    id: "bg-2-22",
    source: "Bhagavad Gita 2.22",
    sanskrit: "वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि। तथा शरीराणि विहाय जीर्णान्यन्यानि संयाति नवानि देही॥",
    translation: "As a person sheds worn-out garments and puts on new ones, likewise, at the time of death, the soul casts off its worn-out body and enters into a new one.",
    explanation: "This verse illustrates the concept of reincarnation. It compares changing bodies to changing clothes, emphasizing that the soul is eternal while bodies are temporary."
  },
  {
    id: "bg-3-27",
    source: "Bhagavad Gita 3.27",
    sanskrit: "प्रकृतेः क्रियमाणानि गुणैः कर्माणि सर्वशः। अहंकारविमूढात्मा कर्ताहमिति मन्यते॥",
    translation: "All activities are carried out by the three modes of material nature. But in ignorance, the soul, deluded by false identification with the body, thinks itself to be the doer.",
    explanation: "This verse explains how our actions are influenced by the three gunas (modes of nature). It highlights the mistake of identifying with the ego and believing oneself to be the doer of actions."
  },
  {
    id: "up-2-1",
    source: "Katha Upanishad",
    sanskrit: "उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत",
    translation: "Arise, awake, and stop not till the goal is reached.",
    explanation: "This motivational verse from the Katha Upanishad encourages spiritual seekers to pursue knowledge and liberation with perseverance and determination."
  }
];

const Verse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [verse, setVerse] = useState<typeof allVerses[0] | null>(null);
  
  useEffect(() => {
    // Find the verse with the matching ID
    const foundVerse = allVerses.find(v => v.id === id);
    setVerse(foundVerse || null);
  }, [id]);
  
  if (!verse) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-28 pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl font-display font-medium mb-6">Verse Not Found</h1>
            <p className="text-muted-foreground mb-8">We couldn't find the verse you're looking for.</p>
            <Button asChild variant="outline">
              <Link to="/explore">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Explore
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const verseContext = `Sanskrit Verse: ${verse.sanskrit}\nTranslation: ${verse.translation}\nSource: ${verse.source}`;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button asChild variant="outline" size="sm">
              <Link to="/explore">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Explore
              </Link>
            </Button>
          </div>
          
          <div className="bg-card border border-border rounded-xl overflow-hidden animate-fade-in">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                  {verse.source}
                </span>
              </div>
              
              <div className="space-y-6">
                <div className="animate-slide-up">
                  <h2 className="sanskrit text-xl md:text-2xl leading-relaxed mb-4">
                    {verse.sanskrit}
                  </h2>
                  
                  <div className="prose prose-sm max-w-none">
                    <p className="text-lg font-medium">{verse.translation}</p>
                  </div>
                </div>
                
                {verse.explanation && (
                  <div className="pt-6 border-t border-border animate-slide-up animation-delay-200">
                    <h3 className="text-lg font-medium mb-3">Explanation</h3>
                    <div className="prose prose-sm max-w-none text-muted-foreground">
                      <p>{verse.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-card border border-border rounded-xl overflow-hidden animate-fade-in">
            <div className="p-6 md:p-8">
              <h3 className="text-lg font-medium mb-4">Ask About This Verse</h3>
              <QuestionForm verseContext={verseContext} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Verse;
