import { Grid, Stack, Typography } from '@mui/material';
import ImageDisplay from './image-display';
import { ImageType } from '@/types/Image';

type ImageGridProps = {
  images: ImageType[];
  onDelete: (id: string) => void;
}

export default function ImageGrid(props: ImageGridProps) {
  const { images, onDelete } = props;

  return (
    <Stack spacing={2}>
      <Typography variant='h6'>
        {images.length} Images
      </Typography>

      <Grid container spacing={4}>
        {images.map((img) => (
          <Grid key={img.id} size={6}>
            <ImageDisplay image={img} onDelete={onDelete} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}