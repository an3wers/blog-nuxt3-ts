import {
  describe,
  test,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
  vi,
} from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useTestFetch } from "../../store/testFetch";
// import { $fetch } from '@nuxt/test-utils'

beforeAll(() => {
  setActivePinia(createPinia());
});

describe("testFetch store", () => {
  // basic setup
  let fetchStore: ReturnType<typeof useTestFetch>;

  beforeEach(() => {
    fetchStore = useTestFetch();
  });

  afterEach(() => {
    fetchStore.$reset();
  });

  test("create store", () => {
    expect(fetchStore).toBeDefined();
  });
  test("load user by id", async () => {
    const userId = "1";
    await fetchStore.fetchSwapiApi(userId);
    // console.log('User', fetchStore.user)
    expect(fetchStore.user).not.toBe(null);
  });
  test("request", async () => {
    global.fetch = vi.fn();

    function createFetchResponse(data: any) {
      return { json: () => new Promise((resolve) => resolve(data)) };
    }

    const userResponse = {
      name: "Luke Skywalker",
      height: "172",
      mass: "77",
      hair_color: "blond",
      skin_color: "fair",
      eye_color: "blue",
      birth_year: "19BBY",
      gender: "male",
      homeworld: "https://swapi.dev/api/planets/1/",
      films: [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/6/",
      ],
      species: [],
      vehicles: [
        "https://swapi.dev/api/vehicles/14/",
        "https://swapi.dev/api/vehicles/30/",
      ],
      starships: [
        "https://swapi.dev/api/starships/12/",
        "https://swapi.dev/api/starships/22/",
      ],
      created: "2014-12-09T13:50:51.644000Z",
      edited: "2014-12-20T21:17:56.891000Z",
      url: "https://swapi.dev/api/people/1/",
    };

    fetch.mockResolvedValue(createFetchResponse(userResponse));
    const user = await fetchStore.fetchSwapiApi("1");
    expect(user).toEqual(userResponse);
  });
});
