<template>
  <input
    type="text"
    :value="localSearchValue"
    @input="searchHandler"
    class="form-control"
    placeholder="Search post..."
  />
</template>

<script setup lang="ts">
import { useFiltersStore } from "~~/store/filters";
import { storeToRefs } from "pinia";

const filterStore = useFiltersStore();
const { searchValue } = storeToRefs(filterStore);
const router = useRouter();

const localSearchValue = ref(searchValue);

const delay = useDebounce((val: string) => {
  searchValue.value = val;
  if (val) {
    router.replace(`?search=${searchValue.value}`);
  } else {
    router.replace({ query: undefined });
  }
}, 650);

function searchHandler(e: Event) {
  localSearchValue.value = (e.target as HTMLInputElement).value;

  delay(localSearchValue.value);
}

</script>
