import React, { ReactElement } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { setupStore, type AppStore, type RootState } from "src/app/store";
import { BrowserRouter } from "react-router-dom";

type RenderWithProvidersProps = {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
};

const renderWithProviders = (
  ui: ReactElement,
  {
    preloadedState = {},

    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
  }: RenderWithProvidersProps = {},
) => {
  return <Provider store={store}>{ui}</Provider>;
};

const renderWithRouter = (ui: ReactElement) => {
  return <BrowserRouter>{ui}</BrowserRouter>;
};

type CustomRenderProps = RenderOptions & RenderWithProvidersProps;

export const customRender = (
  ui: ReactElement,
  {
    // redux
    store,
    preloadedState,

    // extra
    ...props
  }: CustomRenderProps = {},
) => {
  let toRender = renderWithRouter(ui);
  toRender = renderWithProviders(toRender, {
    store,
    preloadedState,
  });

  return render(toRender, { ...props });
};

export { customRender as render };
