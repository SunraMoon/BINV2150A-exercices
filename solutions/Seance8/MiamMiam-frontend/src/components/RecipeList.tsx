// Exo 9 : Disposition avec Stack
import { Stack } from "@mui/material";
import RecipeCard from "./RecipeCard";

const RecipeList = () => {
  return (
    // Slide 17 : Stack direction="row" spacing={2}
    <Stack direction="row" spacing={2} >
      <RecipeCard
        title="Pâtes Carbonara"
        imageUrl="https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800"
        duration={20}
        difficulty={2}
        category="Plat"
        description="Un grand classique italien crémeux et rapide à préparer."
      />

      <RecipeCard
        title="Mousse au chocolat"
        imageUrl="https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=800"
        duration={25}
        difficulty={3}
        category="Dessert"
      />

      <RecipeCard
        title="Guacamole"
        imageUrl="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800"
        duration={10}
        difficulty={1}
        category="Apéritif"
        description="Idéal pour l'apéritif, à déguster avec des tortillas."
      />
    </Stack>
  );
};

export default RecipeList;



/*
import Grid from "@mui/material/Grid";
import RecipeCard from "./RecipeCard";

const RecipeList = () => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <RecipeCard
          title="Pâtes Carbonara"
          imageUrl="https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800"
          duration={20}
          difficulty={2}
          category="Plat"
          description="Un grand classique italien crémeux et rapide à préparer."
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <RecipeCard
          title="Mousse au chocolat"
          imageUrl="https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=800"
          duration={25}
          difficulty={3}
          category="Dessert"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <RecipeCard
          title="Guacamole"
          imageUrl="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800"
          duration={10}
          difficulty={1}
          category="Apéritif"
          description="Idéal pour l'apéritif, à déguster avec des tortillas."
        />
      </Grid>
    </Grid>
  );
};

export default RecipeList;*/