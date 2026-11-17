import { useState } from "react";
import { createTheme, CssBaseline, ThemeProvider, Box, Typography, Button } from "@mui/material";
import PageLayout from "./components/PageLayout";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail"; 
import { RecipeForm } from "./components/RecipeForm";
import { SearchBar } from "./components/SearchBar"; // 👉 Import SearchBar
import { CategoryFilter } from "./components/CategoryFilter"; // 👉 Import CategoryFilter
import { recipes as initialRecipes } from "./data/recipes"; 
import type { Recipe, NewRecipe } from "./models/recipe"; 
import miammiamLogo from "./assets/miammiam.png";

const theme = createTheme({
  palette: {
    primary: { main: "#e65100" },
  },
});

const App = () => {
  // États de l'application
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [query, setQuery] = useState(""); // 👉 État de la recherche
  const [categoryId, setCategoryId] = useState<number | null>(null); // 👉 État du filtre catégorie
  const [favorites, setFavorites] = useState<number[]>([]); // 👉 État des favoris (ids)

  // Ajout d'une recette
  const addRecipe = (newRecipe: NewRecipe) => {
    const recipe: Recipe = {
      ...newRecipe,
      id: Date.now(),
      authorId: 1, 
    };
    setRecipes([...recipes, recipe]);
  };

  // Suppression d'une recette
  const deleteRecipe = (id: number) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
    // Optionnel : nettoyer des favoris si supprimée
    setFavorites(favorites.filter((favId) => favId !== id));
  };

  // Gestion des favoris (toggle)
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // 🔎 Filtrage combiné (Valeur dérivée)
  const filteredRecipes = recipes.filter((recipe) => {
    const text = `${recipe.title} ${recipe.description}`.toLowerCase();
    const matchesQuery = text.includes(query.toLowerCase());
    const matchesCategory = categoryId === null || recipe.categoryId === categoryId;

    return matchesQuery && matchesCategory;
  });

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setQuery("");
    setCategoryId(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* On peut afficher le nombre de favoris dans le titre ou ailleurs */}
      <PageLayout title={`MiamMiam (❤️ ${favorites.length} favoris)`}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <img
            src={miammiamLogo}
            alt="MiamMiam"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>
        
        {/* Composants de recherche et filtres */}
        <SearchBar value={query} onChange={setQuery} />
        <CategoryFilter selectedId={categoryId} onSelect={setCategoryId} />

        {/* Compteur de résultats */}
        <Typography variant="body1" sx={{ mb: 2, fontWeight: "bold" }}>
          {filteredRecipes.length} recette(s) trouvée(s)
        </Typography>

        <RecipeForm onAdd={addRecipe} />

        {/* Si aucun résultat, afficher un message et un bouton de réinitialisation */}
        {filteredRecipes.length === 0 ? (
          <Box sx={{ textAlign: "center", my: 4 }}>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Aucune recette ne correspond à vos critères.
            </Typography>
            <Button variant="outlined" onClick={resetFilters}>
              Réinitialiser les filtres
            </Button>
          </Box>
        ) : (
          <RecipeList 
            recipes={filteredRecipes} 
            onDelete={deleteRecipe}
            favorites={favorites} // Transmettre si nécessaire aux cartes
            onToggleFavorite={toggleFavorite} // Transmettre si nécessaire
          />
        )}

        {recipes.length > 0 && <RecipeDetail recipe={recipes[2] || recipes[0]} />}
      </PageLayout>
    </ThemeProvider>
  );
};

export default App;