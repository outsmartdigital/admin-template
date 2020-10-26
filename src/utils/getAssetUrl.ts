export const getAssetUrl = (path: string) => {
  if (process.env.IS_LOCAL === 'true') {
    return `/${path}`.replace(/\/\//g, '/')
  }
  return `${process.env.CDN_STATIC_BASE_URL}/${`assets/${path}`.replace(/\/\//g, '/')}`
}
