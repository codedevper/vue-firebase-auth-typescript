<template>
  <AuthLayout>
    <template #title></template>
    <template #content></template>
  </AuthLayout>
</template>

<script lang="ts" setup>
import AuthLayout from '@/layouts/AuthLayout.vue';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { onMounted } from 'vue';

onMounted(() => {
  signOut(auth);
  localStorage.removeItem('isLoggedIn');
  window.location.assign('/auth/signin');
});
</script>

<style scoped>
/** */
</style>
