import { CACHE_PREFIX } from '@/global/constants'

enum CacheType {
  Local,
  Session,
}

class Cache {
  storage: Storage

  constructor(cacheType: CacheType) {
    this.storage = cacheType === CacheType.Local ? localStorage : sessionStorage
  }

  setCache(key: string, value: any) {
    if (value) {
      this.storage.setItem(CACHE_PREFIX + key, JSON.stringify(value))
    }
  }

  getCache(key: string) {
    const value = this.storage.getItem(CACHE_PREFIX + key)
    if (value) {
      return JSON.parse(value)
    }
  }

  removeCache(key: string) {
    if (key) {
      this.storage.removeItem(CACHE_PREFIX + key)
    }
  }

  clear() {
    this.storage.clear()
  }
}

const sessionCache = new Cache(CacheType.Session)
const localCache = new Cache(CacheType.Local)
export { sessionCache, localCache }
