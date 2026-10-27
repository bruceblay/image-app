import { Stack, Typography, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { UploadItem } from '@/types/UploadItem';

export default function UploadModalFile({ file }: { file: UploadItem }) {
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center', py: 1}}>
      <Typography variant="body2" noWrap sx={{ flex: 1 }}>
        {file.file.name}
      </Typography>
      {file.status === 'uploading' && <CircularProgress size={18} />}
      {file.status === 'done' && <CheckCircleIcon color="success" fontSize="small" />}
      {file.status === 'error' && <ErrorIcon color="error" fontSize="small" />}
    </Stack>
  )
}