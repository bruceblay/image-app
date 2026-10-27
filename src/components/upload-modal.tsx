import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Backdrop,
  Fade,
  Stack,
  Button,
  IconButton,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDropzone } from "react-dropzone";
import UploadModalFile from './upload-modal-file';
import { UploadItem } from '@/types/UploadItem';
import { ImageType } from '@/types/Image';

type UploadModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onUpload: (image: ImageType) => void;
}

export default function UploadModal(props: UploadModalProps) {
  const { open, setOpen, onUpload } = props;
  const [files, setFiles] = React.useState<UploadItem[]>([])

  const handleClose = () => {
    setOpen(false);
  }

  const {getRootProps, getInputProps} = useDropzone({
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map((file) => ({ file, status: 'uploading' })));

      acceptedFiles.forEach(async (file) => {
        const fd = new FormData();
        fd.append('image', file);
        const res = await fetch('/api/images', { method: 'POST', body: fd });
        const status = res.ok ? 'done' : 'error';

        if (res.ok) {
          onUpload(await res.json());
        }
        setFiles((prev) => prev.map((item) => (item.file === file ? { ...item, status } : item )));
      })
    }
  });

  const handleClearClose = () => {
    setFiles([]);
    setOpen(false);
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="upload-modal-title"
      aria-describedby="upload-modal-description"
      closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backdropFilter: 'blur(6px)'
            }
          },
        }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 540,
            bgcolor: 'background.paper',
            boxShadow: 24,
            px: 3,
            py: 2,
          }}
        >
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography id="upload-modal-title" variant="h6" component="h2">
              Upload images
            </Typography>
            {!files.length ? <IconButton onClick={handleClearClose}><CloseIcon /></IconButton> : null}
          </Stack>
          <Divider />
          {files.length ? (
            <div>
              <Stack sx={{ mt: 1 }}>
                {files.map((file) => (
                  <UploadModalFile file={file} key={file.file.name} />
                ))}
              </Stack>
              
              <Stack
                direction="row"
                spacing={1}
                sx={{ 
                  justifyContent: 'flex-end',
                  mt: 3
                }}
              >
                <Button onClick={() => setFiles([])}>Clear</Button>
                <Button onClick={handleClearClose} variant="contained">Close</Button>
              </Stack>
            </div>
          ) : (
            <Box
              id="upload-modal-description"
              sx={{
                mt: 3,
                mb: 2,
                cursor: 'pointer',
                textAlign: 'center'
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Typography variant='body1' sx={{ fontSize: '1.125rem' }}>
                Drag and drop files here, or click to select files
              </Typography>
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  )
}
