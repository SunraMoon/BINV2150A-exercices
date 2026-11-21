import { Box, Typography, Button } from "@mui/material";
import { useSearchParams } from "react-router";
import RecipeList from "../components/RecipeList";
import { SearchBar } from "../components/SearchBar";
import { CategoryFilter } from "../components/CategoryFilter";
import type { Recipe } from "../models/recipe";

// Exo 16.6 : query et categoryId ne sont plus des props, ils viennent de l'URL
type HomePageProps = {
  recipes: Recipe[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
};

const HomePage = ({ recipes, favorites, onToggleFavorite }: HomePageProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Exo 16.6 : lecture des filtres dans l'URL (toujours des string ou null)
  const query = searchParams.get("search") ?? "";
  const categoryParam = searchParams.get("category");
  const categoryNumber = Number(categoryParam);
  const categoryId =
    categoryParam !== null && !Number.isNaN(categoryNumber) ? categoryNumber : null;

  // Exo 16.6 : setSearchParams remplace TOUS les paramètres
  // → on reconstruit toujours les deux filtres ensemble
  const updateFilters = (search: string, category: number | null) => {
    const params: Record<string, string> = {};
    if (search !== "") params.search = search;
    if (category !== null) params.category = String(category);
    setSearchParams(params);
  };

  const handleQueryChange = (value: string) => updateFilters(value, categoryId);
  const handleCategoryChange = (id: number | null) => updateFilters(query, id);
  const resetFilters = () => setSearchParams({});

  const filteredRecipes = recipes.filter((recipe) => {
    const text = `${recipe.title} ${recipe.description}`.toLowerCase();
    const matchesQuery = text.includes(query.toLowerCase());
    const matchesCategory = categoryId === null || recipe.categoryId === categoryId;
    return matchesQuery && matchesCategory;
  });

  return (
    <>
      <SearchBar value={query} onChange={handleQueryChange} />
      <CategoryFilter selectedId={categoryId} onSelect={handleCategoryChange} />
      <Typography sx={{ mb: 2, fontWeight: "bold" }}>
        {filteredRecipes.length} recette(s) trouvée(s)
      </Typography>

      {filteredRecipes.length === 0 ? (
        <Box sx={{ textAlign: "center", my: 4 }}>
          <Typography color="text.secondary" gutterBottom>
            Aucune recette ne correspond à vos critères.
          </Typography>
          <Button variant="outlined" onClick={resetFilters}>Réinitialiser les filtres</Button>
        </Box>
      ) : (
        <RecipeList
          recipes={filteredRecipes}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </>
  );
};

export default HomePage;