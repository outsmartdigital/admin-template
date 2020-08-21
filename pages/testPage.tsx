import styled from "styled-components";
import styles from "../styles/Home.module.css";
import Head from "next/head";

export const HomeContainer = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
`;

export default function testPage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Template React SPA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <HomeContainer>
          <p>Another page</p>
        </HomeContainer>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/logo.png" alt="Outsmart Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
