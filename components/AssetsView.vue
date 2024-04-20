<script setup>
import { useAssetStore } from '~/store/assets';
const assetStore = useAssetStore()
const { assetList, loadingAssets, loadingType } = storeToRefs(assetStore);

const { downloadAsset } = assetStore;

const assetClasses = computed(() => {
  return loadingType.value === 'icon' ? ['assets', 'assets--icon'] : ['assets'];
});

const skeletonLoaderCount = computed(() => {
  return loadingType.value === 'icon' ? 100 : 20;
});

const downloadFormats = [
  {
    title: 'SVG',
    format: 'svg'
  },
  {
    title: 'PNG',
    format: 'png'
  },
  {
    title: 'JPEG',
    format: 'jpg'
  },
]

const selectedAsset = ref(null);
const showModal = ref(false);

const openFileFormatModal = (asset) => {
  selectedAsset.value = asset
  showModal.value = true
}


const downloadingAsset = ref(false)
const downloadingAssetError = ref(false)
const downloadWithFileFormat = async (format) => {
  if (downloadingAsset.value) {
    return
  }
  downloadingAsset.value = true
  downloadingAssetError.value = false
  try {
    const data = await downloadAsset(
      selectedAsset.value.uuid,
      selectedAsset.value.asset === 'lottie',
      format
    )
  
    // Handle download after data is returned
    const url = data.response.download.download_url
    const link = document.createElement('a');
    link.href = url;
    link.download = url
    link.click();
  } catch(err) {
    downloadingAssetError.value = true
  } finally {
    downloadingAsset.value = false
  }
}
</script>

<template>
  <div :class="assetClasses">
    <template v-if="showModal">
      <BaseModal v-model="showModal">
        <template #title>
          <p class="mb-0 fw-bold">
            Download {{ selectedAsset.name.toLowerCase() }}
          </p>
        </template>
        <template #default>
          <div class="download-formats">
            <div class="container-fluid">
              <p v-if="downloadingAssetError" class="text-secondary fw-bold text-center">
                Something went wrong, please try again
              </p>
              <div v-for="format in downloadFormats" :key="format.format" class="format d-flex justify-content-between align-items-center">
                <p class="mb-0">{{ format.title }}</p>
                <button
                  class="download btn btn-primary"
                  @click="downloadWithFileFormat(format.format)"
                  :disabled="downloadingAsset"
                >
                  <Icon v-if="downloadingAsset" name="svg-spinners:270-ring" />
                  <Icon v-else name="material-symbols:download" />
                </button>
              </div>
            </div>
          </div>
        </template>
      </BaseModal>
    </template>
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
        :title="asset.name"
        :key="asset.uuid"
        class="asset"
        :class="{ 'asset--video': loadingType === 'lottie' }"
      >
        <template v-if="loadingType === 'icon'">
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
                v-if="loadingType !== 'lottie'"
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
        <button class="asset-download" :title="`Download ${asset.name} asset`" @click="openFileFormatModal(asset)">
          <span class="visually-hidden">Download {{ asset.name }} asset</span>
          <Icon name="iconoir:download" />
        </button>
      </article>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.download-formats {
  .format {

    &:not(:last-child) {
      border-bottom: 1px solid $bg-grey-1;
      padding-bottom: 0.75rem;
      margin: 0.75rem 0;
    }
    

    .download {
      width: 3rem;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.75rem;
      padding: 0;
    }
  }
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

    &-download {
      position: absolute;
      bottom: 12px;
      right: 12px;
      border-radius: 6px;
      width: 36px;
      height: 36px;
      background-color: $bg-grey-7;
      border: none;
      z-index: 2;
      pointer-events: none;
      opacity: 0;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $text-light;
      font-weight: 700;
      transition: opacity .2s ease-out;
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

      .asset-download {
        pointer-events: all;
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
</style>