import "reflect-metadata";
import express from 'express';
import "./database";

const app =express();


app.get('/', (request, response) => {
  return response.json({message: "Esse é o GET do Elo"})
});

app.post('/', (request, response) => {
  return response.json({message: "Esse é o POST do Elo"})
});

app.listen(3333, () => console.log("Server is running!"));