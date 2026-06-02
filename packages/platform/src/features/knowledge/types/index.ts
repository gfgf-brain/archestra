export enum EmbeddingErrorType {
  RATE_LIMIT = 'RATE_LIMIT',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  MODEL_NOT_FOUND = 'MODEL_NOT_FOUND',
  DIMENSION_MISMATCH = 'DIMENSION_MISMATCH',
  SERVER_ERROR = 'SERVER_ERROR',
  UNKNOWN = 'UNKNOWN',
}

export interface FileUploadState {
  id: string;
  status: 'idle' | 'uploading' | 'processing' | 'failed' | 'success';
  processingError?: string;
  embeddingError?: EmbeddingErrorType;
  progress?: number;
}
