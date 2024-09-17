<template>
  <AuthLayout>
    <template #title>Forgot your password?</template>
    <template #description>No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.</template>
    <template #content>
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Send Email Password Reset Link
          </button>
        </div>
      </form>

      <p class="mt-5 text-center text-sm text-gray-500">
        <a href="/auth/signin" class="font-semibold leading-6 text-indigo-500 hover:text-indigo-600">Go back</a>
      </p>
    </template>
  </AuthLayout>
</template>

<script lang="ts" setup>
import AuthLayout from '@/layouts/AuthLayout.vue';
</script>

<style scoped>
/** */
</style>
