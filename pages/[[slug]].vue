<script setup>
const { assetType, price, sortBy } = useFilter()

const { data, status, pending } = await useLazyFetch('https://api.iconscout.com/v3/search', {
  query: {
    assetType,
    price,
    sort: sortBy
  },
  headers: {
    'Client-ID': '214567553662354'
  },
})

const assets = computed(() => {
  return data.value?.response?.items?.data
})

</script>

<template>
  <main>
    <AssetFilter class="d-none d-lg-block" />
    <div class="main d-flex">
      <AssetFilterSidebar class="d-none d-lg-block" />
      <div class="container-fluid">
        <div
          class="assets"
          :class="{'assets--icon': assetType === 'icon'}"
        >
          <template v-if="pending">
            <div
              v-for="i in 20"
              :key="i"
              class="asset--loading"
            ></div>
          </template>
          <template v-else>
            <article
              v-for="asset in assets"
              :key="asset.uuid"
              class="asset"
            >
              <template v-if="assetType === 'icon'">
                <a href="/sample url" class="asset-link">
                  <div class="asset-img">
                    <img
                      loading="lazy"
                      :src="asset.urls.png_128"
                      :alt="asset.slug"
                    >
                  </div>
                </a>
              </template>
              <template v-else>
                <a href="/sample url" class="asset-link">
                  <div class="asset-img">
                    <img
                      loading="lazy"
                      :src="asset.urls.thumb"
                      :alt="asset.slug"
                    >
                  </div>
                </a>
              </template>
            </article>
          </template>
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

      img {
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
      transition: opacity .2s ease-out;
    }

    &:hover {
      img {
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
</style>