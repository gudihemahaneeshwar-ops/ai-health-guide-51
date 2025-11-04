import { MessageCircle, Shield, Clock, Globe } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";
import DiseaseCategories from "@/components/DiseaseCategories";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary-glow))_0%,transparent_50%)] opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent))_0%,transparent_50%)] opacity-15"></div>
        
        <div className="container mx-auto px-4 pt-20 pb-16 relative">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 text-sm font-medium">
              <Shield className="w-4 h-4" />
              Trusted Health & Agriculture Information
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Your AI-Powered
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Health & Agriculture Assistant
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Get instant access to reliable health and crop disease information. 
              For farmers and families—available 24/7 to help with medical and agricultural decisions.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
              <div className="flex flex-col items-center gap-2 p-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">24/7 Available</h3>
                <p className="text-sm text-muted-foreground">Always here when you need health guidance</p>
              </div>
              
              <div className="flex flex-col items-center gap-2 p-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-foreground">Trusted Sources</h3>
                <p className="text-sm text-muted-foreground">WHO, CDC, agricultural experts</p>
              </div>
              
              <div className="flex flex-col items-center gap-2 p-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground">Easy to Use</h3>
                <p className="text-sm text-muted-foreground">Simple chat interface for everyone</p>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="mb-16">
            <ChatInterface />
          </div>
        </div>
      </section>

      {/* Disease Categories */}
      <section className="container mx-auto px-4 pb-20">
        <DiseaseCategories />
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground text-sm">
            <p className="mb-2">
              <strong className="text-foreground">Important:</strong> This chatbot provides educational information only.
            </p>
            <p>
              Always consult qualified healthcare professionals for medical advice and agricultural experts for complex farming issues.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
