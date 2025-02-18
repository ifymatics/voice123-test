export interface RelevantSample {
  id: number;
  name: string;
  provider_id: number;
  additional_info: string;
  // display_order: never;
  is_approved: boolean;
  file: string;
  additional_services: number[];
  languages: number[];
  is_valid: boolean;
  service_id: string;
  created_at: string;
  updated_at: string;
  voice_types: number[];
  voice_age_genders: number[];
}
