import Head from "next/head";
import styles from "../styles/Home.module.css";
import styled from "styled-components";
import Link from "next/link";

export const HomeContainer = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
`;

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Template React SPA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <HomeContainer>
          <p>Coming soon!</p>
          <Link href={"testPage"} as={"test"}>
            Second Screen
          </Link>
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
