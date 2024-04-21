<script setup>
import { onClickOutside } from '@vueuse/core';

const props = defineProps({
  selectItems: {
    type: Array,
    required: true,
  },
});

const selectItem = defineModel({
  type: String,
});

const isSelectVisible = ref(false);
const currentActiveIndex = ref(0);
const select = ref(null);

const toggleSelect = async () => {
  isSelectVisible.value = !isSelectVisible.value;
  // Move focus too select items
  await nextTick();
  focusOnSelectOption();
};

// Handling a11y for the select
const selectOptions = ref([]);
const focusOnSelectOption = () => {
  if (isSelectVisible.value) {
    const currentEl = selectOptions.value[currentActiveIndex.value];
    currentEl.querySelector('button').focus();
  }
};

const selectItemClicked = (item) => {
  selectItem.value = item;
  isSelectVisible.value = false;
};

const moveFocusDown = () => {
  currentActiveIndex.value = (currentActiveIndex.value + 1) % selectOptions.value.length;
  focusOnSelectOption();
};

const moveFocusUp = () => {
  currentActiveIndex.value = (currentActiveIndex.value - 1 + selectOptions.value.length) % selectOptions.value.length;
  focusOnSelectOption();
};

onClickOutside(select, () => isSelectVisible.value = false);

const handleKeyPress = (event) => {
  const { key } = event;
  switch (key) {
    case 'ArrowDown':
      moveFocusDown();
      break;
    case 'ArrowUp':
      moveFocusUp();
      break;
    case 'Enter':
    case ' ':
      isSelectVisible.value = false;
      currentActiveIndex.value = 0;
  }
};
</script>

<template>
  <div
    ref="select"
    class="select"
  >
    <button
      class="select-toggle"
      type="button"
      :aria-expanded="isSelectVisible"
      aria-controls="select-items"
      @click="toggleSelect"
    >
      <slot name="select-toggle">
        <div class="d-flex align-items-center">
          <p class="select-toggle-title">
            {{ selectItem }}
          </p>
          <Icon name="ic:baseline-keyboard-arrow-down" />
        </div>
      </slot>
    </button>
    <Transition>
      <ul
        v-if="isSelectVisible"
        id="select-items"
        role="listbox"
        class="select-list"
        aria-labelledby="dropdownMenuButton1"
        @keydown="handleKeyPress"
      >
        <li
          v-for="(item, index) in selectItems"
          :key="index"
          ref="selectOptions"
          class="select-list__item"
          role="option"
        >
          <slot name="selectItem">
            <button @click="selectItemClicked(item)">
              {{ item }}
            </button>
          </slot>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
/* Transtion component animation */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.select {
  position: relative;

  .select-toggle {
    border: none;
    background: transparent;

    .select-toggle-title {
      color: $text-black;
      margin-bottom: 0;
      font-weight: 700;
    }

    svg {
      color: $bg-grey-5;
    }
  }

  .select-list {
    position: absolute;
    padding: 0.375rem;
    list-style-type: none;
    background-color: $white;
    border-radius: 0.5rem;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
    top: calc(100% + 1.5rem);

    &__item {
      &:not(:last-child) {
        margin-bottom: 0.5rem;
      }

      button {
        border: none;
        background-color: transparent;
        width: 100%;
        text-align: left;
        padding: 0.25rem 0.75rem;
        border-radius: 5px;
        transition: background-color 0.2s ease;

        &:hover,
        &:focus {
          background-color: $primary;
          color: $white;
        }
      }
    }
  }
}
</style>
