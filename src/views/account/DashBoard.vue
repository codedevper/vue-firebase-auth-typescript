<template>
  <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-lg">
    <div
      v-if="errorMessage || successMessage"
      class="text-sm p-4 mb-4 rounded-lg"
      :class="{
        'bg-red-50 text-red-800': errorMessage,
        'bg-green-50 text-green-800': successMessage
      }"
    >
      <span v-if="errorMessage">{{ errorMessage }}</span>
      <span v-if="successMessage">{{ successMessage }}</span>
    </div>

    <form @submit.prevent="submit" class="space-y-6">
      <div>
        <label for="display_name" class="block text-sm font-medium leading-6 text-gray-900">Display name</label>
        <div class="mt-2">
          <input
            v-model="display_name"
            id="display_name"
            name="display_name"
            type="text"
            autocomplete="name"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Update Profile
        </button>
      </div>
    </form>

    <form @submit.prevent="sendEmailVerifyBefore" class="space-y-5 mt-5">
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
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Change Email
        </button>
      </div>

      <div v-if="$auth.emailVerified">
        <button
          @click="sendVerificationEmail()"
          type="button"
          class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Send Email Verification
        </button>
      </div>

      <div>
        <button
          @click="sendEmailPasswordReset()"
          type="button"
          class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Reset Password
        </button>
      </div>

      <div>
        <button
          @click="deleteAccount()"
          type="button"
          class="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
        >
          Delete Account
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, updateProfile, verifyBeforeUpdateEmail, sendEmailVerification, sendPasswordResetEmail, deleteUser } from 'firebase/auth';
import { ref } from 'vue';

const email: any | null = ref('');
const display_name: any | null = ref('');
const errorMessage = ref('');
const successMessage = ref('');

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    email.value = user.email;
    display_name.value = user.displayName;
  } else {
    // User is signed out
    window.location.assign('/auth/signin');
  }
});

function submit() {
  updateProfile(auth.currentUser, {
    displayName: display_name.value
  })
    .then(() => {
      // Profile updated!
      successMessage.value = 'Profile updated!';
    })
    .catch((error) => {
      // An error occurred
      console.log(error);
    });
}

function sendEmailVerifyBefore() {
  verifyBeforeUpdateEmail(auth.currentUser, email.value, {
    url: 'http://localhost:5173/verify-email'
  })
    .then(() => {
      successMessage.value = 'Email verification sent!';
    })
    .catch((error) => {
      console.log(error);
      switch (error.code) {
        case 'auth/requires-recent-login':
          errorMessage.value = 'Requires recent login.';
          break;
        default:
          errorMessage.value = 'Something went wrong.';
          break;
      }
    });
}

function sendVerificationEmail() {
  sendEmailVerification(auth.currentUser, {
    url: 'http://localhost:5173/verify-email'
  })
    .then(() => {
      successMessage.value = 'Email verification sent!';
    })
    .catch((error) => {
      console.log(error);
    });
}

function sendEmailPasswordReset() {
  sendPasswordResetEmail(auth, email.value)
    .then(() => {
      successMessage.value = 'Password reset email sent!';
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteAccount() {
  deleteUser(auth.currentUser)
    .then(() => {
      successMessage.value = 'Account deleted.';
    })
    .catch((error) => {
      console.log(error);
      switch (error.code) {
        case 'auth/requires-recent-login':
          errorMessage.value = 'Requires recent login.';
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
