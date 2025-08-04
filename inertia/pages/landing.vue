<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3'
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import UserDto from '../../app/dtos/user'
import AuthLayout from '~/layouts/AuthLayout.vue'

defineOptions({
  layout: AuthLayout,
})

const props = defineProps<{
  user?: UserDto | null
  messages?: Record<string, string | Record<string, string>>
  errors?: Record<string, string>
}>()

const isLoggedIn = computed(() => !!props.user)

const goToLogin = () => {
  router.visit('/login')
}

const goToDashboard = () => {
  router.visit('/dashboard')
}
</script>

<template>
  <Head title="Landing" />
  <div class="max-w-4xl mx-auto">
    <h1 class="text-4xl font-bold mb-4">Welcome to Our App</h1>
    <p class="text-muted-foreground mb-6">Your gateway to amazing features</p>

    <!-- Conditional Button Section -->
    <div class="flex gap-4">
      <Button v-if="!isLoggedIn" @click="goToLogin" class="px-6 py-2"> Login </Button>
      <Button v-if="isLoggedIn" @click="goToDashboard" class="px-6 py-2"> Dashboard </Button>
    </div>
  </div>
</template>
