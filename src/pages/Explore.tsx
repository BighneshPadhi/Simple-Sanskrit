
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VerseCard from "@/components/VerseCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample verses data by source
const versesBySource = {
  "bhagavad-gita": [
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
  ],
  "upanishads": [
    {
      id: "up-1-3",
      source: "Chandogya Upanishad",
      sanskrit: "तत् त्वम् असि",
      translation: "Thou art that. (You are the ultimate reality)",
    },
    {
      id: "up-2-1",
      source: "Katha Upanishad",
      sanskrit: "उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत",
      translation: "Arise, awake, and stop not till the goal is reached.",
    },
  ],
  "vedas": [
    {
      id: "vd-1-1",
      source: "Rig Veda 1.1.1",
      sanskrit: "अग्निमीळे पुरोहितं यज्ञस्य देवं रत्वीजम् । होतारं रत्नधातमम् ॥",
      translation: "I worship Agni, the priest, the divine minister of the sacrifice, the invoker, the bestower of treasures.",
    },
  ]
};

// Categories with their display names
const categories = [
  { id: "bhagavad-gita", name: "Bhagavad Gita" },
  { id: "upanishads", name: "Upanishads" },
  { id: "vedas", name: "Vedas" },
];

const Explore: React.FC = () => {
  const [activeTab, setActiveTab] = useState("bhagavad-gita");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-blur-in">
            <h1 className="text-4xl font-display font-medium mb-4">
              Explore Sanskrit Texts
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover the wisdom of ancient Sanskrit texts through clear translations and explanations.
            </p>
          </div>
          
          <Tabs defaultValue="bhagavad-gita" value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-secondary/50">
                {categories.map(category => (
                  <TabsTrigger 
                    key={category.id}
                    value={category.id}
                    className="px-6 py-2.5 text-sm"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {categories.map(category => (
              <TabsContent key={category.id} value={category.id} className="animate-scale-in">
                <div className="max-w-5xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {versesBySource[category.id as keyof typeof versesBySource].map((verse, index) => (
                      <div key={verse.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                        <VerseCard {...verse} className="h-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="mt-16 text-center animate-fade-in">
            <p className="text-muted-foreground mb-6">
              Only showing a small sample of verses. In a complete implementation, more would be available.
            </p>
            <Button variant="outline" className="rounded-full" disabled>
              Load More Verses
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Explore;
