<template>
  <nav class="nav">
    <ul class="nav-menu d-flex align-items-center my-0">
      <li class="nav-item">
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
      <li class="nav-item">
        <BaseSearch />
      </li>
      <li class="nav-item has-menu">
        <a
          href="#"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Explore
          <Icon name="material-symbols:keyboard-arrow-down-rounded" />
        </a>
      </li>
      <li class="nav-item has-menu">
        <a
          href="#"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Tools
          <Icon name="material-symbols:keyboard-arrow-down-rounded" />
        </a>
      </li>
      <li class="nav-item has-menu">
        <a href="#">
          All Features
        </a>
      </li>
      <li class="nav-item has-menu">
        <a
          href="#"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Learn
          <Icon name="material-symbols:keyboard-arrow-down-rounded" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  position: sticky;
  box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.08);
  top: 0;
  left: 0;
  right: 0;

  .nav-menu {
    list-style-type: none;
    padding: 1rem 1.5rem;
  }

  .nav-item {
    color: $text-black;
    font-weight: 600;
    margin-right: 1rem;
  }

  &__logo {
    margin-right: 1.75rem;

    svg {
      width: 200px
    }
  }
}
</style>
