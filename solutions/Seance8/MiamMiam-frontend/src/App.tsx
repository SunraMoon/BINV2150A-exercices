//Supression de l'import de app.css
//Exo 5Import des materiaux mui
import { createTheme, CssBaseline, ThemeProvider, Box } from "@mui/material";
import PageLayout from "./components/PageLayout";
import RecipeList from "./components/RecipeList";
//Exo 2
import miammiamLogo from "./assets/miammiam.png";
//Exo5
// Création du thème avec l'orange MiamMiam comme couleur principale
const theme = createTheme({
  palette: {
    primary: { main: "#e65100", },
  },
});

const App = () => {
  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/*Exo2 Image importée affichée au-dessus du titre */}
      { /*Modification pour integrer les nouveaux components*/}
      <PageLayout title="MiamMiam">
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <img
            src={miammiamLogo}
            alt="MiamMiam"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>
        <RecipeList />
      </PageLayout>
    </ThemeProvider>
  );
};

export default App;