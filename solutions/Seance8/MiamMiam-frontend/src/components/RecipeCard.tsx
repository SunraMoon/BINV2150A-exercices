// Exo 6 et 7 : Import des composants MUI pour remplacer le HTML natif
import {Card,CardMedia,CardContent,CardActions,Typography,Button,Chip,Rating,} from "@mui/material";

interface RecipeCardProps {
  title: string;
  imageUrl: string;
  duration: number;
  difficulty: number; // nombre de 1 à 5
  description?: string;
  category: string; // Exo 7 : ajout de la catégorie obligatoire
}

const RecipeCard = ({title,imageUrl,duration,difficulty,description,category,}: RecipeCardProps) => {
  return (
    // Exo 6 : Remplacement du <div className="recipe-card"> par le conteneur Card
    <Card sx={{ maxWidth: 345 }}>
      {/* Exo 6 : Remplacement de <img> par CardMedia (avec component="img") */}
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={title}
      />

      {/* Exo 6 : Ajout de CardContent pour englober la zone de texte */}
      <CardContent>
        {/* Exo 7 : Affichage de la catégorie dans un Chip orange */}
        <Chip
          label={category}
          color="primary"
          size="small"
          sx={{ mb: 1 }}
        />

        {/* Exo 6 : Remplacement du <h2> par Typography variant="h6" */}
        <Typography variant="h6" component="h2">
          {title}
        </Typography>

        {/* Exo 6 : Remplacement du <p> de description par Typography body1 */}
        {description && (
          <Typography variant="body1">
            {description}
          </Typography>
        )}

        {/* Exo 6 : Remplacement du <p> de durée par Typography body2 */}
        <Typography variant="body2" color="text.secondary">
          Durée : {duration} minutes
        </Typography>

        {/* Exo 7 : Remplacement de Typography par un Rating en lecture seule pour la difficulté */}
        <Rating
          value={difficulty}
          max={5}
          readOnly
          size="small"
          sx={{ mt: 1 }}
        />
      </CardContent>

      {/* Exo 6 : Ajout de CardActions avec un bouton d'action */}
      <CardActions>
        <Button size="small">Voir la recette</Button>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;