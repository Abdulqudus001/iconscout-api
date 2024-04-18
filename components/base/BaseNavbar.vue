<script setup>
import { onClickOutside } from '@vueuse/core';

const header = ref(null);
const dropdown = ref(null);

onClickOutside(dropdown, () => hideAllDropdowns());

const hideAllDropdowns = () => {
  document.querySelectorAll('.dropdown-container').forEach((el) => {
    el.classList.remove('dropdown-container__visible');
  });
};

const showNavDropdown = (navItem) => {
  header.value.classList.add('show-dropdown');
  const dropdown = document.querySelector(`[data-dropdown=${navItem}]`);
  const dropdownTarget = document.querySelector(`[data-target=${navItem}]`);

  hideAllDropdowns();

  dropdown.classList.add('dropdown-container__visible');

  const { width } = dropdown.getBoundingClientRect();
  const transformLeft = dropdownTarget.offsetLeft - (width / 2);
  dropdown.style.transform = `translateX(${transformLeft}px)`;
};
</script>

<template>
  <header
    ref="header"
    class="sticky-header position-relative"
  >
    <nav class="nav">
      <ul class="nav-menu d-flex align-items-center my-0 w-100">
        <li class="nav-item nav-item-home">
          <NuxtLink
            to="/"
            class="nav__logo"
          >
            <img
              src="~assets/images/logo.svg"
              alt="Icon scout home"
              width="192"
            >
          </NuxtLink>
        </li>
        <li class="nav-item nav-item-search d-none">
          <BaseSearch />
        </li>
        <li class="d-none d-lg-block">
          <button
            class="nav-btn has-menu"
            data-target="explore"
            @click="showNavDropdown('explore')"
          >
            Explore
            <Icon name="material-symbols:keyboard-arrow-down-rounded" />
          </button>
          <button
            class="nav-btn has-menu"
            data-target="tools"
            @click="showNavDropdown('tools')"
          >
            Tools
            <Icon name="material-symbols:keyboard-arrow-down-rounded" />
          </button>
          <button class="nav-btn">
            All Features
          </button>
          <button class="nav-btn">
            <img
              src="~assets/icons/gift.svg"
              alt=""
            >
            Free Asset
          </button>
          <button
            class="nav-btn has-menu"
            data-target="learn"
            @click="showNavDropdown('learn')"
          >
            Learn
            <Icon name="material-symbols:keyboard-arrow-down-rounded" />
          </button>
        </li>
        <div class="ms-auto d-flex">
          <button class="btn btn-outline-dark btn-rounded me-3 d-none d-md-block">
            Login
          </button>
          <button class="signup btn btn-primary btn-rounded">
            <span class="d-md-none lh-1">
              <Icon name="streamline:interface-login-circle-arrow-enter-left-login-point-circle" />
            </span>
            <span class="d-none d-md-block">
              Signup
            </span>
          </button>
        </div>
      </ul>
      <BaseSearch class="mobile-search" />
    </nav>
    <div
      ref="dropdown"
      class="dropdown"
    >
      <div
        data-dropdown="explore"
        class="dropdown-container"
      >
        This would be for Explore
      </div>
      <div
        data-dropdown="tools"
        class="dropdown-container"
      >
        This would be for tools
      </div>
      <div
        data-dropdown="learn"
        class="dropdown-container"
      >
        This would be for learn
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: $white;
}

.nav {
  box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.08);
  padding: 1rem 1.5rem;

  .nav-menu {
    list-style-type: none;
    padding: 0;
  }

  .nav-item {
    color: $text-black;
    font-weight: 600;

    &.nav-item-search {
      margin-left: 1.75rem;
      margin-right: 1.75rem;
      flex: 1;
    }

    &.nav-item-home {
      margin-right: 1.75rem;
    }
  }

  .nav-btn {
    color: $text-black;
    margin-right: 1rem;
    font-weight: 600;
    border: none;
    background: none;

    &:hover {
      color: $text-blue;
    }

    &.has-menu {
      outline: none;

      &:focus {
        color: $text-blue;
      }
    }
  }

  &__logo {
    img {
      width: 200px
    }
  }

  .mobile-search {
    margin-top: 1rem;
    width: 100%;
  }

  .signup {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      font-size: 1.125rem;
    }
  }

  @media screen and (min-width: 768px) {
    .signup {
      width: unset;
      height: unset;
      border-radius: 50px;
    }
  }

  @media screen and (min-width: 1280px) {
    .nav-item-menu {
      margin-right: 0;
    }

    .mobile-search {
      display: none;
    }

    .nav-item {
      &.nav-item-search {
        display: block;
        margin-left: 0.75rem;
        margin-right: 0.75rem;
        max-width: 400px;
      }
  
      &.nav-item-home {
        margin-right: 0.75rem;
      }
    }
  }
}

.dropdown {
  &-container {
    position: absolute;
    z-index: 5;
    background-color: $white;
    box-shadow: 0px 6px 12px -4px rgba(0,0,0,0.08), 0px 20px 24px -4px rgba(0,0,0,0.12);
    border-radius: 0 0 12px 12px;
    width: 1000px;
    height: 500px;
    opacity: 0;
    pointer-events: none;
    will-change: transform;
    transform: translateX(-100%);

    &__visible {
      opacity: 1;
      pointer-events: all;
      transition: transform, opacity .5s ease;
    }
  }
}
</style>
