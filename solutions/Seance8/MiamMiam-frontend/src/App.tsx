import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AddRecipePage from "./pages/AddRecipePage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import { recipes as initialRecipes } from "./data/recipes";
import type { Recipe, NewRecipe } from "./models/recipe";
import { loadFavorites, saveFavorites } from "./utils/storage"; // Exo 17.3

const theme = createTheme({ palette: { primary: { main: "#e65100" } } });

const App = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);

  // Exo 17.3 : initialisation paresseuse → localStorage lu une seule fois, au premier rendu
  const [favorites, setFavorites] = useState<number[]>(() => loadFavorites());

  // Exo 17.3 : chaque changement de favorites est enregistré dans le localStorage
  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const addRecipe = (newRecipe: NewRecipe): number => {
    const recipe: Recipe = { ...newRecipe, id: Date.now(), authorId: 1 };
    setRecipes((prev) => [...prev, recipe]);
    return recipe.id;
  };

  const deleteRecipe = (id: number) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
    setFavorites((prev) => prev.filter((favId) => favId !== id));
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout favoritesCount={favorites.length} />}>
            <Route
              index
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