<script setup>
const footerLinks = [
  {
    title: 'Graphic Resources',
    list: [
      'Free Icons',
      'Free Emoji Icons',
      'Free Logo Icons',
      'iOS Icons',
      'Sticker Icons',
      'Gradient Icons',
      'Curated Bundle',
      'Calendar of Festival',
      'Free Assets of the day',
      'Explore Design Assets',
    ],
  },
  {
    title: 'Products',
    list: [
      'Unicon Icon Font',
      'Color editor',
      'Apps & Plugins',
      'Hire designers',
      'IconScout API',
      'Top Illustrations',
      'Top 3D Assets',
      'Reverse Image Search',
      'Unicon Plugin for Figma',
    ],
  },
  {
    title: 'Company',
    list: [
      'Blog',
      'About',
      'Access features',
      'Sell on IconScout',
      'Startup program',
      'We\'re hiring',
    ],
  },
  {
    title: 'Legal',
    list: [
      'Terms of use',
      'Privacy policy',
      'License agreeement',
      'Contributor terms',
      'Support center',
      'Join discord community',
    ],
  },
]
</script>
<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="container">
        <div class="footer-header d-flex justify-content-center justify-content-md-between align-items-center flex-wrap">
          <div class="d-flex align-items-center text-black">
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
            <p class="mb-0 ms-4 fs-6">Design Resource Marketplace</p>
          </div>
          <p class="fs-6 text-black mb-0 text-center mt-4 mt-md-0">
            <span class="text-primary">5,663,871</span>
            graphic resources & counting
          </p>
        </div>
        <div class="footer-content">
          <div class="row">
            <div v-for="col in footerLinks" :key="col.title" class="col-sm-6 col-md-3 col-lg-2">
              <h2 class="footer-content-title">
                {{ col.title }}
              </h2>
              <ul class="footer-content-list">
                <li v-for="list in col.list" :key="list">
                  <a href="#">
                    {{ list }}
                  </a>
                </li>
              </ul>
            </div>
            <div class="col-12 col-lg-4">
              <h2 class="footer-content-title">
                Get IconScout for desktop
              </h2>
              <div class="btn-group">
                <a href="#">
                  <Icon name="bi:apple" />
                </a>
                <a href="#">
                  <Icon name="ri:windows-fill" />
                </a>
              </div>
              <h2 class="footer-content-title mt-5">
                Get LottieFiles mobile app
              </h2>
              <div class="d-flex">
                <a href="#" class="me-3">
                  <img src="~/assets/images/app-store.png" alt="">
                </a>
                <a href="#">
                  <img src="~/assets/images/play-store.png" alt="">
                </a>
              </div>
              <h2 class="footer-content-title mt-5">
                Follow us
              </h2>
              <div class="btn-group">
                <a href="#">
                  <Icon name="mdi:facebook-box" />
                </a>
                <a href="#">
                  <Icon name="mdi:instagram" />
                </a>
                <a href="#">
                  <Icon name="ri:twitter-x-fill" />
                </a>
                <a href="#">
                  <Icon name="bi:linkedin" />
                </a>
                <a href="#">
                  <Icon name="icon-park-outline:dribble" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center">
          <p class="fs-6 mb-0">
            &copy; {{ new Date().getFullYear() }} Design Barn Inc. Made with ❤️ in India
          </p>
          <div class="d-flex align-items-center">
            <div class="secure-payments">
              <Icon name="ion:locked" />
              Secure Payments
            </div>
            <div class="stripe-payment">
              <img src="~/assets/images/stripe.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  &-container {
    background-color: $bg-grey-1;
    padding: 1.5rem 0;
  }

  &-header {
    padding-bottom: 1.5rem;
    border-bottom: 1px solid $bg-grey-3;
  }

  &-content {
    padding-top: 1.5rem;

    &-title {
      font-weight: 700;
      font-size: 0.875rem;
      margin-bottom: 0.875rem;
    }

    &-list {
      list-style-type: none;
      padding-left: 0;

      li {
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
        line-height: 1.5rem;
      }

      a {
        color: $text-dark-1;
      }
    }

    .btn-group {
      a {
        border: 1px solid $bg-grey-3;
        background-color: transparent;
        width: 47px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        height: 47px;
      }
    }
  }

  .fs-6 {
    font-size: 0.875rem;
  }

  .copyright {
    padding: 1.5rem 0;
    background-color: $bg-grey-3;

    .secure-payments {
      font-style: italic;
      margin-right: 1rem;
      font-size: 0.875rem;

      svg {
        color: #e7b549;
      }
    }
  }
}
</style>