<script setup lang="ts">
import { cond } from 'ramda'
import { when200Json, when401 } from '@/shared/utility/when-response.ts'
import { computed, onMounted, ref } from 'vue'
import { tryToGetMeNetwork } from '@/session/data/network/GetMe.ts'
import type { PublicUser } from '@/session/data/entity/User.ts'
import { MxOrigin } from '@/shared/network/mx-origin.ts'
import { useQueryClient } from '@tanstack/vue-query'

const queryClient = useQueryClient()
const publicUser = ref<PublicUser | null>(null)
const isKnowingMe = ref(true)
const isSigningOut = ref(false)
const isBusy = computed(() => isKnowingMe.value && isSigningOut.value)

const tryToGetMe = () => {
  if (isBusy.value) {
    return
  }
  isKnowingMe.value = true
  tryToGetMeNetwork()
    .then(
      cond([
        when200Json((user: PublicUser) => {
          queryClient.setQueryData(['session'], user)
          publicUser.value = user
        }),
        when401(() => {
          queryClient.invalidateQueries({ queryKey: ['session'] })
          publicUser.value = null
          setTimeout(() => {
            const currentUrl = new URL(window.location.href)
            const destination = new URL(MxOrigin.authFe)
            destination.pathname = '/sign-in'
            destination.searchParams.set('redirect_uri', currentUrl.href)
            window.location.href = destination.href
          }, 2000)
        }),
      ]),
    )
    .finally(() => {
      isKnowingMe.value = false
    })
}

onMounted(() => {
  tryToGetMe()
})
</script>

<template>
  <template v-if="isKnowingMe">
    <h1>Loading...</h1>
  </template>
  <template v-else>
    <template v-if="publicUser">
      <router-view></router-view>
    </template>
    <template v-else>
      <h1>Redirecting to sign in page...</h1>
    </template>
  </template>
</template>

<style></style>
