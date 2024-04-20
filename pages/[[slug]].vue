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

const assetClasses = computed(() => {
  return loadingType.value === 'icon' ? ['assets', 'assets--icon'] : ['assets'];
});

const skeletonLoaderCount = computed(() => {
  return loadingType.value === 'icon' ? 100 : 20;
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
        :class="{ 'is-video': assetType === 'lottie' }"
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
            <div :class="assetClasses">
              <template v-if="loadingAssets && assetList.length < 1">
                <div
                  v-for="i in skeletonLoaderCount"
                  :key="i"
                  class="asset--loading"
                />
              </template>
              <template v-else>
                <article
                  v-for="asset in assetList"
                  :key="asset.uuid"
                  class="asset"
                  :class="{ 'asset--video': assetType === 'lottie' }"
                >
                  <template v-if="assetType === 'icon'">
                    <div class="asset-link">
                      <div class="asset-img">
                        <img
                          loading="lazy"
                          :src="asset.urls.png_128"
                          :alt="asset.slug"
                        >
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="asset-link">
                      <div class="asset-img">
                        <img
                          v-if="assetType !== 'lottie'"
                          loading="lazy"
                          :src="asset.urls.thumb"
                          :alt="asset.slug"
                        >
                        <video
                          v-else
                          muted
                          :src="asset.urls.thumb"
                          autoplay
                          loop
                        />
                      </div>
                    </div>
                  </template>
                </article>
              </template>
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

.spinner {
  font-size: 4rem;
  color: $primary
}

.assets {
  margin-top: 1.125rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.75rem;
  position: relative;

  .asset {
    width: 100%;
    height: 210px;
    border-radius: 8px;
    background-color: $bg-grey-2;
    position: relative;
    overflow: hidden;
    display: block;

    &--video {
      background-color: $white;
    }

    &-link {
      padding: 0.5rem 0.75rem;
      display: flex;
      position: relative;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    &-img {
      display: flex;
      overflow: hidden;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;

      img,
      video {
        transition: transform .2s ease;
        max-width: 100%;
        max-height: 100%;
      }
    }

    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 8px;
      background-color: rgba($text-black, 0.1);
      content: '';
      opacity: 0;
      z-index: 1;
      transition: opacity .2s ease-out;
    }

    &:hover {
      img,
      video {
        transform: scale(1.1);
      }

      &::before {
        opacity: 1;
      }
    }
  }

  .asset--loading {
    width: 100%;
    height: 210px;
    border-radius: 8px;
    position: relative;
    background-color: $bg-grey-6;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      transform: translateX(-100%);
      background-image: linear-gradient(
        90deg,
        rgba($bg-grey-1, 0) 0,
        rgba($bg-grey-1, 0.5) 60%,
        rgba($bg-grey-1, 0) 0
      );
      background-size: 100px auto;
      background-repeat: no-repeat;
      animation: shimmer 5s infinite;
    }
  }

  &--icon {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));

    .asset {
      height: 120px;

      img {
        width: 56px;
      }
    }

    .asset--loading {
      height: 120px;
    }
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

    &--icon {
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));

      .asset {
        height: 120px;

        img {
          width: 70px;
        }
      }

      .asset--loading {
        height: 140px;
      }
    }
  }
}

.is-video {
  background-color: $bg-grey-2;
  width: 100%;
}
</style>
