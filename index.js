import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const jokeAPI_URL = "https://api.chucknorris.io/jokes/random";
const cocktailAPI_URL = "http://www.thecocktaildb.com/api/json/v1/1/random.php";

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
      const dayJoke = await axios.get(jokeAPI_URL);
      const dayCocktail = await axios.get(cocktailAPI_URL);
      console.log(dayCocktail.data.drinks[0])
      res.render("index.ejs", {
        joke : dayJoke.data.value,
        cocktail : dayCocktail.data.drinks[0].strDrink,
        receipt : dayCocktail.data.drinks[0].strInstructions
    });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: error.message,
      });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  