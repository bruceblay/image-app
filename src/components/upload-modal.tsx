import { Modal, Box, Typography, Backdrop, Fade } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type UploadModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function UploadModal(props: UploadModalProps) {
  const { open, setOpen } = props;

  const handleClose = () => {
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
          },
        }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="upload-modal-title" variant="h6" component="h2">
            Upload images
          </Typography>
          <Typography id="upload-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Fade>
    </Modal>
  )
}