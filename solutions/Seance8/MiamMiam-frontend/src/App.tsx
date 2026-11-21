import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AddRecipePage from "./pages/AddRecipePage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import { recipes as initialRecipes } from "./data/recipes";
import type { Recipe, NewRecipe } from "./models/recipe";

const theme = createTheme({ palette: { primary: { main: "#e65100" } } });

const App = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
   
  
  const [favorites, setFavorites] = useState<number[]>([]);

const addRecipe = (newRecipe: NewRecipe): number => {
  const recipe: Recipe = { ...newRecipe, id: Date.now(), authorId: 1 };
  setRecipes([...recipes, recipe]);
  return recipe.id;
};

  const deleteRecipe = (id: number) => {
    setRecipes(recipes.filter((r) => r.id !== id));
    setFavorites(favorites.filter((favId) => favId !== id));
  };

  const toggleFavorite = (id: number) => {
    setFavorites(
      favorites.includes(id) ? favorites.filter((f) => f !== id) : [...favorites, id]
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout favoritesCount={favorites.length} />}>
           <Route index 
            element={<HomePage recipes={recipes} favorites={favorites} onToggleFavorite={toggleFavorite} />}
            />
            <Route path="recipes/new" element={<AddRecipePage onAdd={addRecipe} />} />
            <Route path="recipes/:id" element={<RecipeDetailPage recipes={recipes} onDelete={deleteRecipe} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;