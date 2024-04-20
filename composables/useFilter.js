export default function () {
  const route = useRoute();

  const routeMatcher = {
    '3d-illustrations': '3d',
    'illustrations': 'illustration',
    'icons': 'icon',
    'animations': 'lottie',
  };

  const getQueryParams = (params) => {
    return params === 'all' ? null : params;
  };

  const assetType = computed(() => routeMatcher[route.params.slug] || 'icon');

  const price = computed(() => getQueryParams(route.query.price) || 'free');
  const sortBy = computed(() => getQueryParams(route.query.sort) || 'relevant');

  return {
    assetType,
    price,
    sortBy,
  };
}
