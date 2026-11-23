import type { RecipeFormData, IngredientInput, StepInput } from "../components/RecipeForm";

// =====================================================================
// FAVORIS (Exo 17.2 et 17.3) — localStorage
// =====================================================================

const FAVORITES_KEY = "miammiam.favorites";

// Type guard : vérifie que la valeur est bien un tableau de nombres
const isNumberArray = (value: unknown): value is number[] =>
  Array.isArray(value) && value.every((item) => typeof item === "number");

// Lecture validée (on ne fait jamais confiance au stockage)
export const loadFavorites = (): number[] => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : [];
    return isNumberArray(parsed) ? parsed : [];
  } catch {
    return []; // JSON invalide → liste vide
  }
};

// Écriture (le Web Storage ne stocke que des chaînes → JSON)
export const saveFavorites = (favorites: number[]): void => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

// =====================================================================
// BROUILLON DU FORMULAIRE (Exo 17.5 et 17.6) — sessionStorage
// =====================================================================

// Exo 17.5 : sessionStorage plutôt que localStorage, car le brouillon ne concerne
// que l'onglet en cours : il survit à un rechargement accidentel (F5), mais il n'est
// pas partagé avec les autres onglets et disparaît à la fermeture de l'onglet
// (pas de vieux brouillon oublié qui réapparaît des jours plus tard).
const DRAFT_KEY = "miammiam.recipeDraft";

export interface RecipeDraft {
  form: RecipeFormData;
  ingredients: IngredientInput[];
  steps: StepInput[];
}

// Type guards
const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isFormData = (value: unknown): value is RecipeFormData =>
  isObject(value) &&
  typeof value.title === "string" &&
  typeof value.description === "string" &&
  typeof value.imageUrl === "string" &&
  typeof value.prepTime === "string" &&
  typeof value.cookTime === "string" &&
  typeof value.servings === "string" &&
  typeof value.difficulty === "number" &&
  typeof value.categoryId === "string";

const isIngredient = (value: unknown): value is IngredientInput =>
  isObject(value) &&
  typeof value.key === "number" &&
  typeof value.name === "string" &&
  typeof value.quantity === "string" &&
  typeof value.unit === "string";

const isStep = (value: unknown): value is StepInput =>
  isObject(value) &&
  typeof value.key === "number" &&
  typeof value.instruction === "string";

const isRecipeDraft = (value: unknown): value is RecipeDraft =>
  isObject(value) &&
  isFormData(value.form) &&
  Array.isArray(value.ingredients) &&
  value.ingredients.every(isIngredient) &&
  Array.isArray(value.steps) &&
  value.steps.every(isStep);

// Retourne le brouillon, ou null s'il n'existe pas ou n'est pas valide
export const loadDraft = (): RecipeDraft | null => {
  try {
    const stored = sessionStorage.getItem(DRAFT_KEY);
    if (!stored) return null;
    const parsed: unknown = JSON.parse(stored);
    return isRecipeDraft(parsed) ? parsed : null;
  } catch {
    return null; // JSON invalide
  }
};

export const saveDraft = (draft: RecipeDraft): void => {
  sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
};

// Exo 17.6 : supprimer le brouillon
export const clearDraft = (): void => {
  sessionStorage.removeItem(DRAFT_KEY);
};