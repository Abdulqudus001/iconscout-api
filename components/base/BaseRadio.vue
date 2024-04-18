<script setup>
import { useAttrs } from 'vue'
const radioModel = defineModel();
const id = computed(() => {
  const attrs = useAttrs()
  return attrs.id ? `input-${attrs.name}-${attrs.id}` : `input-${attrs.name}-${attrs.value.toLowerCase()}`
})
</script>
<template>
  <div class="radio">
    <input
      v-bind="$attrs"
      :id="id"
      type="radio"
      v-model="radioModel"
    >
    <label :for="id">
      <template v-if="$slots.default">
        <slot />
      </template>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.radio {
  position: relative;
  
  label {
    cursor: pointer;
    padding-left: 1.5rem;

    &:before {
      position: absolute;
      top: .25rem;
      left: 0;
      display: block;
      width: 1rem;
      height: 1rem;
      content: '';
      border: 1px solid #8F95B3;
      border-radius: 50%;
    }

    &:after {
      position: absolute;
      top: 0.5rem;
      left: 0.25rem;
      display: block;
      width: 0.5rem;
      height: 0.5rem;
      content: '';
      border-radius: 50%;
      background-color: transparent;
      transition: 0.25s background-color;
    }
  }

  input {
    position: absolute;
    z-index: -1;
    width: 1px;
    height: 1px;

    &:checked {
      & + label {
        &:before {
          border-color: $primary;
          color: $primary;
        }

        &:after {
          background-color: $primary;
        }
      }
    }
  }
}
</style>