<script setup>
import { useElementBounding } from '@vueuse/core';
import { useAssetStore } from '~/store/assets';

const { assetType, price, sortBy } = useFilter();

const assetStore = useAssetStore();
const { assetList, loadingAssets, loadingAssetStatus, loadingType, title } = storeToRefs(assetStore);
const { fetchAssets } = assetStore;

const page = ref(1);

await fetchAssets(assetType, price, sortBy, page, true);

const assetsContainer = ref(null);

const { bottom } = useElementBounding(assetsContainer);

watch(bottom, () => {
  if (Math.abs(bottom.value - window.innerHeight) < 200 && !loadingAssets.value) {
    page.value += 1;
  }
});

watch([price, sortBy], () => {
  page.value = 1;
  fetchAssets(assetType, price, sortBy, page, true);
});

watch(page, () => {
  fetchAssets(assetType, price, sortBy, page);
});

</script>

<template>
  <main>
    <Head>
      <Title>{{ title }}</Title>
    </Head>
    <AssetTitle :title="title" />
    <AssetFilter class="d-none d-lg-block" />
    <div class="main d-flex">
      <AssetFilterSidebar class="d-none d-lg-block" />
      <div
        class="w-100"
        :class="{ 'is-video': loadingType === 'lottie' }"
      >
        <div
          ref="assetsContainer"
          class="container-fluid pb-5"
        >
          <template v-if="loadingAssetStatus === 'error'">
            <div class="error-noti">
              <img
                src="~assets/icons/error.svg"
                alt=""
              >
              <p>
                Something went wrong. It's not you, it's us. Please refresh the page
              </p>
            </div>
          </template>
          <template v-else>
            <AssetsView />
          </template>
          <div
            v-if="loadingAssets && assetList.length > 1"
            class="spinner text-center"
          >
            <Icon name="svg-spinners:270-ring" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.error-noti {
  max-width: 500px;
  margin: auto;
  padding-top: 100px;
  color: $secondary;
  font-weight: 600;
  text-align: center;

  img {
    max-width: 200px;
  }

  p {
    font-size: 1.5rem;
    margin-top: 1rem;
  }
}

.spinner {
  font-size: 4rem;
  color: $primary
}

.is-video {
  background-color: $bg-grey-2;
  width: 100%;
}
</style>
