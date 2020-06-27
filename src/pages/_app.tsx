import React from "react";
import App from "next/app";
import { Normalize } from "styled-normalize";
import { ToastContainer } from "react-toastify";
import { CloudinaryContext } from "cloudinary-react";
import { ThemeProvider } from "../theme/ThemeProvider";
import { GlobalStyle } from "../theme/GlobalStyle";
import "semantic-ui-css/semantic.min.css";
import "react-image-crop/dist/ReactCrop.css";
import "react-toastify/dist/ReactToastify.css";
import "dayjs/locale/ja";

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Normalize />
        <GlobalStyle />
        <ToastContainer />
        <ThemeProvider themeName="default">
          <CloudinaryContext cloudName="iw-square">
            <Component {...pageProps} />
          </CloudinaryContext>
        </ThemeProvider>
      </>
    );
  }
}
