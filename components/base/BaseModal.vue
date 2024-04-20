<script setup>
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { onClickOutside } from '@vueuse/core';


const icModal = ref(null);
const modalContainer = ref(null);

onClickOutside(modalContainer, () => showModal.value = false);

const { hasFocus } = useFocusTrap(icModal, { immediate: true })

const showModal = defineModel({
  type: Boolean
})
</script>
<template>
  <Teleport to="body">
    <div v-if="showModal" class="ic-modal" ref="icModal">
      <div class="ic-modal__backdrop"></div>
      <div class="modal-container" ref="modalContainer">
        <div class="ic-modal__header">
          <div class="container-fluid d-flex justify-content-between align-items-center">
            <div class="ic-modal__title">
              <slot name="title" />
            </div>
            <button class="ic-modal__close" @click="showModal = false">
              <span class="visually-hidden">Close Modal</span>
              <Icon name="material-symbols:close-rounded" />
            </button>
          </div>
        </div>
        <div class="ic-modal__body">
          <slot>
            This is the modal container
            {{ hasFocus}}
          </slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.ic-modal {
  z-index: 1000;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &__backdrop {
    position: absolute;
    background-color: rgba($black, 0.7);
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }

  &__header {
    padding-bottom: 1.5rem;
    border-bottom: 1px solid $bg-grey-1;
  }

  .modal-container {
    background-color: $white;
    min-width: 400px;
    min-height: 200px;
    z-index: 1001;
    border-radius: 12px;
    box-shadow: 0px 4px 8px 0px rgba($black, 0.04);
    padding: 1.5rem 0;
  }

  &__close {
    background-color: transparent;
    border: none
  }
}
</style>