import { defineStore } from 'pinia'

export interface Product {
  id: string
  name: string
  cost: number
  icon: string
}

interface ProductState {
  all: Record<string, Product>
  ids: string[]
}

export const useProductStore = defineStore({
  id: 'products',

  state: (): ProductState => ({
    all: {},
    ids: []
  }),

  getters: {
    list() {
      return this.ids.map(id => this.all[id])
    }
  },

  actions: {
    async fetchAll() {
      const res = await window.fetch('http://localhost:8080/products')
      const data: Product[] = await res.json()
      this.$state = data.reduce<ProductState>((acc, curr) => {
        return {
          ids: acc.ids.concat(curr.id),
          all: { ...acc.all, [curr.id]: curr }
        }
      }, { all: {}, ids: [] })
    }
  }
})