import TextField from "@mui/material/TextField";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <TextField
      label="Rechercher une recette"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      sx={{ mb: 3 }}
    />
  );
};