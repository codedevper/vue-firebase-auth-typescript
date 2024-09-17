<template>
  <AuthLayout>
    <template #title>Create account</template>
    <template #description>Fill your information below or register with your social account.</template>
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
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
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
          <label for="password-confirmation" class="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
          <div class="mt-2">
            <input
              id="password-confirmation"
              name="password_confirmation"
              type="password"
              autocomplete="confirm-password"
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
            Sign up
          </button>
        </div>
      </form>

      <p class="mt-5 text-center text-sm text-gray-500">
        Already a member?
        <a href="/auth/signin" class="font-semibold leading-6 text-indigo-500 hover:text-indigo-600">Sign in</a>
      </p>
    </template>
  </AuthLayout>
</template>

<script lang="ts" setup>
import AuthLayout from '@/layouts/AuthLayout.vue';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const errorMessage = ref('');

function submit() {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed up
      //const user = userCredential.user;
      //localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true');
      window.location.assign('/account');
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage.value = 'Invalid email';
          break;
        case 'auth/missing-password':
          errorMessage.value = 'Missing password.';
          break;
        case 'auth/email-already-in-use':
          errorMessage.value = 'Email already in use';
          break;
        case 'auth/weak-password':
          errorMessage.value = 'Password should be at least 6 characters';
          break;
        case 'auth/internal-error':
          errorMessage.value = 'Internal Error';
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
