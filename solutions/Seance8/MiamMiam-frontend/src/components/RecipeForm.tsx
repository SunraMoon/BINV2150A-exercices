import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import {
  Box,
  Button,
  FormHelperText,
  MenuItem,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
// Adaptez le chemin selon l'emplacement de votre fichier categories
import { categories } from "../data/categories";

// 1. Types des données
export interface RecipeFormData {
  title: string;
  description: string;
  imageUrl: string;
  prepTime: string;   // stocké sous forme de chaîne dans l'état (saisie utilisateur)
  cookTime: string;
  servings: string;
  difficulty: number; // géré par le composant Rating
  categoryId: string;
}

const initialForm: RecipeFormData = {
  title: "",
  description: "",
  imageUrl: "",
  prepTime: "",
  cookTime: "",
  servings: "",
  difficulty: 1,
  categoryId: "",
};

export const RecipeForm = () => {
  // Étape 1 : État form contenant tous les champs
  const [form, setForm] = useState<RecipeFormData>(initialForm);

  // État pour savoir si une première tentative de soumission a eu lieu
  const [submitted, setSubmitted] = useState(false);

  // Étape 2 : Handler pour les champs TextField (texte, nombres et select)
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  // Étape 3 : Handler pour le composant Rating (la nouvelle valeur peut être undefined si on dé-clique)
  const handleRatingChange = (
    _event: unknown,
    newValue: number | null
  ) => {
    setForm({ ...form, difficulty: newValue ?? 1 });
  };

  // Étape 5 : Validation déduite de l'état
  const titleError = form.title.trim().length < 3;
  const prepTimeError = form.prepTime === "" || Number(form.prepTime) < 0;
  const cookTimeError = form.cookTime === "" || Number(form.cookTime) < 0;
  const servingsError = form.servings === "" || Number(form.servings) < 1;
  const categoryError = form.categoryId === "";

  const isValid =
    !titleError &&
    !prepTimeError &&
    !cookTimeError &&
    !servingsError &&
    !categoryError;

  // Étape 4 & 5 : Soumission du formulaire
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (!isValid) return;

    // Construction de l'objet avec conversion des champs numériques
    const recipeToSave = {
      title: form.title.trim(),
      description: form.description.trim(),
      imageUrl: form.imageUrl.trim(),
      prepTime: Number(form.prepTime),
      cookTime: Number(form.cookTime),
      servings: Number(form.servings),
      difficulty: form.difficulty,
      categoryId: form.categoryId,
    };

    // Affichage dans la console
    console.log("Recette créée :", recipeToSave);

    // Réinitialisation du formulaire et de l'état de soumission
    setForm(initialForm);
    setSubmitted(false);
  };

  return (
    <Stack
      component="form"
      spacing={2}
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600, my: 3 }}
    >
      <Typography variant="h5" component="h2">
        Ajouter une recette
      </Typography>

      {/* Titre */}
      <TextField
        label="Titre"
        name="title"
        value={form.title}
        onChange={handleChange}
        error={submitted && titleError}
        helperText={submitted && titleError ? "Au moins 3 caractères" : ""}
      />

      {/* Description */}
      <TextField
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        multiline
        rows={3}
      />

      {/* URL de l'image */}
      <TextField
        label="URL de l'image"
        name="imageUrl"
        value={form.imageUrl}
        onChange={handleChange}
      />

      {/* Temps de préparation */}
      <TextField
        label="Temps de préparation (min)"
        name="prepTime"
        type="number"
        value={form.prepTime}
        onChange={handleChange}
        error={submitted && prepTimeError}
        helperText={
          submitted && prepTimeError
            ? "Le temps de préparation doit être positif ou nul"
            : ""
        }
      />

      {/* Temps de cuisson */}
      <TextField
        label="Temps de cuisson (min)"
        name="cookTime"
        type="number"
        value={form.cookTime}
        onChange={handleChange}
        error={submitted && cookTimeError}
        helperText={
          submitted && cookTimeError
            ? "Le temps de cuisson doit être positif ou nul (0 si pas de cuisson)"
            : ""
        }
      />

      {/* Portions */}
      <TextField
        label="Portions"
        name="servings"
        type="number"
        value={form.servings}
        onChange={handleChange}
        error={submitted && servingsError}
        helperText={
          submitted && servingsError ? "Il faut au moins 1 portion" : ""
        }
      />

      {/* Catégorie */}
      <TextField
        select
        label="Catégorie"
        name="categoryId"
        value={form.categoryId}
        onChange={handleChange}
        error={submitted && categoryError}
        helperText={submitted && categoryError ? "Choisissez une catégorie" : ""}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </TextField>

      {/* Difficulté (Rating) */}
      <Box>
        <Typography component="legend">Difficulté</Typography>
        <Rating
          name="difficulty"
          value={form.difficulty}
          onChange={handleRatingChange}
          max={5}
        />
        {submitted && form.difficulty === 0 && (
          <FormHelperText error>Veuillez choisir une difficulté</FormHelperText>
        )}
      </Box>

      {/* Bouton de soumission */}
      <Button type="submit" variant="contained" size="large">
        Créer la recette
      </Button>
    </Stack>
  );
};