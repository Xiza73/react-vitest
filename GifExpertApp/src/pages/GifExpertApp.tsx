import { Browser, CategoriesContainer } from "@/components";
import { Separator } from "@/components/Separator";
import { useState } from "react";

const initialCategories = ["One Punch", "Dragon Ball"];

export const GifExpertApp: React.FC = () => {
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [browserValue, setBrowserValue] = useState<string>("");

  const handleAddCategory = () => {
    if (browserValue.trim().length === 0) return;
    if (
      categories.includes(browserValue) ||
      categories.includes(browserValue.toLowerCase())
    ) {
      alert("La categoría ya existe");
      return;
    }
    setCategories([browserValue, ...categories]);
    setBrowserValue("");
  };

  return (
    <main className="w-full flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        GifExpertApp
      </h1>
      <Separator className="lg:w-1/2" />
      <Browser
        buttonText="Agregar"
        onChange={(e) => setBrowserValue(e.target.value)}
        onSubmit={handleAddCategory}
        value={browserValue}
        placeholder="Buscar gifs..."
      />
      <CategoriesContainer titles={categories} />
    </main>
  );
};
