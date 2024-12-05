import React, { ReactElement } from "react";

import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ReadonlyDeep } from "type-fest";

import type { RenderOptions } from "@testing-library/react";

const renderWithRouter = (ui: ReadonlyDeep<ReactElement>) => {
  return <BrowserRouter>{ui}</BrowserRouter>;
};

const queryClient = new QueryClient();

const customRender = (
  ui: ReadonlyDeep<ReactElement>,
  props: RenderOptions = {},
) => {
  const uiWithRouter = renderWithRouter(ui);

  // Cleanup before rendering to ensure an empty state in concurrent execution.
  cleanup();

  return render(
    <QueryClientProvider client={queryClient}>
      {uiWithRouter}
    </QueryClientProvider>,
    props,
  );
};

export { customRender as render };
