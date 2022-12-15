import {
  describe,
  test,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
} from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { usePostsStore } from "./posts";

beforeAll(() => {
  setActivePinia(createPinia());
});

describe("Posts store", () => {
  let postsStore: ReturnType<typeof usePostsStore>;

  beforeEach(() => {
    postsStore = usePostsStore();
  });
  afterEach(() => {
    postsStore.$reset();
  });

  test("create store", () => {
    expect(postsStore).toBeDefined();
  });
  test('init empty posts', () => {
    expect(postsStore.posts).toStrictEqual([])
  })
});
