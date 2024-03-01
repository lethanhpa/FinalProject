import "@/styles/globals.css";
import Footer from "@/components/Footer";
import PropTypes from "prop-types";
import Header from "@/components/Header"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.instanceOf().isRequired,
};