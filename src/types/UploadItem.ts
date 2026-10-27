export type UploadItem = {
  file: File;
  status: 'uploading' | 'done' | 'error';
}