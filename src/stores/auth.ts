import { ref } from 'vue';
import { defineStore } from 'pinia';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(localStorage.getItem('isLoggedIn') ? true : false);
  const user: any | null = ref(null);
  const emailVerified: boolean | any = ref(false);

  function fetchUser() {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        user.value = currentUser;
        emailVerified.value = currentUser.emailVerified;
      } else {
        // User is signed out
        user.value = null;
        localStorage.removeItem('isLoggedIn');
      }
    });
  }

  return { isLoggedIn, emailVerified, user, fetchUser };
});
