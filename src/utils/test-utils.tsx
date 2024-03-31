import { setupStore, type AppStore, type RootState } from "src/app/store";

import React, { ReactElement } from "react";

import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ReadonlyDeep } from "type-fest";

import type { RenderOptions } from "@testing-library/react";

type RenderWithProvidersProps = {
  preloadedState?: RootState;
  store?: AppStore;
};

const renderWithProviders = (
  ui: ReadonlyDeep<ReactElement>,
  {
    preloadedState,

    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
  }: RenderWithProvidersProps = {},
) => {
  return <Provider store={store}>{ui}</Provider>;
};

const renderWithRouter = (ui: ReadonlyDeep<ReactElement>) => {
  return <BrowserRouter>{ui}</BrowserRouter>;
};

type CustomRenderProps = RenderOptions & RenderWithProvidersProps;

const customRender = (
  ui: ReadonlyDeep<ReactElement>,
  {
    // redux
    store,
    preloadedState,

    // extra
    ...props
  }: CustomRenderProps = {},
) => {
  const uiWithRouter = renderWithRouter(ui);
  const uiWithProviders = renderWithProviders(uiWithRouter, {
    store,
    preloadedState,
  });

  return render(uiWithProviders, { ...props });
};

export { customRender as render };
