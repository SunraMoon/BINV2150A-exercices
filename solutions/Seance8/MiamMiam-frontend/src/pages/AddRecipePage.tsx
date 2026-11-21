import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { RecipeForm } from "../components/RecipeForm";
import type { NewRecipe } from "../models/recipe";

type AddRecipePageProps = {
  onAdd: (recipe: NewRecipe) => number; // Exo 16.4 : retourne l'id
};

const AddRecipePage = ({ onAdd }: AddRecipePageProps) => {
  const navigate = useNavigate();

  // Exo 16.4 : ajouter puis aller sur la page de la nouvelle recette
  const handleAdd = (newRecipe: NewRecipe) => {
    const id = onAdd(newRecipe);
    navigate(`/recipes/${id}`);
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>Ajouter une recette</Typography>
      <RecipeForm onAdd={handleAdd} />
      {/* Exo 16.5 : Annuler → page précédente */}
      <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>Annuler</Button>
    </>
  );
};

export default AddRecipePage;