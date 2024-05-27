import { client, endPoints } from './api';

export interface Location {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
    url: string;
    created: string;
  }
  
  interface LocationsResponse {
    info: {
      count: number;
      pages: number;
      next: string | null;
      prev: string | null;
    };
    results: Location[];
  }
  

    // Fetcher all locations
  export async function fetchAllLocations(): Promise<Location[]> {
    try {
      const response = await client.get<LocationsResponse>(endPoints.locations);
      const totalPages = response.data.info.pages;
  
      const pagePromises = [];
      for (let i = 2; i <= totalPages; i++) {
        pagePromises.push(client.get<LocationsResponse>(`${endPoints.locations}?page=${i}`));
      }
  
      const pageResponses = await Promise.all(pagePromises);
  
      const allLocations = response.data.results.concat(
        ...pageResponses.map(res => res.data.results)
      );
  
      return allLocations;
    } catch (error) {
      console.error('Error fetching all locations: ', error);
      return [];
    }
  } 

