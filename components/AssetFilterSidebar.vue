<script setup>
const assetFilterDropdown = reactive({
  assetType: true,
  sortBy: true,
  price: true,
  view: false,
})

const assetFilter = reactive({
  assetType: 'all',
  sortBy: 'relevant',
  price: 'free',
  view: 'individual'
})

const { changePriceType, changeSortType } = useFilter()
const route = useRoute()

watch(() => assetFilter.assetType, (asset) => {
  const assetType = asset === 'all' ? '' : asset
  navigateTo({
    path: `/${assetType}`,
    query: route.query
  })
})

watch(() => assetFilter.price, (price) => {
  // changePriceType(price)
  navigateTo({
    path: route.fullPath,
    query: {
      ...route.query,
      price,
    }
  })
})

watch(() => assetFilter.sortBy, (sortBy) => {
  // changeSortType(sortBy)
  navigateTo({
    path: route.fullPath,
    query: {
      ...route.query,
      sort: sortBy,
    }
  })
})

// Change reactive obj based on route
if (route.params.slug) {
  assetFilter.assetType = route.params.slug
}

if (route.query.price) {
  // changePriceType(route.query.price)
  assetFilter.price = route.query.price
}

if (route.query.sort) {
  // changeSortType(route.query.sort)
  assetFilter.sortBy = route.query.sort
}

const isExclusiveChecked = ref(false);
</script>

<template>
  <div class="sidebar">
    <div class="exclusive-toggle">
      <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center">
          <p id="exlusive-toggle">Iconscout Exclusive</p>
          <BaseSwitch id="exclusive" aria-labelledby="exlusive-toggle" v-model="isExclusiveChecked" />
        </div>
      </div>
    </div>
    <div class="filter asset-filter">
      <button
        class="filter-header container-fluid d-flex justify-content-between align-items-center"
        @click="assetFilterDropdown.assetType = !assetFilterDropdown.assetType"
      >
        Asset Type
        <Icon
          name="ic:round-keyboard-arrow-down"
          :class="{ 'rotate-180': assetFilterDropdown.assetType }"
        />
      </button>
      <Transition name="drop">
        <div v-if="assetFilterDropdown.assetType" class="filter-content container-fluid">
          <BaseRadio name="assetType" value="all" v-model="assetFilter.assetType">
            All asset
          </BaseRadio>
          <BaseRadio name="assetType" value="3d-illustrations" v-model="assetFilter.assetType">
            3D Illustrations
          </BaseRadio>
          <BaseRadio name="assetType" value="animations" v-model="assetFilter.assetType">
            Lottie Animations
          </BaseRadio>
          <BaseRadio name="assetType" value="illustrations" v-model="assetFilter.assetType">
            Illustrations
          </BaseRadio>
          <BaseRadio name="assetType" value="icons" v-model="assetFilter.assetType">
            Icons
          </BaseRadio>
        </div>
      </Transition>
    </div>
    <div class="filter asset-filter">
      <button
        class="filter-header container-fluid d-flex justify-content-between align-items-center"
        @click="assetFilterDropdown.price = !assetFilterDropdown.price"
      >
        Price
        <Icon
          name="ic:round-keyboard-arrow-down"
          :class="{ 'rotate-180': assetFilterDropdown.price }"
        />
      </button>
      <Transition name="drop">
        <div v-if="assetFilterDropdown.price" class="filter-content container-fluid">
          <BaseRadio name="price" value="free" v-model="assetFilter.price">
            Free
          </BaseRadio>
          <BaseRadio name="price" value="premium" v-model="assetFilter.price">
            Premium
          </BaseRadio>
          <BaseRadio name="price" value="all" v-model="assetFilter.price">
            All
          </BaseRadio>
        </div>
      </Transition>
    </div>
    <div class="filter asset-filter">
      <button
        class="filter-header container-fluid d-flex justify-content-between align-items-center"
        @click="assetFilterDropdown.view = !assetFilterDropdown.view"
      >
        View
        <Icon
          name="ic:round-keyboard-arrow-down"
          :class="{ 'rotate-180': assetFilterDropdown.view }"
        />
      </button>
      <Transition name="drop">
        <div v-if="assetFilterDropdown.view" class="filter-content container-fluid">
          <BaseRadio name="view" value="pack" v-model="assetFilter.view">
            Pack
          </BaseRadio>
          <BaseRadio name="view" value="individual" v-model="assetFilter.view">
            Individual
          </BaseRadio>
        </div>
      </Transition>
    </div>
    <div class="filter asset-filter">
      <button
        class="filter-header container-fluid d-flex justify-content-between align-items-center"
        @click="assetFilterDropdown.sortBy = !assetFilterDropdown.sortBy"
      >
        Sort By
        <Icon
          name="ic:round-keyboard-arrow-down"
          :class="{ 'rotate-180': assetFilterDropdown.sortBy }"
        />
      </button>
      <Transition name="drop">
        <div v-if="assetFilterDropdown.sortBy" class="filter-content container-fluid">
          <BaseRadio name="sortBy" value="popular" v-model="assetFilter.sortBy">
            Popular
          </BaseRadio>
          <BaseRadio name="sortBy" value="latest" v-model="assetFilter.sortBy">
            Latest
          </BaseRadio>
          <BaseRadio name="sortBy" value="relevant" v-model="assetFilter.sortBy">
            Relevant
          </BaseRadio>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 16.25rem;
  flex-shrink: 0;
  border-right: 1px solid $bg-grey-1;
  overflow-y: auto;
  position: sticky;
  top: 7.725rem;
  height: calc(100vh - 18.75rem);

  &::-webkit-scrollbar {
    width: 0;
  }

  .exclusive-toggle {
    padding: 1.375rem 0;
    border-bottom: 1px solid $bg-grey-1;
    p {
      color: $text-dark;
      font-weight: 600;
      font-size: 0.875rem;
      margin-bottom: 0;
    }
  }

  .filter {
    border-bottom: 1px solid $bg-grey-1;
    padding-top: 1.375rem;
    padding-bottom: 1.375rem;
    
    &-header {
      width: 100%;
      background-color: transparent;
      border: none;
      color: $text-dark;
      font-weight: 600;
      font-size: 0.875rem;

      svg {
        font-size: 1.5rem;
        color: $bg-grey-5;
      }
    }

    &-content {
      margin-top: 1.375rem;

      .radio:not(:last-child) {
        margin-bottom: 0.75rem;
      }
    }
  }
}

.drop-enter-active,
.drop-leave-active {
  transition: transform 0.15s ease-out, opacity .1s ease-out;
}

.drop-enter-from,
.drop-leave-to {
  transform: translateY(-50%);
  opacity: 0;
}
</style>