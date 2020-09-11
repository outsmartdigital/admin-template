import React from "react";
import HomePage from "../src/pages/home/HomePage";
import { getServerSideProps } from "../src/pages/home/getServerSideProps";

// Don't add neither logic or layout here. This file simply delegates all that to files in the src dir.

export { getServerSideProps };

export default HomePage;
