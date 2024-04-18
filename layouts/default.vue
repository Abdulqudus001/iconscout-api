<template>
  <div>
    <BaseNavbar />
    <div class="icon-count py-5">
      <div class="container-fluid">
        <h1 class="icon-count__title">237 Limit 3D Illustrations</h1>
        <p class="icon-count__subtitle">
          Get access to 7,301 Exclusive 3D Illustrations selected by our designer community. Use these high-quality 3D assets for all your website or mobile app design, marketing and development needs — from three-dimensional prototypes and mockups to social media collaterals, infographics, presentations and more. Available in PNG, BLEND, glTF, C4D, OBJ, PSD or FBX file formats.
        </p>
      </div>
    </div>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.icon-count {
  background-color: $bg-grey-2;

  &__title {
    font-size: 1.5rem;
    color: $black;
    font-weight: 700;
    line-height: 150%;
    margin-bottom: 0.25rem;
  }

  &__subtitle {
    color: $text-light;
    font-size: 0.75rem;
  }

  @media screen and (min-width: 1024px) {
    &__title {
      font-size: 2rem;
    }

    &__subtitle {
      color: $text-light;
      font-size: 0.875rem;
    }
  }
}
</style>
