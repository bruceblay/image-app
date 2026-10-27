import React from 'react';
import { Stack, Autocomplete, Button, TextField } from '@mui/material';
import UploadModal from './upload-modal';
import { ImageType } from '@/types/Image';

type ActionsHeaderProps = {
  images: ImageType[];
  search: string;
  setSearch: (value: string) => void;
  onUpload: (image: ImageType) => void;
}

export default function ActionsHeader(props: ActionsHeaderProps) {
  const { search, setSearch, images, onUpload } = props;
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const handleUploadButton = () => {
    setModalOpen(!modalOpen);
  }

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        resetHighlightOnMouseLeave
        sx={{ width: 400 }}
        options={images.map((option) => option.originalName)}
        inputValue={search}
        onInputChange={(_event, newValue) => setSearch(newValue)}
        renderInput={(params) => <TextField {...params} label="Search Images" />}
      />
      <Button variant="contained" onClick={handleUploadButton}>
        Upload
      </Button>
      <UploadModal open={modalOpen} setOpen={setModalOpen} onUpload={onUpload} />
    </Stack>
  )
}