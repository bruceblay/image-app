import React from 'react';
import { Modal, Box, Typography, Backdrop, Fade, Stack, Grid, Button } from '@mui/material';
import { useDropzone } from "react-dropzone";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 440,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type UploadItem = {
  file: File;
  status: 'uploading' | 'done' | 'error';
}

function UploadFile({ file }: { file: UploadItem }) {
  return (
    <Grid container spacing={2}>
      <div>
        {file.file.name}
      </div>
      <div>
        {file.status}
      </div>
    </Grid>
  )
}

type UploadModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function UploadModal(props: UploadModalProps) {
  const { open, setOpen } = props;
  const [files, setFiles] = React.useState<UploadItem[]>([])

  const handleClose = () => {
    setOpen(false);
  }

  const {getRootProps, getInputProps} = useDropzone({
    onDrop: acceptedFiles => {
      // Do something with the files, e.g. upload to a server
      console.log(acceptedFiles);
      setFiles(acceptedFiles.map((file) => ({ file, status: 'uploading' })));

      acceptedFiles.forEach(async (file) => {
        const fd = new FormData();
        fd.append('image', file);
        const res = await fetch('/api/images', { method: 'POST', body: fd });
        const status = res.ok ? 'done' : 'error';

        setFiles((prev) => prev.map((item) => (item.file === file ? { ...item, status } : item )));
      })
    }
  });

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
          },
        }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="upload-modal-title" variant="h6" component="h2">
            Upload images
          </Typography>
          {files.length ? (
            <div>
              <Stack>
                {files.map((file) => (
                  <UploadFile file={file} key={file.file.name} />
                ))}
              </Stack>
              
              <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end', mt: 3 }}>
                <Button onClick={() => setFiles([])}>Clear</Button>
                <Button onClick={() => setOpen(false)} variant="contained">Close</Button>
              </Stack>
            </div>
          ) : (
            <Typography id="upload-modal-description" sx={{ mt: 2, cursor: 'pointer' }} {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag and drop files here, or click to select files</p>
            </Typography>
          )}
        </Box>
      </Fade>
    </Modal>
  )
}
