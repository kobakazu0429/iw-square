import React from "react";
import App from "next/app";
import { Normalize } from "styled-normalize";
import { ThemeProvider } from "../theme/ThemeProvider";
import { GlobalStyle } from "../theme/GlobalStyle";
import "semantic-ui-css/semantic.min.css";
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
        <ThemeProvider themeName="default">
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}
