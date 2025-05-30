// worker.js
import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler'

export default {
  async fetch(request, env) {
    try {
      return await getAssetFromKV({
        request,
        waitUntil: promise => promise,
      }, {
        ASSET_NAMESPACE: env.__STATIC_CONTENT,
        ASSET_MANIFEST: env.__STATIC_CONTENT_MANIFEST,
        mapRequestToAsset: req => mapRequestToAsset(req)
      })
    } catch (e) {
      return new Response(e.message, { status: 500 })
    }
  }
}