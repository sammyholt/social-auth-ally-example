<script setup lang="ts">
import { Menu, Route } from 'lucide-vue-next'
import { Link } from '@inertiajs/vue3'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
</script>

<template>
  <nav class="hidden gap-5 text-sm items-center md:flex lg:gap-6">
    <Link href="/" class="flex items-center gap-2 text-lg font-semibold md:text-base">
      <Route class="h-6 w-6" />
      <span class="sr-only">Social Auth Template</span>
    </Link>

    <Link
      href="/"
      class="text-muted-foreground transition-colors hover:text-foreground"
      :class="{ 'text-foreground': $page.url.startsWith('/') }"
    >
      Home
    </Link>
  </nav>

  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline" size="icon" class="shrink-0 md:hidden">
        <Menu class="h-6 w-6" />
        <span class="sr-only">Toggle navigation menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left">
      <nav class="grid gap-6 text-lg font-medium">
        <Link href="/" class="flex items-center gap-2 text-lg font-semibold">
          <Route class="h-6 w-6" />
          <span class="sr-only">Social Auth Template</span>
        </Link>

        <Link
          href="/"
          class="text-muted-foreground hover:text-foreground"
          :class="{ 'text-foreground': $page.url.startsWith('/') }"
        >
          Home
        </Link>
      </nav>
    </SheetContent>
  </Sheet>
</template>
