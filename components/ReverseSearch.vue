<script setup>
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { useAssetStore } from '~/store/assets';

import sampleImg1 from '~/assets/images/sample-img1.svg';
import sampleImg2 from '~/assets/images/sample-img2.svg';
import sampleImg3 from '~/assets/images/sample-img3.png';
import sampleImg4 from '~/assets/images/sample-img4.svg';

const assetStore = useAssetStore();

const { showAssetReverseSearch } = storeToRefs(assetStore);

const { loadImage, image, showResizeContainer, setImageSource, handleImageLoadingError, loadingImgSourceError } = useReverseSearch();

const cropper = ref(null);

const downloadedCroppedImage = ref(false);

const downloadCroppedImage = () => {
  downloadedCroppedImage.value = false;

  const { canvas } = cropper.value.getResult();

  const link = document.createElement('a');
  link.href = canvas.toDataURL();
  link.download = 'cropped_img';
  link.click();

  downloadedCroppedImage.value = true;
};

const loadingImgSource = ref(false);
const imageUrlModel = ref('');

const handleUrlPasted = (event) => {
  loadingImgSource.value = true;
  const url = event.clipboardData.getData('text');
  setImageSource(url);
};

const imageLoaded = () => {
  imageUrlModel.value = '';
  loadingImgSource.value = false;
};
const sampleImgs = [
  sampleImg1, sampleImg2, sampleImg3, sampleImg4,
];
</script>

<template>
  <BaseModal v-model="showAssetReverseSearch">
    <template #title>
      <p class="mb-0">
        Search visually similar assets
      </p>
    </template>
    <template #default>
      <div class="reverse-search-container">
        <div
          v-if="showResizeContainer"
          ref="loadedImg"
          class="loaded-img"
        >
          <div class="loaded-img-wrapper">
            <div
              v-if="loadingImgSource"
              class="loading-img-container"
            >
              <Icon name="svg-spinners:270-ring" />
            </div>
            <Cropper
              ref="cropper"
              :src="image"
              class="upload-example-cropper"
              :stencil-props="{
                handlers: {
                  eastNorth: true,
                  westNorth: true,
                  westSouth: true,
                  eastSouth: true,
                },
              }"
              @ready="imageLoaded"
              @error="handleImageLoadingError"
            />
          </div>
          <div class="controls text-center">
            <div class="d-flex justify-content-center">
              <button
                class="btn btn-primary"
                @click="downloadCroppedImage"
              >
                Download cropped image
              </button>
              <div class="file-input">
                <input
                  id="file"
                  type="file"
                  class="file"
                  @change="loadImage"
                >
                <label
                  for="file"
                  class="btn btn-outline-dark"
                >
                  Upload another image
                </label>
              </div>
            </div>
            <input
              v-model="imageUrlModel"
              autocomplete="off"
              type="text"
              name="image_url"
              class="image-url my-0"
              placeholder="Paste another url"
              aria-label="Paste another url"
              @paste="handleUrlPasted"
            >
          </div>
        </div>
        <div
          v-else
          class="reverse-search"
        >
          <div class="reverse-search-content text-center">
            <img
              src="~assets/icons/reverse-search-picture.svg"
              alt=""
              class="reverse-search-img"
            >
            <div class="reverse-search-title">
              Drag & drop an image or <br>
              <div class="file-input">
                <input
                  id="file"
                  type="file"
                  class="file"
                  @change="loadImage"
                >
                <label
                  for="file"
                  class="btn btn-text"
                >
                  upload an image
                </label>
              </div>
            </div>
            <input
              v-model="imageUrlModel"
              autocomplete="off"
              type="text"
              name="image_url"
              class="image-url"
              placeholder="Paste image url"
              aria-label="Paste image url"
              @paste="handleUrlPasted"
            >
            <p
              v-if="loadingImgSourceError"
              class="text-secondary"
            >
              Problem loading image, please check the url again
            </p>
            <p class="image-format-guide">
              JPG / PNG,  Max file size: 10 MB, Min dimensions: 500 x 500 px
            </p>
          </div>
        </div>
        <div
          v-if="!showResizeContainer"
          class="sample-imgs"
        >
          <p class="sample-imgs-title">
            Or try one of the examples below
          </p>
          <div class="d-flex justify-content-center">
            <button
              v-for="(sample, index) in sampleImgs"
              :key="sample"
              class="sample-img"
              @click="setImageSource(sample)"
            >
              <img
                :src="sample"
                :alt="`Sample image ${index}`"
              >
            </button>
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<style lang="scss" scoped>
// Styling for custom file input
.file {
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;

  &:focus + label {
    outline: 1px solid #000;
    outline: -webkit-focus-ring-color auto 2px;
  }
}

.file-input {
  label {
    display: block;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &.btn-text {
      background-color: transparent;
      border: none;
      padding: 0;
      color: $text-blue;
      font-weight: 600;
      height: fit-content;
      width: fit-content;
      margin: 0 auto;
    }
  }
}

.loaded-img {
  max-width: 100%;
  max-height: 100%;
  position: relative;

  &-wrapper {
    position: relative;
    width: 650px;
    height: 400px;
    max-width: 100%;
    max-height: 100%;
  }

  .upload-example-cropper {
    width: 100%;
    height: 100%;
  }

  .controls {
    margin: 1.5rem 0 1rem;

    .d-flex {
      gap: 1rem;
      flex-flow: row wrap;
    }
  }

  &:deep(img) {
    // max-height: 100%;
    background-color: $white;
    // opacity: 0.5;
  }

  &:deep(.vue-simple-handler) {
    display: none;
  }

  &:deep(.vue-handler-wrapper) {
    width: 3rem;
    height: 3rem;
    overflow: hidden;
  }

  &:deep(.vue-rectangle-stencil__preview) {
    border: 2px solid $bg-grey-3;
    border-radius: 8px;
  }

  &:deep(.vue-handler-wrapper__draggable) {
    border: 8px solid $bg-grey-3;
    width: 3rem;
    height: 3rem;
    border-radius: 16px;
    position: absolute;
  }

  &:deep(.vue-handler-wrapper--east-north .vue-handler-wrapper__draggable) {
    top: 1.125rem;
    right: 1.125rem;
  }

  &:deep(.vue-handler-wrapper--west-north .vue-handler-wrapper__draggable) {
    top: 1.125rem;
    left: 1.125rem;
  }

  &:deep(.vue-handler-wrapper--west-south .vue-handler-wrapper__draggable) {
    top: -1.125rem;
    left: 1.125rem;
  }

  &:deep(.vue-handler-wrapper--east-south .vue-handler-wrapper__draggable) {
    top: -1.125rem;
    right: 1.125rem;
  }

  &:deep(.vue-line-wrapper) {
    display: none;
  }

  &:deep(.vue-advanced-cropper__background),
  &:deep(.vue-advanced-cropper__foreground) {
    border-radius: 16px;
  }
}

.loading-img-container {
  width: 650px;
  height: 400px;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $black;
  border-radius: 16px;
  font-size: 2.5rem;
  color: $primary;
  position: absolute;
}

.reverse-search-container {
  margin-top: 0.75rem;
}

.image-url {
  border-radius: 4px;
  padding: 0.25rem 0.5rem 0.25rem 1.75rem;
  height: 2rem;
  background-image: url('~/assets/icons/link.svg');
  background-repeat: no-repeat;
  background-position: 0.25rem center;
  width: 300px;
  max-width: 100%;
  border: 1px solid $bg-grey-1;
  margin: 1.25rem auto 1rem;
  font-size: 0.875rem;

  &:focus,
  &:focus-visible {
    outline: none;
    box-shadow: 0px 0px 0px 2px rgba($primary, 0.25);
    border: 1px solid rgba($primary, 0.25);
  }
}

.reverse-search {
  border-radius: 8px;
  background-color: $bg-grey-2;
  border: 1px dashed $bg-grey-3;

  width: 650px;
  max-width: 100%;
  margin: 0.75rem 0;
  padding: 2rem 0;

  &-content {
    max-width: 350px;
    margin: 0 auto;
  }

  &-img {
    width: 44px;
    height: 44px;
    margin-bottom: 1.375rem;
  }

  &-title {
    font-size: 1rem;
    font-weight: 600;

    button {
      background-color: transparent;
      border: none;
      padding: 0;
      color: $text-blue;
      font-weight: 600;
    }
  }

  .image-format-guide {
    color: $text-light-1;
    font-size: 0.75rem;
    margin-bottom: 0;
  }

  @media screen and (min-width: 768px) {
    padding: 3rem 0;
  }
}

.sample-imgs {
  text-align: center;
  margin: 1.25rem auto 1rem;

  &-title {
    font-size: 0.75rem;
  }

  .d-flex {
    gap: 0.625rem;
  }

  .sample-img {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    border: 1px solid $bg-grey-1;
    background-color: transparent;
    transition: border-color .2s ease;

    &:hover {
      border-color: $bg-grey-4;
    }

    img {
      max-width: 80%;
    }
  }
}
</style>
