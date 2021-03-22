import { createPinia, setActivePinia } from 'pinia'
import { Product, useProductStore } from '../products'

const testProduct: Product = {
  id: '1',
  name: 'Product',
  cost: 100,
  icon: '',
}

const useSubject = () => {
  const pinia = createPinia()
  setActivePinia(pinia)
  return useProductStore()
}

describe('getters', () => {
  it('returns array of products', () => {
    const productStore = useSubject()
    
    productStore.$state = {
      ids: ['1'],
      all: {
        1: testProduct
      }
    }

    expect(productStore.list).toEqual([testProduct])
  })
})
