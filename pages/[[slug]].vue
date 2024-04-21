<script setup>
import { useElementBounding } from '@vueuse/core';
import { useAssetStore } from '~/store/assets';

const { assetType, price, sortBy, search } = useFilter();

const assetStore = useAssetStore();
const { assetList, loadingAssets, loadingAssetStatus, loadingType, assetPageTitle, showAssetReverseSearch } = storeToRefs(assetStore);
const { fetchAssets } = assetStore;

const page = ref(1);

await fetchAssets(search, assetType, price, sortBy, page, true);

const assetsContainer = ref(null);

const { bottom } = useElementBounding(assetsContainer);

watch(bottom, () => {
  if (Math.abs(bottom.value - window.innerHeight) < 200 && !loadingAssets.value && page.value < 3) {
    page.value += 1;
  }
});

watch([price, sortBy, search], () => {
  page.value = 1;
  fetchAssets(search, assetType, price, sortBy, page, true);
});

watch(page, () => {
  fetchAssets(search, assetType, price, sortBy, page);
});
</script>

<template>
  <main>
    <Head>
      <Title>{{ assetPageTitle }}</Title>
    </Head>
    <AssetTitle :title="assetPageTitle" />
    <AssetFilter class="d-none d-lg-block" />
    <ReverseSearch v-if="showAssetReverseSearch" />
    <div class="main d-flex">
      <AssetFilterSidebar class="d-none d-lg-block" />
      <div
        class="w-100"
        :class="{ 'is-video': loadingType === 'lottie' }"
      >
        <div
          ref="assetsContainer"
          class="container-fluid pb-5 position-relative"
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
            <div v-if="page >= 3 && !loadingAssets" class="signup-noti">
              <p class="title">
                Create an account to view {{ assetPageTitle }}
              </p>
              <button class="btn btn-primary">Get started - It's Free</button>
              <p>
                Already have an account?
                <a href="#">Log in</a>
              </p>
            </div>
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

.signup-noti {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  background: linear-gradient(180deg, rgba($white, 0) 0%, rgba($white, 0.9) 21.98%, rgba($white, 0.99) 100%);
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 1;

  .title {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .btn {
    margin: 1.25rem 0 0.75rem;
    height: 54px;
  }

  a {
    color: $text-blue;
    font-weight: 600;
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
