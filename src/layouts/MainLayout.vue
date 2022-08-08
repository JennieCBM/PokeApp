<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view :loading="loading"/>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  props: {
    loading: Boolean
  },
  data () {
    return {
    }
  }
}
</script>
