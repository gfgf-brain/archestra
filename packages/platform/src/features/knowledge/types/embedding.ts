export enum EmbeddingErrorType {
  RATE_LIMIT = 'RATE_LIMIT',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  MODEL_NOT_FOUND = 'MODEL_NOT_FOUND',
  DIMENSION_MISMATCH = 'DIMENSION_MISMATCH',
  SERVER_ERROR = 'SERVER_ERROR',
  UNKNOWN = 'UNKNOWN',
}

export const embeddingErrorMessages: Record<EmbeddingErrorType, string> = {
  [EmbeddingErrorType.RATE_LIMIT]: 'Rate limit exceeded. Please try again later.',
  [EmbeddingErrorType.UNAUTHORIZED]: 'Authentication failed. Please check your API key.',
  [EmbeddingErrorType.FORBIDDEN]: 'Access denied. Please check your API credentials and permissions.',
  [EmbeddingErrorType.MODEL_NOT_FOUND]: 'Embedding model not found. Please verify the model configuration.',
  [EmbeddingErrorType.DIMENSION_MISMATCH]: 'Model dimension mismatch. The configured model does not support the required embedding dimensions.',
  [EmbeddingErrorType.SERVER_ERROR]: 'Embedding service error. Please try again later.',
  [EmbeddingErrorType.UNKNOWN]: 'Unknown embedding error. Please contact support if the issue persists.',
};

export function mapErrorToEmbeddingErrorType(error: any): EmbeddingErrorType {
  if (!error) return EmbeddingErrorType.UNKNOWN;

  const errorMessage = error.message?.toLowerCase() || '';
  const errorCode = error.code || error.status;

  // Check for rate limit errors
  if (errorCode === 429 || errorMessage.includes('rate limit')) {
    return EmbeddingErrorType.RATE_LIMIT;
  }

  // Check for authentication errors
  if (errorCode === 401 || errorMessage.includes('unauthorized') || errorMessage.includes('invalid api key')) {
    return EmbeddingErrorType.UNAUTHORIZED;
  }

  // Check for permission errors
  if (errorCode === 403 || errorMessage.includes('forbidden') || errorMessage.includes('permission denied')) {
    return EmbeddingErrorType.FORBIDDEN;
  }

  // Check for model not found errors
  if (errorMessage.includes('model not found') || errorMessage.includes('unknown model')) {
    return EmbeddingErrorType.MODEL_NOT_FOUND;
  }

  // Check for dimension mismatch errors
  if (errorMessage.includes('dimension') || errorMessage.includes('mismatch') || errorMessage.includes('3072')) {
    return EmbeddingErrorType.DIMENSION_MISMATCH;
  }

  // Check for server errors
  if (errorCode >= 500 || errorMessage.includes('internal server error')) {
    return EmbeddingErrorType.SERVER_ERROR;
  }

  return EmbeddingErrorType.UNKNOWN;
}
