import { Typography, Button, Box } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router";
import RecipeDetail from "../components/RecipeDetail";
import type { Recipe } from "../models/recipe";

type RecipeDetailPageProps = {
  recipes: Recipe[];
  onDelete: (id: number) => void;
};

const RecipeDetailPage = ({ recipes, onDelete }: RecipeDetailPageProps) => {
  // Exo 16.1 : lire l'id dans l'URL (toujours une string !)
  const { id } = useParams();
  const navigate = useNavigate();

  const recipe = recipes.find((r) => r.id === Number(id));

  // Exo 16.1 : /recipes/abc ou /recipes/999 → recette introuvable
  if (!recipe) {
    return (
      <>
        <Typography variant="h5" gutterBottom>Recette introuvable.</Typography>
        <Button component={Link} to="/">Retour aux recettes</Button>
      </>
    );
  }

  // Exo 16.3 : supprimer puis revenir à la liste, sans pouvoir revenir ici
  const handleDelete = () => {
    onDelete(recipe.id);
    navigate("/", { replace: true });
  };

  return (
    <>
      {/* Exo 16.2 : bouton Retour */}
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>← Retour</Button>

      <RecipeDetail recipe={recipe} />

      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Supprimer
        </Button>
      </Box>
    </>
  );
};

export default RecipeDetailPage;