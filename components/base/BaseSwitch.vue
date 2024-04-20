<script setup>
const checkedModel = defineModel({
  type: Boolean,
});
</script>

<template>
  <div class="switch">
    <input
      :id="`input-${$attrs.name}-${$attrs.id}`"
      v-model="checkedModel"
      type="checkbox"
    >
    <label :for="`input-${$attrs.name}-${$attrs.id}`">
      <template v-if="$slots.label">
        <slot name="label" />
      </template>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.switch {
  label {
    display: block;
    position: relative;
    margin: 0;
    cursor: pointer;

    &:before {
      display: block;
      content: '';
      width: 2.25rem;
      height: 1.25rem;
      background: $bg-grey-4;
      border-radius: 15px;
      border: none;
      margin: 0;
      transition: 0.25s background;
    }

    &:after {
      content: '';
      display: block;
      width: 1rem;
      height: 1rem;
      border-radius: 15px;
      position: absolute;
      top: 2px;
      left: 2px;
      box-shadow: 0 0 8px $bg-grey-5;
      background: $white;
      transition: 0.22s margin-left;
    }
  }

  input[type="checkbox"] {
    position: absolute;
    z-index: -1;
    width: 1px;
    height: 1px;

    &:checked {
      & + label {
        &:after {
          background: $white;
          margin-left: calc(100% - 1.25rem);
        }

        &:before {
          background: $tertiary;
        }
      }
    }
  }
}
</style>
