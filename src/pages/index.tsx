import React from 'react';
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import ActionsHeader from '../components/actions-header';
import { Divider, Stack } from "@mui/material";
import ImageGrid from '../components/image-grid';

export default function Home() {
  const [images, setImages] = React.useState([]);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    async function loadImages() {
      const res = await fetch(`/api/images?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      setImages(data);
    }
    loadImages();
  }, [search]);

  return (
    <>
      <Head>
        <title>Image App</title>
        <meta name="description" content="Image storage" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page}`}
      >
        <main className={styles.main}>
          <Stack spacing={3} sx={{ width: '100%' }}>
            <ActionsHeader search={search} setSearch={setSearch} />

            <Divider />

            <ImageGrid />
          </Stack>
        </main>
      </div>
    </>
  );
}
