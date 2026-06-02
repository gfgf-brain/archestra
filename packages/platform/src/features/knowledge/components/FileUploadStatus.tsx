import React from 'react';
import { Tooltip } from '@/components/ui/tooltip';
import { AlertCircle } from 'lucide-react';

export enum EmbeddingErrorType {
  RATE_LIMIT = 'RATE_LIMIT',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  MODEL_NOT_FOUND = 'MODEL_NOT_FOUND',
  DIMENSION_MISMATCH = 'DIMENSION_MISMATCH',
  SERVER_ERROR = 'SERVER_ERROR',
  UNKNOWN = 'UNKNOWN',
}

const embeddingErrorMessages: Record<EmbeddingErrorType, string> = {
  [EmbeddingErrorType.RATE_LIMIT]: 'Rate limit exceeded. Please try again later.',
  [EmbeddingErrorType.UNAUTHORIZED]: 'Authentication failed. Please check your API key.',
  [EmbeddingErrorType.FORBIDDEN]: 'Access denied. Please check your API credentials and permissions.',
  [EmbeddingErrorType.MODEL_NOT_FOUND]: 'Embedding model not found. Please verify the model configuration.',
  [EmbeddingErrorType.DIMENSION_MISMATCH]: 'Model dimension mismatch. The configured model does not support the required embedding dimensions.',
  [EmbeddingErrorType.SERVER_ERROR]: 'Embedding service error. Please try again later.',
  [EmbeddingErrorType.UNKNOWN]: 'Unknown embedding error. Please contact support if the issue persists.',
};

interface FileUploadStatusProps {
  status: 'uploading' | 'processing' | 'embedding' | 'success' | 'failed';
  processingError?: string;
  embeddingError?: EmbeddingErrorType;
  onRetry?: () => void;
}

export const FileUploadStatus: React.FC<FileUploadStatusProps> = ({
  status,
  processingError,
  embeddingError,
  onRetry,
}) => {
  const getErrorMessage = () => {
    if (processingError) return processingError;
    if (embeddingError) return embeddingErrorMessages[embeddingError];
    return 'Upload failed';
  };

  const errorMessage = getErrorMessage();

  if (status === 'failed') {
    return (
      <Tooltip content={errorMessage}>
        <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-md">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span className="text-sm font-medium text-red-600">Failed</span>
          {onRetry && (
            <button
              onClick={onRetry}
              className="ml-auto text-xs text-red-600 hover:text-red-700 underline"
            >
              Retry
            </button>
          )}
        </div>
      </Tooltip>
    );
  }

  return null;
};
