/* eslint-disable */
/**
 * Generated by orval 🍺
 * Do not edit manually.
 * Chained Notes API
 * An application for chained notes.
 * OpenAPI spec version: 1.0.0
 */
import { faker } from "@faker-js/faker";
import { HttpResponse, delay, http } from "msw";
import type { Note } from "./chainedNotesAPI.schemas";

export const getNotesListResponseMock = (): Note[] =>
  Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    body: faker.word.sample(),
    id: faker.number.int({ min: undefined, max: undefined }),
    title: faker.word.sample(),
  }));

export const getNotesCreateResponseMock = (
  overrideResponse: Partial<Note> = {},
): Note => ({
  body: faker.word.sample(),
  id: faker.number.int({ min: undefined, max: undefined }),
  title: faker.word.sample(),
  ...overrideResponse,
});

export const getNotesRetrieveResponseMock = (
  overrideResponse: Partial<Note> = {},
): Note => ({
  body: faker.word.sample(),
  id: faker.number.int({ min: undefined, max: undefined }),
  title: faker.word.sample(),
  ...overrideResponse,
});

export const getNotesUpdateResponseMock = (
  overrideResponse: Partial<Note> = {},
): Note => ({
  body: faker.word.sample(),
  id: faker.number.int({ min: undefined, max: undefined }),
  title: faker.word.sample(),
  ...overrideResponse,
});

export const getNotesPartialUpdateResponseMock = (
  overrideResponse: Partial<Note> = {},
): Note => ({
  body: faker.word.sample(),
  id: faker.number.int({ min: undefined, max: undefined }),
  title: faker.word.sample(),
  ...overrideResponse,
});

export const getNotesListMockHandler = (
  overrideResponse?:
    | Note[]
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<Note[]> | Note[]),
) => {
  return http.get("*/api/notes/", async (info) => {
    await delay(1000);

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === "function"
            ? await overrideResponse(info)
            : overrideResponse
          : getNotesListResponseMock(),
      ),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  });
};

export const getNotesCreateMockHandler = (
  overrideResponse?:
    | Note
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0],
      ) => Promise<Note> | Note),
) => {
  return http.post("*/api/notes/", async (info) => {
    await delay(1000);

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === "function"
            ? await overrideResponse(info)
            : overrideResponse
          : getNotesCreateResponseMock(),
      ),
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  });
};

export const getNotesRetrieveMockHandler = (
  overrideResponse?:
    | Note
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<Note> | Note),
) => {
  return http.get("*/api/notes/:id/", async (info) => {
    await delay(1000);

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === "function"
            ? await overrideResponse(info)
            : overrideResponse
          : getNotesRetrieveResponseMock(),
      ),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  });
};

export const getNotesUpdateMockHandler = (
  overrideResponse?:
    | Note
    | ((
        info: Parameters<Parameters<typeof http.put>[1]>[0],
      ) => Promise<Note> | Note),
) => {
  return http.put("*/api/notes/:id/", async (info) => {
    await delay(1000);

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === "function"
            ? await overrideResponse(info)
            : overrideResponse
          : getNotesUpdateResponseMock(),
      ),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  });
};

export const getNotesPartialUpdateMockHandler = (
  overrideResponse?:
    | Note
    | ((
        info: Parameters<Parameters<typeof http.patch>[1]>[0],
      ) => Promise<Note> | Note),
) => {
  return http.patch("*/api/notes/:id/", async (info) => {
    await delay(1000);

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === "function"
            ? await overrideResponse(info)
            : overrideResponse
          : getNotesPartialUpdateResponseMock(),
      ),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  });
};

export const getNotesDestroyMockHandler = (
  overrideResponse?:
    | void
    | ((
        info: Parameters<Parameters<typeof http.delete>[1]>[0],
      ) => Promise<void> | void),
) => {
  return http.delete("*/api/notes/:id/", async (info) => {
    await delay(1000);
    if (typeof overrideResponse === "function") {
      await overrideResponse(info);
    }
    return new HttpResponse(null, { status: 204 });
  });
};
export const getChainedNotesAPIMock = () => [
  getNotesListMockHandler(),
  getNotesCreateMockHandler(),
  getNotesRetrieveMockHandler(),
  getNotesUpdateMockHandler(),
  getNotesPartialUpdateMockHandler(),
  getNotesDestroyMockHandler(),
];
