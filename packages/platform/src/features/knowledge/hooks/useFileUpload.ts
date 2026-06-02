import { useState, useCallback } from 'react';
import { EmbeddingErrorType, FileUploadState } from '../types';

export const useFileUpload = () => {
  const [uploadState, setUploadState] = useState<FileUploadState>({
    id: '',
    status: 'idle',
  });

  const mapErrorToEmbeddingErrorType = (error: any): EmbeddingErrorType => {
    if (!error) return EmbeddingErrorType.UNKNOWN;

    const errorMessage = error.message?.toLowerCase() || '';
    const statusCode = error.statusCode || error.status;

    // Rate limit errors
    if (statusCode === 429 || errorMessage.includes('rate limit')) {
      return EmbeddingErrorType.RATE_LIMIT;
    }

    // Authentication errors
    if (statusCode === 401 || errorMessage.includes('unauthorized') || errorMessage.includes('invalid api key')) {
      return EmbeddingErrorType.UNAUTHORIZED;
    }

    // Permission errors
    if (statusCode === 403 || errorMessage.includes('forbidden')) {
      return EmbeddingErrorType.FORBIDDEN;
    }

    // Model not found
    if (statusCode === 404 || errorMessage.includes('model not found') || errorMessage.includes('not found')) {
      return EmbeddingErrorType.MODEL_NOT_FOUND;
    }

    // Dimension mismatch (PostgreSQL error)
    if (errorMessage.includes('dimension') || errorMessage.includes('mismatch')) {
      return EmbeddingErrorType.DIMENSION_MISMATCH;
    }

    // Server errors
    if (statusCode && statusCode >= 500) {
      return EmbeddingErrorType.SERVER_ERROR;
    }

    return EmbeddingErrorType.UNKNOWN;
  };

  const handleUploadError = useCallback(
    (error: any, processingError?: string) => {
      const embeddingError = mapErrorToEmbeddingErrorType(error);
      setUploadState((prev) => ({
        ...prev,
        status: 'failed',
        embeddingError,
        processingError,
      }));
    },
    []
  );

  const resetUploadState = useCallback(() => {
    setUploadState({
      id: '',
      status: 'idle',
    });
  }, []);

  return {
    uploadState,
    setUploadState,
    handleUploadError,
    resetUploadState,
    mapErrorToEmbeddingErrorType,
  };
};
