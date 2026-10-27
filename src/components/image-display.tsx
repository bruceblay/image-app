import Image from 'next/image';
import { Box, IconButton, Typography, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ImageType } from '@/types/Image';

type ImageDisplayProps = {
  image: ImageType;
  onDelete: (id: string) => void;
}

export default function ImageDisplay({ image, onDelete }: ImageDisplayProps) {
  return (
    <Stack>
      <Box
        sx={{ 
          position: 'relative',
          width: '100%',
          aspectRatio: '1',
          '&:hover .delete-btn': { opacity: 1 }
        }}
      >
        <Image
          src={image?.url || ''}
          alt={image.originalName}
          fill
          sizes="(max-width: 1200px) 50vw, 600px"
          style={{ objectFit: 'cover' }}
        />
        <IconButton
          className="delete-btn"
          onClick={() => onDelete(image.id)}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            opacity: 0,
            transition: 'opacity 0.2s',
            backdropFilter: 'blur(15px)',
            color: 'error.main'
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>

      <Stack
        direction='row'
        sx={{
          mt: 1,
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="body2">
          {image.originalName}
        </Typography>
        <Typography variant="body2">
          Uploaded at: {new Date(image.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </Typography>
      </Stack>
    </Stack>
  )
}