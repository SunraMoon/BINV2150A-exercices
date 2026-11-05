import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  MenuItem,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// Adaptez le chemin selon l'emplacement de votre fichier categories
import { categories } from "../data/categories";

// 1. Interfaces et types
export interface RecipeFormData {
  title: string;
  description: string;
  imageUrl: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  difficulty: number;
  categoryId: string;
}

interface IngredientInput {
  key: number;
  name: string;
  quantity: string;
  unit: string;
}

type IngredientField = "name" | "quantity" | "unit";

interface StepInput {
  key: number;
  instruction: string;
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
  // États principaux
  const [form, setForm] = useState<RecipeFormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  // Collections comme états
  const [ingredients, setIngredients] = useState<IngredientInput[]>([]);
  const [steps, setSteps] = useState<StepInput[]>([]);

  // Handlers formulaires statiques
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleRatingChange = (_event: unknown, newValue: number | null) => {
    setForm({ ...form, difficulty: newValue ?? 1 });
  };

  // --- Gestion des Ingrédients (Immuabilité) ---
  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { key: Date.now() + Math.random(), name: "", quantity: "", unit: "g" },
    ]);
  };

  const removeIngredient = (key: number) => {
    setIngredients(ingredients.filter((item) => item.key !== key));
  };

  const updateIngredient = (
    key: number,
    field: IngredientField,
    value: string
  ) => {
    setIngredients(
      ingredients.map((item) =>
        item.key === key ? { ...item, [field]: value } : item
      )
    );
  };

  // --- Gestion des Étapes (Immuabilité) ---
  const addStep = () => {
    setSteps([
      ...steps,
      { key: Date.now() + Math.random(), instruction: "" },
    ]);
  };

  const removeStep = (key: number) => {
    setSteps(steps.filter((step) => step.key !== key));
  };

  const updateStep = (key: number, value: string) => {
    setSteps(
      steps.map((step) =>
        step.key === key ? { ...step, instruction: value } : step
      )
    );
  };

  // Optionnel : Réordonnancement sans mutation
  const moveStep = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= steps.length) return;

    const newSteps = [...steps];
    const [movedStep] = newSteps.splice(index, 1);
    newSteps.splice(targetIndex, 0, movedStep);
    setSteps(newSteps);
  };

  // --- Validations ---
  const titleError = form.title.trim().length < 3;
  const prepTimeError = form.prepTime === "" || Number(form.prepTime) < 0;
  const cookTimeError = form.cookTime === "" || Number(form.cookTime) < 0;
  const servingsError = form.servings === "" || Number(form.servings) < 1;
  const categoryError = form.categoryId === "";

  // Validation Ingrédients : au moins 1 avec nom et quantité > 0
  const hasValidIngredient = ingredients.some(
    (item) => item.name.trim().length > 0 && Number(item.quantity) > 0
  );
  const ingredientsError = !hasValidIngredient;

  // Validation Étapes : au moins 1 étape non vide
  const hasValidStep = steps.some((step) => step.instruction.trim().length > 0);
  const stepsError = !hasValidStep;

  const isValid =
    !titleError &&
    !prepTimeError &&
    !cookTimeError &&
    !servingsError &&
    !categoryError &&
    !ingredientsError &&
    !stepsError;

  // --- Soumission ---
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (!isValid) return;

    // Construction de l'objet final nettoyé
    const recipeToSave = {
      title: form.title.trim(),
      description: form.description.trim(),
      imageUrl: form.imageUrl.trim(),
      prepTime: Number(form.prepTime),
      cookTime: Number(form.cookTime),
      servings: Number(form.servings),
      difficulty: form.difficulty,
      categoryId: form.categoryId,
      // Conversion des ingrédients : conversion quantité en Number et exclusion de `key`
      ingredients: ingredients
        .filter((item) => item.name.trim() !== "" && Number(item.quantity) > 0)
        .map(({ name, quantity, unit }) => ({
          name: name.trim(),
          quantity: Number(quantity),
          unit: unit.trim(),
        })),
      // Transformation des étapes en simple tableau de strings
      steps: steps
        .map((step) => step.instruction.trim())
        .filter((instruction) => instruction.length > 0),
    };

    console.log("Recette créée :", recipeToSave);

    // Réinitialisation complète
    setForm(initialForm);
    setIngredients([]);
    setSteps([]);
    setSubmitted(false);
  };

  return (
    <Stack
      component="form"
      spacing={3}
      onSubmit={handleSubmit}
      sx={{ maxWidth: 650, my: 3 }}
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

      {/* Temps de préparation, cuisson, portions */}
      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          label="Préparation (min)"
          name="prepTime"
          type="number"
          value={form.prepTime}
          onChange={handleChange}
          error={submitted && prepTimeError}
          helperText={
            submitted && prepTimeError ? "Valeur positive ou nulle" : ""
          }
        />
        <TextField
          fullWidth
          label="Cuisson (min)"
          name="cookTime"
          type="number"
          value={form.cookTime}
          onChange={handleChange}
          error={submitted && cookTimeError}
          helperText={
            submitted && cookTimeError ? "Valeur positive ou nulle" : ""
          }
        />
        <TextField
          fullWidth
          label="Portions"
          name="servings"
          type="number"
          value={form.servings}
          onChange={handleChange}
          error={submitted && servingsError}
          helperText={submitted && servingsError ? "Au moins 1" : ""}
        />
      </Stack>

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

      {/* Difficulté */}
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

      {/* --- Section Ingrédients --- */}
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Ingrédients
        </Typography>

        <Stack spacing={1.5}>
          {ingredients.map((ingredient) => (
            <Stack key={ingredient.key} direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <TextField
                label="Ingrédient"
                size="small"
                sx={{ flex: 2 }}
                value={ingredient.name}
                onChange={(e) =>
                  updateIngredient(ingredient.key, "name", e.target.value)
                }
              />
              <TextField
                label="Qté"
                type="number"
                size="small"
                sx={{ flex: 1 }}
                value={ingredient.quantity}
                onChange={(e) =>
                  updateIngredient(ingredient.key, "quantity", e.target.value)
                }
              />
              <TextField
                label="Unité"
                size="small"
                sx={{ flex: 1 }}
                value={ingredient.unit}
                onChange={(e) =>
                  updateIngredient(ingredient.key, "unit", e.target.value)
                }
              />
              <IconButton
                onClick={() => removeIngredient(ingredient.key)}
                aria-label="Retirer l'ingrédient"
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}
        </Stack>

        <Button onClick={addIngredient} variant="outlined" sx={{ mt: 1.5 }}>
          Ajouter un ingrédient
        </Button>

        {submitted && ingredientsError && (
          <FormHelperText error>
            Au moins un ingrédient complet (nom et quantité supérieure à 0) est requis.
          </FormHelperText>
        )}
      </Box>

      {/* --- Section Étapes --- */}
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Étapes de préparation
        </Typography>

        <Stack spacing={1.5}>
          {steps.map((step, index) => (
            <Stack key={step.key} direction="row" spacing={1} sx={{ alignItems: "flex-start" }}>
              <TextField
                label={`Étape ${index + 1}`}
                multiline
                rows={2}
                fullWidth
                size="small"
                value={step.instruction}
                onChange={(e) => updateStep(step.key, e.target.value)}
              />
              <Stack direction="column">
                <IconButton
                  size="small"
                  disabled={index === 0}
                  onClick={() => moveStep(index, "up")}
                  aria-label="Monter l'étape"
                >
                  <ArrowUpwardIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  disabled={index === steps.length - 1}
                  onClick={() => moveStep(index, "down")}
                  aria-label="Descendre l'étape"
                >
                  <ArrowDownwardIcon fontSize="small" />
                </IconButton>
              </Stack>
              <IconButton
                onClick={() => removeStep(step.key)}
                aria-label="Retirer l'étape"
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}
        </Stack>

        <Button onClick={addStep} variant="outlined" sx={{ mt: 1.5 }}>
          Ajouter une étape
        </Button>

        {submitted && stepsError && (
          <FormHelperText error>
            Au moins une étape non vide est requise.
          </FormHelperText>
        )}
      </Box>

      {/* Soumission */}
      <Button type="submit" variant="contained" size="large">
        Créer la recette
      </Button>
    </Stack>
  );
};