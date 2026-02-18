export interface HealthResponse {
  // image
  image_url?: string;
  filename?: string;

  // ai result
  disease_name?: string | null;
  confidence?: number | null;
  recommendation?: string | null;

  // time
  created_at?: string;

  // frontend derived
  disease?: string | null;
  disease_th?: string | null;
  last_check?: string;
  time?: string;
  system_status?: string;
}
