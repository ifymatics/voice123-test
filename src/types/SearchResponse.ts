import { VoiceActor } from "./VoiceActor";

export interface SearchResponse {
  pagination: {
    pageSize: number;
    currentPage: number;
    totalPages: number;
  };
  voiceActors: VoiceActor[];
}
