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
import { usePostsStore } from "../../store/posts";
import { $fetch } from 'ofetch'

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

describe('', () => {
  // vi.mock('$fetch')
  // global$fetch = vi.fn()

  // // https://jsonplaceholder.typicode.com/posts

  // test('mocking $fetch', async () => {

  //   const test = {
  //     userId: 1,
  //     id: 1,
  //     title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  //     body: 'quia et suscipit\n' +
  //       'suscipit recusandae consequuntur expedita et cum\n' +
  //       'reprehenderit molestiae ut ut quas totam\n' +
  //       'nostrum rerum est autem sunt rem eveniet architecto'
  //   }

  //   function createFetchResponse(data: any) {
  //     return { json: () => new Promise((resolve) => resolve(data)) };
  //   }

    // const mock = vi.mock('$fetch')
    // await mock.mockResolvedValue()
    // const res = await $fetch('https://jsonplaceholder.typicode.com/posts/1')
    // console.log('RES', res)
  // })
})
