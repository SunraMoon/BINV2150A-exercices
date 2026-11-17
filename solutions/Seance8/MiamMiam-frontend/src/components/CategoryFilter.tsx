import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { categories } from "../data/categories";

interface CategoryFilterProps {
  selectedId: number | null;
  onSelect: (categoryId: number | null) => void;
}

export const CategoryFilter = ({ selectedId, onSelect }: CategoryFilterProps) => {
  return (
    <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap", gap: 1 }}>
      <Chip
        label="Toutes"
        color={selectedId === null ? "primary" : "default"}
        onClick={() => onSelect(null)}
      />
      {categories.map((category) => (
        <Chip
          key={category.id}
          label={category.name}
          color={selectedId === category.id ? "primary" : "default"}
          onClick={() => onSelect(category.id)}
        />
      ))}
    </Stack>
  );
};