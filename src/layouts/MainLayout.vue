<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <slot name="header" />
    </q-header>

    <q-page-container>
      <slot name="main" />
    </q-page-container>
  </q-layout>
</template>
