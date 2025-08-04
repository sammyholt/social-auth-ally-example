<script setup lang="ts">
import { toast } from 'vue-sonner'
import Sonner from '@/components/ui/sonner/Sonner.vue'
import { onMounted, watchEffect } from 'vue'
import 'vue-sonner/style.css'

type Toast = string | Record<string, string>

const props = defineProps<{
  messages: Record<string, Toast>
}>()

onMounted(() => {
  runToasts({
    exceptions: props.messages.errorsBag,
    success: props.messages.success,
  })
})

watchEffect(() => {
  runToasts({
    exceptions: props.messages.errorsBag,
    success: props.messages.success,
  })
})

function runToasts(toasts: { exceptions: Toast; success: Toast }) {
  const exceptions = getToastMessage(toasts.exceptions)
  const success = getToastMessage(toasts.success)

  if (exceptions.length > 0) {
    toast.error('An error occurred', {
      description: exceptions,
    })
  }

  if (success.length > 0) {
    toast.success(success)
  }
}

function getToastMessage(toast: Toast) {
  if (typeof toast === 'string') return toast
  if (typeof toast === 'object') {
    return Object.values(toast).join(', ')
  }
  return ''
}
</script>

<template>
  <Sonner class="pointer-events-auto" rich-colors />
</template>
