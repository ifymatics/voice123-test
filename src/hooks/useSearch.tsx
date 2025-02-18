import { useState, useEffect } from "react";
import { SearchResponse } from "./../types/SearchResponse";
import { VoiceActor } from "./../types/VoiceActor";

const BASE_URL =
  "https://api.sandbox.voice123.com/providers/search/?service=voice_over&";

const urlBuilder = (keyword: string, page: number): string =>
  `${BASE_URL}keywords=${keyword}&page=${page}`;

interface SearchResult {
  results: SearchResponse;
  loading: boolean;
  error: string | null;
}

export const useSearch = (query: string, page: number): SearchResult => {
  const [voiceActors, setVoiceActors] = useState([]);
  const [headers, setHeaders] = useState<Headers>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  //   console.log("page:", page, "query: ", query);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = urlBuilder(query, page);
        const response = await fetch(url);

        if (!response.ok)
          throw new Error(`Failed to fetch results: ${query}, ${page}`);
        setHeaders(response.headers);

        const data = await response.json();

        setVoiceActors(data.providers);
        setError(null);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to fetch results");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const resData = {
    pagination: {
      currentPage: Number(headers?.get("x-list-current-page")),
      pageSize: Number(headers?.get("x-list-current-page")),
      totalPages: Number(headers?.get("x-list-total-pages")),
    },
    voiceActors: voiceActors as VoiceActor[],
  };

  return { results: resData, loading, error };
};
// export default useSearch;
