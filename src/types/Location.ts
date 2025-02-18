export interface Location {
  locality_aliases: string[];
  locality: string;
  administrative_area_name: string;
  country_code: string;
  administrative_area_code: string;
  full_name: string;
  country_name: string;
  location: {
    lon: number
    lat: number
  };
  id: number;
  place_id: string;
}
