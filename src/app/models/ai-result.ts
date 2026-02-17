export interface AIResult {
  filename: string;
  disease_name: string;
  confidence: number;
  recommendation: string | null;
  created_at: string;
}

export interface AIResultResponse {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  data: AIResult[];
}
