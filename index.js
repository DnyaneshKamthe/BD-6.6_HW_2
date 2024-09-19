const express = require('express');
const { resolve } = require('path');
const { getAllGames, getGameById } = require("./controllers/index")

const app = express();
const port = 3010;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.get("/games", (req, res) => {
 try {
   let result = getAllGames();
   if(result.length===0){
     res.status(404).json({message : "No games found"})
   }
   res.status(200).json(result)
 } catch (error) {
  res.status(500).json({error : "Internal server error"})
 }
})

app.get("/games/details/:id", (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = getGameById(id);
    if(!result){
      res.status(404).json({message : "Game not found"})
    }
    res.status(200).json(result)
  } catch (error) {
   res.status(500).json({error : "Internal server error"})
  }
 })

