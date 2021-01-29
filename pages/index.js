import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>
          <IGTI-TRAB4-A></IGTI-TRAB4-A>
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Servidor de API contas </h1>
      </main>
    </div>
  );
}
