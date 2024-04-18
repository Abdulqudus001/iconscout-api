<script setup>
const { assetType } = useFilter()

// const { data, status } = await useFetch('https://api.iconscout.com/v3/search', {
//   headers: {
//     'Client-ID': '214567553662354'
//   },
// })

</script>

<template>
  <main>
    <AssetFilter class="d-none d-lg-block" />
    <div class="main d-flex">
      <AssetFilterSidebar class="d-none d-lg-block" />
      <div style="height: 5000px; background: red; flex-grow: 1;">

      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>

</style>