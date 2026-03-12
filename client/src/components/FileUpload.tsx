import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { trpc } from '../lib/trpc';

interface FileUploadProps {
  category: 'resume' | 'project' | 'asset';
  onSuccess?: (result: { url: string; fileName: string }) => void;
  onError?: (error: string) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ category, onSuccess, onError }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadMutation = trpc.files.upload.useMutation();

  const handleFile = async (file: File) => {
    if (!file) return;

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      setUploadStatus('error');
      setStatusMessage('File size must be less than 50MB');
      onError?.('File size too large');
      return;
    }

    setIsUploading(true);
    setUploadStatus('idle');

    try {
      // Read file as base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Content = (e.target?.result as string).split(',')[1];

        try {
          const result = await uploadMutation.mutateAsync({
            fileName: file.name,
            fileContent: base64Content,
            fileType: file.type || 'application/octet-stream',
            category,
          });

          setUploadStatus('success');
          setStatusMessage(`✓ ${file.name} uploaded successfully`);
          onSuccess?.(result);

          // Reset after 3 seconds
          setTimeout(() => {
            setUploadStatus('idle');
            if (fileInputRef.current) fileInputRef.current.value = '';
          }, 3000);
        } catch (error) {
          setUploadStatus('error');
          const errorMsg = error instanceof Error ? error.message : 'Upload failed';
          setStatusMessage(errorMsg);
          onError?.(errorMsg);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setUploadStatus('error');
      const errorMsg = error instanceof Error ? error.message : 'Failed to read file';
      setStatusMessage(errorMsg);
      onError?.(errorMsg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
        isDragging
          ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
          : 'border-gray-300 hover:border-blue-400'
      } ${isUploading ? 'opacity-75' : ''}`}
    >
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        disabled={isUploading}
        className="hidden"
        accept={category === 'resume' ? '.pdf,.doc,.docx' : undefined}
      />

      {isUploading ? (
        <div className="flex flex-col items-center gap-2">
          <Loader className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Uploading...</p>
        </div>
      ) : uploadStatus === 'success' ? (
        <div className="flex flex-col items-center gap-2">
          <CheckCircle className="w-8 h-8 text-green-500" />
          <p className="text-sm text-green-600 dark:text-green-400">{statusMessage}</p>
        </div>
      ) : uploadStatus === 'error' ? (
        <div className="flex flex-col items-center gap-2">
          <AlertCircle className="w-8 h-8 text-red-500" />
          <p className="text-sm text-red-600 dark:text-red-400">{statusMessage}</p>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer flex flex-col items-center gap-2"
        >
          <Upload className="w-8 h-8 text-gray-400" />
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Drag and drop your file here
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            or click to browse (Max 50MB)
          </p>
        </div>
      )}
    </div>
  );
};
