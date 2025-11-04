import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Heart, Brain, Droplets, Wind, Shield, Sprout, Bug, Leaf, Sun, Wheat, CloudRain } from "lucide-react";

const categories = [
  {
    icon: Heart,
    title: "Cardiovascular",
    description: "Heart disease, hypertension, stroke prevention",
    color: "text-red-500",
  },
  {
    icon: Wind,
    title: "Respiratory",
    description: "Asthma, COPD, pneumonia, COVID-19",
    color: "text-blue-500",
  },
  {
    icon: Brain,
    title: "Neurological",
    description: "Alzheimer's, Parkinson's, epilepsy",
    color: "text-purple-500",
  },
  {
    icon: Droplets,
    title: "Infectious",
    description: "Flu, tuberculosis, malaria, HIV/AIDS",
    color: "text-teal-500",
  },
  {
    icon: Activity,
    title: "Metabolic",
    description: "Diabetes, thyroid disorders, obesity",
    color: "text-orange-500",
  },
  {
    icon: Shield,
    title: "Preventive Care",
    description: "Vaccinations, screenings, lifestyle tips",
    color: "text-green-500",
  },
  {
    icon: Sprout,
    title: "Crop Diseases",
    description: "Fungal, bacterial, viral plant diseases",
    color: "text-emerald-600",
  },
  {
    icon: Bug,
    title: "Pest Management",
    description: "Insect control, prevention strategies",
    color: "text-amber-600",
  },
  {
    icon: Leaf,
    title: "Plant Nutrition",
    description: "Soil health, fertilizers, deficiencies",
    color: "text-lime-600",
  },
  {
    icon: Wheat,
    title: "Crop Care",
    description: "Cultivation practices, crop rotation",
    color: "text-yellow-600",
  },
  {
    icon: CloudRain,
    title: "Weather & Irrigation",
    description: "Water management, climate adaptation",
    color: "text-sky-600",
  },
  {
    icon: Sun,
    title: "Sustainable Farming",
    description: "Organic methods, best practices",
    color: "text-orange-400",
  },
];

const DiseaseCategories = () => {
  return (
    <div className="w-full max-w-6xl mx-auto py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-foreground mb-3">Information Categories</h2>
        <p className="text-muted-foreground text-lg">
          Explore health and agriculture topics for humans and farmers
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border/50"
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${category.color}`} />
                </div>
                <CardTitle className="text-xl">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {category.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DiseaseCategories;
