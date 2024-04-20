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
    title: '',
  }),
  actions: {
    async fetchAssets(assetType, price, sortBy, page, reset = false) {
      if (reset) {
        this.assetList = [];
      }
      this.loadingAssets = true;
      this.loadingType = assetType.value;
      try {
        const data = await $fetch('https://api.iconscout.com/v3/search', {
          query: {
            asset: assetType.value,
            price: price.value,
            sort: sortBy.value,
            per_page: assetType.value === 'icon' ? 60 : 32,
            page: isRef(page) ? page.value : page,
          },
          headers: {
            'Client-ID': '30774341467952',
            'Client-Secret': '6Qs4JV3SiEIfHi6Je9iFvPggaeqrhXbw',
          },
        });

        if (data) {
          this.assetCount = data.response.items.total;
          this.assetList.push(...data.response.items.data);

          // Generate title
          const animationType = this.assetTypeMap[assetType.value];
          const formattedCount = new Intl.NumberFormat('en-US').format(this.assetCount);
          this.title = `${formattedCount} ${price.value || 'free'} ${animationType}`;
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
    async downloadAsset(uuid, isAnimation, format) {
      try {
        const data = await $fetch(`https://api.iconscout.com/v3/items/${uuid}/api-download`, {
          method: 'POST',
          body: {
            format
          },
          headers: {
            'Client-ID': '30774341467952',
            'Client-Secret': '6Qs4JV3SiEIfHi6Je9iFvPggaeqrhXbw',
          },
        });
        return data
      } catch(err) {
        console.log(err);
      }
    }
  },
  // const assetsTitle = useState('assetsTitle', () => {
  //   const animationType = assetTypeMap[assetType.value];

  //   if (status.value === 'error') {
  //     return animationType;
  //   }

  //   const formattedCount = new Intl.NumberFormat('en-US').format(assetCount.value);
  //   return `${formattedCount} ${price.value || 'free'} ${animationType}`;
  // });
});
