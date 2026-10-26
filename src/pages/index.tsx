import Head from "next/head";
import styles from "@/styles/Home.module.css";
import ActionsHeader from '../components/actions-header';

export default function Home() {
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
          <ActionsHeader />
        </main>
      </div>
    </>
  );
}
