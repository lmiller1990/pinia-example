import { createPinia, setActivePinia } from 'pinia'
import { useCartStore } from '../cart'
import { Product, useProductStore } from '../products'

const testProduct: Product = {
  id: '1',
  name: 'Product',
  cost: 100,
  icon: '',
}

let productStore: ReturnType<typeof useProductStore>
let cartStore: ReturnType<typeof useCartStore>

const setup = () => {
  const pinia = createPinia()
  setActivePinia(pinia)
  productStore = useProductStore()
  productStore.$state = {
    ids: ['1'],
    all: { 1: testProduct }
  }
  cartStore = useCartStore()
}

describe('getters', () => {
  beforeEach(() => {
    setup()
  })

  afterEach(() => {
    productStore.$reset()
    cartStore.$reset()
  })

  it('sums total of cart', () => {
    cartStore.add(testProduct)
    cartStore.add(testProduct)
    expect(cartStore.total).toBe(200)
    cartStore.remove(testProduct)
    expect(cartStore.total).toBe(100)
  })

  it('formattedCart', () => {
    cartStore.add(testProduct)

    expect(cartStore.formattedCart).toEqual([
      {
        cost: 100,
        name: 'Product',
        quantity: 1,
      }
    ])
  })
})
