import { Location } from "./Location";
import { User } from "./User";
import { RelevantSample } from "./RelevantSample";

export interface VoiceActor {
  id: number;
  user_id: number;
  service_id: string;
  payment_methods: number[];
  headline: string;
  summary: string;
  favorite: boolean;
  additional_services: number[];
  allow_bookings: boolean;
  membership_product_name: string;
  locations: Location[];
  user: User;
  relevant_sample: RelevantSample;
  additional_details: string;
  languages: number[];
  voice_age_genders: number[];
  voice_types: number[];
  recording_capabilities: number[];
}
