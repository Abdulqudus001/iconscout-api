export default function () {
  const route = useRoute();

  const routeMatcher = {
    '3d-illustrations': '3d',
    illustrations: 'illustration',
    icons: 'icon',
    animations: 'lottie',
  }

  const getQueryParams = (params) => {
    return params === 'all' ? null : params
  }

  const asset = routeMatcher[route.params.slug] || null
  const price = getQueryParams(route.query.price)

  const changeFilterRoute = (asset, price, sort) => {
    navigateTo({
      path: `/${asset}`,
      query: {
        price: price || null,
        sort: sort || null
      }
    })
  }

  return {
    asset,
    price,
    changeFilterRoute
  }
}