<script setup>
const showMobileNav = ref(false)

const route = useRoute()
watch(() => route.fullPath, () => {
  showMobileNav.value = false
})
</script>

<template>
  <header
    ref="header"
    class="sticky-header position-relative"
  >
    <div v-if="showMobileNav">
      <div class="mobile-nav-backdrop" @click.self="showMobileNav = false">
        <div class="mobile-nav">
          <AssetFilterSidebar is-nav />
        </div>
      </div>
    </div>
    <nav class="nav">
      <ul class="nav-menu d-flex align-items-center my-0 w-100">
        <li class="mobile-hamburger d-lg-none">
          <button @click="showMobileNav = !showMobileNav">
            <div class="visually-hidden">Toggle Navbar</div>
            <Icon name="icon-park-outline:hamburger-button" />
          </button>
        </li>
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
          >
            Explore
            <Icon name="material-symbols:keyboard-arrow-down-rounded" />
          </button>
          <button
            class="nav-btn has-menu"
            data-target="tools"
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
  </header>
</template>

<style lang="scss" scoped>
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 3;
  background-color: $white;
}

.mobile-nav {
  position: fixed;
  top: 8.5rem;
  width: 300px;
  max-width: 100%;
  bottom: 0;
  z-index: 3;
  background-color: $white;

  &-backdrop {
    z-index: 1;
    position: fixed;
    top: 8.5rem;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba($black, 0.5);
  }
}

.nav {
  box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.08);
  padding: 1rem 1.5rem;

  .nav-menu {
    list-style-type: none;
    padding: 0;
  }

  .mobile-hamburger {
    margin-right: 1rem;

    button {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.125rem;
      border: 1px solid $bg-grey-3;
      background-color: transparent;
    }
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
</style>
