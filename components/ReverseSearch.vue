<script setup>
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { useAssetStore } from '~/store/assets';
const assetStore = useAssetStore();

const { showAssetReverseSearch } = storeToRefs(assetStore);

const { loadImage, image, showResizeContainer } = useReverseSearch()

const cropper = ref(null)

const downloadedCroppedImage = ref(false)

const downloadCroppedImage = () => {
  downloadedCroppedImage.value = false

  const { canvas } = cropper.value.getResult()

  const link = document.createElement('a');
  link.href = canvas.toDataURL();
  link.download = 'cropped_img'
  link.click();

  downloadedCroppedImage.value = true
}

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
        <div v-if="showResizeContainer" ref="loadedImg" class="loaded-img">
          <div class="loaded-img-wrapper">
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
                }
              }"
            />
          </div>
          <div class="controls d-flex justify-content-center">
            <button class="btn btn-primary" @click="downloadCroppedImage">
              Download cropped image
            </button>
            <button class="btn btn-seccondary">
              Upload another image
            </button>
          </div>
        </div>
        <div v-else class="reverse-search">
          <div class="reverse-search-content text-center">
            <img src="~assets/icons/reverse-search-picture.svg" alt="" class="reverse-search-img">
            <div class="reverse-search-title">
              Drag & drop an image or <br>
              <button>upload an image</button>
            </div>
            <input type="file" name="" id="" @change="loadImage">
          </div>
        </div>
        <div class="reverse-search-examples"></div>
      </div>
    </template>
  </BaseModal>
</template>

<style lang="scss" scoped>
.loaded-img {
  max-width: 100%;
  max-height: 100%;
  position: relative;

  &-wrapper {
    position: relative;
    width: 650px;
    height: 400px;
  }

  .upload-example-cropper {
    width: 100%;
    height: 100%;
  }

  .controls {
    gap: 1rem;
    margin: 1.5rem 0 1rem;
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

.reverse-search-container {
  margin-top: 0.75rem;
}

.reverse-search {
  border-radius: 8px;
  background-color: $bg-grey-2;
  border: 1px dashed $bg-grey-3;

  width: 650px;
  max-width: 100%;
  margin: 0.75rem 0;
  padding: 2.75rem 0;

  &-content {
    max-width: 320px;
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
}
</style>