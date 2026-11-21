// Exo 15 : Link pour naviguer sans rechargement, Outlet pour afficher la page enfant
import { Link, Outlet } from "react-router";
import { AppBar, Toolbar, Typography, Container, Box, Button } from "@mui/material";

interface LayoutProps {
  favoritesCount: number;
}

const Layout = ({ favoritesCount }: LayoutProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MiamMiam
          </Typography>

          {/* Exo 15 : liens de navigation */}
          <Button component={Link} to="/" color="inherit">
            Recettes
          </Button>
          <Button component={Link} to="/recipes/new" color="inherit">
            Ajouter une recette
          </Button>

          {/* Exo 15 : nombre de favoris reçu en prop depuis App */}
          <Typography sx={{ ml: 2 }}>❤️ {favoritesCount}</Typography>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        {/* Exo 15 : Outlet remplace children → HomePage, AddRecipePage, ... */}
        <Outlet />
      </Container>

      <Box component="footer" sx={{ py: 2, textAlign: "center", bgcolor: "background.paper" }}>
        <Typography variant="body2" color="text.secondary">
          &copy; 2026 MiamMiam
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;