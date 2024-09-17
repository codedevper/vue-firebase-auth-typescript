<template>
  <AuthLayout>
    <template #title>Email Verification</template>
    <template #description>
      Before continuing, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
    </template>
    <template #content>
      <form @submit.prevent="submit" class="space-y-6">
        <div v-if="sent" class="bg-green-50 text-green-800 text-sm p-4 mb-4 rounded-lg">
          <span>A new verification link has been sent to the email address you provided during registration.</span>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Resend Verification Email
          </button>

          <p class="mt-2 text-center text-sm text-gray-500 border-2 border-indigo-500 rounded-md px-3 py-1.5">
            <a href="/account" class="font-semibold text-indigo-500 hover:text-indigo-600">Change Email</a>
          </p>
        </div>
      </form>

      <p class="mt-5 text-center text-sm text-gray-500">
        <a href="/auth/signout" class="font-semibold leading-6 text-indigo-500 hover:text-indigo-600">Logout</a>
      </p>
    </template>
  </AuthLayout>
</template>

<script lang="ts" setup>
import AuthLayout from '@/layouts/AuthLayout.vue';
import { auth } from '@/lib/firebase';
import { sendEmailVerification } from 'firebase/auth';
import { ref } from 'vue';

const sent = ref(false);

function submit() {
  sendEmailVerification(auth.currentUser).then(() => {
    // Email verification sent!
    sent.value = true;
  });
}
</script>

<style scoped>
/** */
</style>
