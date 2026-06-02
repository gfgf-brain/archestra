import React from 'react';
import { Tooltip } from '@/components/ui/tooltip';
import { AlertCircle } from 'lucide-react';
import { EmbeddingErrorType, embeddingErrorMessages } from '@/features/knowledge/types/embedding';

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
