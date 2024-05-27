import axios from "axios";

const url="https://rickandmortyapi.com/api"; // rick and morty base url 
export const axiosInstance = axios.create({
baseURL: url,
});


export const endPoints = {

chars : "/character",
  
};