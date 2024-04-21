<script setup>
import { useAssetStore } from '~/store/assets';

const { toggleReverseSearch } = useAssetStore();
const selectItem = ref('3D');
const searchQuery = ref('');

const route = useRoute()

const handleSearchInput = () => {
  navigateTo({
    path: route.path,
    query: {
      ...route.query,
      search: searchQuery.value,
    },
  })
}

searchQuery.value = route.query.search || ''

const clearSearchQuery = () => {
  searchQuery.value = ''
  const query = { ...route.query }
  delete query.search
  navigateTo({
    path: route.path,
    query,
  })
}
</script>

<template>
  <div class="search">
    <BaseSelect
      v-model="selectItem"
      class="search-select"
      :select-items="['3D', 'Icons', 'Illustrations']"
    />
    <input
      v-model="searchQuery"
      @keydown.enter="handleSearchInput"
      class="search-input"
      type="text"
      aria-label="Search from 8 million+ assets"
      placeholder="Search from 8 million+ assets"
    >
    <button class="btn-clear" :class="{ 'visible': searchQuery.length > 1 }" @click="clearSearchQuery">
      <p class="visually-hidden">Clear search text</p>
      <Icon name="material-symbols:close-rounded" />
    </button>
    <button class="reverse-search ms-auto" @click="toggleReverseSearch(true)">
      <img
        src="~assets/icons/reverse-search-picture.svg"
        alt="Reverse search"
      >
    </button>
  </div>
</template>

<style lang="scss" scoped>
.search {
  background-color: $bg-grey-1;
  padding: 0.5rem 0.625rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;

  .search-select {
    border-right: 1px solid $bg-grey-4;
  }

  .btn-clear {
    background-color: transparent;
    border: none;
    pointer-events: none;
    opacity: 0;
  }

  .search-input {
    border: none;
    background-color: transparent;
    padding-left: 2.5rem;
    background-image: url('~/assets/icons/search.svg');
    background-repeat: no-repeat;
    background-size: 24px;
    background-position: 0.5rem center;
    outline: none;
    width: 100%;
    text-overflow: ellipsis;

    &::placeholder {
      color: $text-black;
      font-size: 0.875rem;
    }

    &:focus + .btn-clear {
      opacity: 1;
      pointer-events: all;
    }
  }

  .btn-clear.visible {
    opacity: 1;
    pointer-events: all;
  }

  .reverse-search {
    border: none;
    background-color: $bg-grey-2;
    border-radius: 4px;
    padding: 0.375rem;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: $bg-grey-3;
    }

    img {
      width: 1.5rem;
    }
  }
}
</style>
