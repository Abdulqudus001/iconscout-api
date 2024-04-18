<script setup>
const selectItem = ref('');
</script>

<template>
  <div class="search">
    <BaseSelect
      v-model="selectItem"
      class="search-select"
      :select-items="['3D', 'Icons', 'Illustrations']"
    />
    <input
      class="search-input pe-7"
      type="text"
      aria-label="Search from 8 million+ assets"
      placeholder="Search from 8 million+ assets"
    >
    <button class="reverse-search ms-auto">
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
