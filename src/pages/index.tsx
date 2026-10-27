import React from 'react';
import Head from "next/head";
import ActionsHeader from '../components/actions-header';
import { Divider, Stack, Container } from "@mui/material";
import ImageGrid from '../components/image-grid';
import { ImageType } from '@/types/Image';

export default function Home() {
  const [images, setImages] = React.useState<ImageType[]>([]);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    async function loadImages() {
      const res = await fetch(`/api/images?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      setImages(data);
    }
    loadImages();
  }, [search]);

  const onUpload = (image: ImageType) => {
    setImages((prev) => [...prev, image]);
  }

  const onDelete = async (id: string) => {
    const res = await fetch(`/api/images/${id}`, { method: 'DELETE' });
    if (res.ok) {
      // remove deleted image from list
      setImages((prev) => prev.filter((img) => img.id !== id));
    }
  }

  return (
    <>
      <Head>
        <title>Image App</title>
        <meta name="description" content="Image storage" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack spacing={3} sx={{ width: '100%' }}>
          <ActionsHeader
            search={search}
            setSearch={setSearch}
            images={images}
            onUpload={onUpload}
          />

          <Divider />

          <ImageGrid images={images} onDelete={onDelete} />
        </Stack>
      </Container>
    </>
  );
}
