import {
  describe,
  test,
  expect,
  beforeEach,
  beforeAll,
  afterEach,
} from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useAuthStore } from "./auth";

// describe('runs', () => {
//     test('it works', () => {
//         expect(true).toBe(true)
//     })
// })

beforeAll(() => {
  setActivePinia(createPinia());
});

describe("Auth Store", () => {
  let authStore: ReturnType<typeof useAuthStore>;
  
  beforeEach(() => {
    authStore = useAuthStore();
  });
  afterEach(() => {
    authStore.$reset();
  });
  test("create store", () => {
    expect(authStore).toBeDefined();
  });
  test('initialize empty user', () => {
    expect(authStore.user).toStrictEqual(null)
  })
  test('initialize error auth false', () => {
    expect(authStore.authError).toStrictEqual(false)
  })
  test('getter isAuth boolean value', () => {
    expect(authStore.isAuth).toBeTypeOf("boolean")
  })
//   not found useCookie ??
//   test('logout user', () => {
//     authStore.user = {token: '123'}
//     authStore.logout()
//     expect(authStore.user).toStrictEqual(null)
//   })
});
