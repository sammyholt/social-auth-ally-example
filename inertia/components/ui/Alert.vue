<script setup lang="ts">
import { computed } from 'vue'
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface Props {
  variant?: 'default' | 'destructive' | 'success' | 'info'
  title?: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

const variantClasses = {
  default: 'border-neutral-200 bg-neutral-50 text-neutral-900',
  destructive: 'border-red-200 bg-red-50 text-red-900',
  success: 'border-green-200 bg-green-50 text-green-900',
  info: 'border-blue-200 bg-blue-50 text-blue-900',
}

const iconMap = {
  default: Info,
  destructive: XCircle,
  success: CheckCircle,
  info: Info,
}

const Icon = computed(() => iconMap[props.variant])
</script>

<template>
  <div
    :class="cn(
      'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
      variantClasses[variant]
    )"
  >
    <Icon class="h-4 w-4" />
    <div v-if="title" class="mb-1 font-medium leading-none tracking-tight">
      {{ title }}
    </div>
    <div v-if="description" class="text-sm [&_p]:leading-relaxed">
      {{ description }}
    </div>
    <slot />
  </div>
</template> 