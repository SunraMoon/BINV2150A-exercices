import { Typography, Button } from "@mui/material";
import { Link } from "react-router";
import { useEffect } from "react";

const NotFoundPage = () => {
  useEffect(() => {
    document.title = "MiamMiam";
  }, []);

  return (
    <>
      <Typography variant="h4" component="h1">Page introuvable</Typography>
      <Button component={Link} to="/">Retour aux recettes</Button>
    </>
  );
};

export default NotFoundPage;