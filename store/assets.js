export const useAssetStore = defineStore('asset', {
  state: () => ({
    assetList: [],
    loadingAssets: false,
    loadingType: '',
    loadingAssetStatus: '',
    assetCount: 0,
    assetTypeMap: {
      '3d': '3D Illustrations',
      'illustration': 'Illustrations',
      'icon': 'Icons',
      'lottie': 'Lottie Animations',
    },
    assetPageTitle: '',
    showAssetReverseSearch: false,
  }),
  actions: {
    async fetchAssets(search, assetType, price, sortBy, page, reset = false) {
      if (reset) {
        this.assetList = [];
      }
      this.loadingAssets = true;
      this.loadingType = assetType.value;
      try {
        const data = await $fetch('https://api.iconscout.com/v3/search', {
          query: {
            query: search.value,
            asset: assetType.value,
            price: price.value,
            sort: sortBy.value,
            per_page: assetType.value === 'icon' ? 60 : 32,
            page: isRef(page) ? page.value : page,
          },
          headers: {
            'Client-ID': useRuntimeConfig().public.iconscoutClientId,
          },
        });

        if (data) {
          this.assetCount = data.response.items.total;
          this.assetList.push(...data.response.items.data);

          // Generate title
          const animationType = this.assetTypeMap[assetType.value];
          const formattedCount = new Intl.NumberFormat('en-US').format(this.assetCount);
          this.assetPageTitle = `${formattedCount} ${price.value || 'free'} ${search?.value || ''} ${animationType}`;
        }
      }
      catch (err) {
        console.log(err);
        this.loadingAssetStatus = 'error';
      }
      finally {
        this.loadingAssets = false;
      }
    },
    async downloadAsset(uuid, format) {
      try {
        const data = await $fetch(`https://api.iconscout.com/v3/items/${uuid}/api-download`, {
          method: 'POST',
          body: {
            format,
          },
          headers: {
            'Client-ID': useRuntimeConfig().public.iconscoutClientId,
            'Client-Secret': useRuntimeConfig().public.iconscoutClientSecret,
          },
        });
        return data;
      }
      catch (err) {
        console.log(err);
      }
    },
    toggleReverseSearch(val) {
      this.showAssetReverseSearch = val;
    },
  },
});
