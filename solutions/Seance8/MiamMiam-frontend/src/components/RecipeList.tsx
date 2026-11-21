import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import RecipeCard from "./RecipeCard";
import type { Recipe } from "../models/recipe";

interface RecipeListProps {
  recipes: Recipe[];
 
  favorites: number[]; // 👉 Ajout
  onToggleFavorite: (id: number) => void; // 👉 Ajout
}

const RecipeList = ({ recipes,  favorites, onToggleFavorite }: RecipeListProps) => {
  if (recipes.length === 0) {
    return <Typography>Aucune recette pour le moment.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {recipes.map((recipe) => (
        <Grid key={recipe.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <RecipeCard 
            recipe={recipe} 
            
            isFavorite={favorites.includes(recipe.id)} // 👉 Transmis à la carte
            onToggleFavorite={onToggleFavorite} // 👉 Transmis à la carte
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipeList;