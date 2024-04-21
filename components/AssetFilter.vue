<script setup>
const { assetType } = useFilter();
const route = useRoute();

const getLinkWithQueryParams = (path) => {
  const availableQueries = new URLSearchParams(route.query);
  return `${path}?${availableQueries}`;
};
</script>

<template>
  <div
    class="filter"
    :class="{ 'is-video': assetType === 'lottie' }"
  >
    <div class="">
      <div class="d-flex align-items-center">
        <div class="filter-sidebar">
          <div class="container-fluid d-flex justify-content-between">
            <button class="filter-title">
              <span>
                <Icon name="mage:filter" />
                Filters
              </span>
            </button>
            <button
              aria-label="Hide filter tab"
              class="hide-filter"
            >
              <Icon name="material-symbols:close-rounded" />
            </button>
          </div>
        </div>
        <div class="filter-tabs">
          <div class="tabs">
            <ul
              role="tablist"
              class="tablist d-flex"
            >
              <li class="tablist__item">
                <NuxtLink :to="getLinkWithQueryParams('/')">
                  All Assets
                </NuxtLink>
              </li>
              <li class="tablist__item">
                <NuxtLink :to="getLinkWithQueryParams('/3d-illustrations')">
                  3D Illustrations
                </NuxtLink>
              </li>
              <li class="tablist__item">
                <NuxtLink :to="getLinkWithQueryParams('/animations')">
                  Lottie Animations
                </NuxtLink>
              </li>
              <li class="tablist__item">
                <NuxtLink :to="getLinkWithQueryParams('/illustrations')">
                  Illustrations
                </NuxtLink>
              </li>
              <li class="tablist__item">
                <NuxtLink :to="getLinkWithQueryParams('/icons')">
                  Icons
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filter {
  background-color: $bg-grey-2;
  position: sticky;
  top: 8.725rem;
  z-index: 3;

  &-title {
    background-color: transparent;
    border: none;
    font-weight: 600;
    padding: 0.75rem 0;

    svg {
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }
  }

  .hide-filter {
    background-color: transparent;
    border: none;
  }

  &-sidebar {
    max-width: 16.25rem;
    border-right: 1px solid $bg-grey-1;
    border-bottom: 1px solid $bg-grey-1;
    margin-right: 1.5rem;
    flex-grow: 1;
  }

  &.is-video {
    border-bottom: 1px solid $bg-grey-1;

    .filter-sidebar {
      border-bottom: none;
    }
  }

  .tablist {
    list-style-type: none;
    padding: 0;
    margin-bottom: 0;

    &__item {
      font-weight: 600;

      a {
        color: $text-blue;
        padding-bottom: 0.825rem;

        &.router-link-active {
          color: $black;
          border-bottom: 2px solid $black;
        }
      }

      &:not(:last-child) {
        margin-right: 1.5rem;
      }
    }
  }

  @media screen and (min-width: 1280px) {
    top: 5rem;
  }
}
</style>
