<template>
  <div class="flex justify-center">
    <div class="max-w-4xl px-12 py-4">
      <div class="grid grid-cols-2 gap-1">

        <div class="grid grid-cols-3 gap-4">
          <div v-if="loading">
            Loading...
          </div>

          <div 
            v-for="product in products" 
            :key="product.id"
            class="rounded-sm shadow py-4 px-8 text-center"
          >
            <div class="text-4xl">
              {{ product.icon }}
            </div>
            <span>
              {{ product.name }} 
              (${{ product.cost }})
            </span>

            <button 
              class="w-14 h-8 text-xs text-white font-extrabold rounded-md flex items-center justify-center bg-green-500 my-1"
              @click="add(product)"
            >
              Add
            </button>
            <button 
              class="w-14 h-8 text-xs text-white font-extrabold rounded-md flex items-center justify-center bg-red-500 my-1"
              @click="remove(product)"
            >
              Remove
            </button>
          </div>
        </div>

        <div class="px-6 w-56">
          <h2 class="underline">Cart</h2>

          <!-- some nice spacing if there are no item in the cart -->
          <br v-if="cart.length === 0" />

          <div 
            v-for="item in cart"
            :key="item.name"
            class="flex justify-between"
          >
            <div>
              {{ item.name }} ({{ item.quantity }}): 
            </div>
            <div class="text-right">
              ${{ item.cost }}
            </div>
          </div>

          <div class="double-underline text-right">
            ${{ total }}
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { Product, useProductStore } from './store/products'
import { useCartStore } from './store/cart'

export default defineComponent({
  setup() {
    const productStore = useProductStore()
    const loading = ref(true)

    onMounted(async () => {
      await productStore.fetchAll()
      loading.value = false
    })

    const cartStore = useCartStore()

    return {
      products: computed(() => productStore.list),
      cart: computed(() => cartStore.formattedCart),
      total: computed(() => cartStore.total),
      loading,
      add: (product: Product) => cartStore.add(product),
      remove: (product: Product) => cartStore.remove(product),
    }
  }
})

</script>

<style style>
.double-underline {
  border-top: 3px double;
}
</style>