import axios from "axios";

const url="https://rickandmortyapi.com/api"; // rick and morty base url 
export const client = axios.create({
baseURL: url,
});


export const endPoints = {

chars : "/character", // TODO filter yapcaz
locations : "/location", // ! pagination ile geliyor 
  
};