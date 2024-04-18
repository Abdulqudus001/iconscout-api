<script setup>
const assetFilterDropdown = reactive({
  assetType: true,
  sortBy: true,
  price: true,
  view: true,
})

const assetFilter = reactive({
  assetType: 'all',
  sortBy: 'featured',
  price: 'free',
  view: 'individual'
})
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
          <BaseRadio name="assetType" value="3d" v-model="assetFilter.assetType">
            3D Illustrations
          </BaseRadio>
          <BaseRadio name="assetType" value="animations" v-model="assetFilter.assetType">
            Lottie Animations
          </BaseRadio>
          <BaseRadio name="assetType" value="illustations" v-model="assetFilter.assetType">
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
          <BaseRadio name="sortBy" value="featured" v-model="assetFilter.sortBy">
            Featured
          </BaseRadio>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  max-width: 16.25rem;
  flex-grow: 1;
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