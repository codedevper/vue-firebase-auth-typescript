<template>
  <AuthLayout>
    <template #title>Sign in to your account</template>
    <template #description>Hi! Welcome back, You've been missed.</template>
    <template #content>
      <div v-if="errorMessage" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span>{{ errorMessage }}</span>
      </div>

      <form @submit.prevent="submit" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input
              v-model="email"
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
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="text-sm">
              <a href="/auth/forgot-password" class="font-semibold text-indigo-500 hover:text-indigo-600">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
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
            Sign in
          </button>
        </div>
      </form>

      <p class="mt-5 text-center text-sm text-gray-500">
        Not a member?
        <a href="/auth/signup" class="font-semibold leading-6 text-indigo-500 hover:text-indigo-600">Create account</a>
      </p>
    </template>
  </AuthLayout>
</template>

<script lang="ts" setup>
import AuthLayout from '@/layouts/AuthLayout.vue';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const errorMessage = ref('');

function submit() {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed up
      //const user = userCredential.user;
      //localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true');
      window.location.assign('/account');
    })
    .catch((error) => {
      console.log(error.code);

      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage.value = 'Invalid email.';
          break;
        case 'auth/missing-password':
          errorMessage.value = 'Missing password.';
          break;
        case 'auth/invalid-credential':
          errorMessage.value = 'These credentials do not match our records.';
          break;
        default:
          errorMessage.value = 'Something went wrong.';
          break;
      }
    });
}
</script>

<style scoped>
/** */
</style>
