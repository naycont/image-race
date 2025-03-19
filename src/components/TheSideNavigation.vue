<script setup lang="ts">
import { useSideNavigationStore } from '@/stores/sideNavigation'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import router from '@/router'

const route = useRoute()
const sideNavigationStore = useSideNavigationStore()

const routeName = computed(() => route.name)

const opened = computed(() => {
  return sideNavigationStore.opened
})

const navigation = computed(() => {
  return [
    {
      name: 'sellers',
      title: 'Vendedores',
      icon: 'account_circle'
    }
  ]
})

const navigateTo = (routeName: string) => {
  router.push({ name: routeName })
}
</script>
<template>
  <v-navigation-drawer class="navigation" v-model="opened">
    <v-list-item
      v-for="navigationItem in navigation"
      :key="navigationItem.name"
      :title="navigationItem.title"
      :prepend-icon="navigationItem.icon"
      @click="navigateTo(navigationItem.name)"
      :active="routeName === navigationItem.name"
    ></v-list-item>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
.navigation {
  &__footer {
    padding: var(--ui-padding);
  }
}
</style>
