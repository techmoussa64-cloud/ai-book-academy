import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import { getAuth, signInWithEmailAndPasswordimport {,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/...";} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
const firebaseConfig = {
    apiKey: "AIzaSyCjG_Udhrr4rsFqYszQKMtk2Z2_ysBgSuM",
    authDomain: "ai-book-academy.firebaseapp.com",
    projectId: "ai-book-academy",
    storageBucket: "ai-book-academy.firebasestorage.app",
    messagingSenderId: "400711274890",
    appId: "1:400711274890:web:d7558c32596eaba3c27873"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const SUPABASE_URL = "https://wejuwaismkgclapavavs.supabase.co";
const SUPABASE_KEY = "sb_publishable_dstoxinmazx2sdwDeKFsNQ_KTJ3kju_";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const ADMIN_EMAIL = "musanuhubarka@gmail.com";
const loginForm = document.getElementById("loginForm");
const loginPassword = document.getElementById("loginPassword");
const forgotPassword = document.getElementById("forgotPassword");


const showLoginPassword = document.getElementById("showLoginPassword");
  

forgotPassword.addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value.trim();

  if (!email) {
    alert("Da farko ka rubuta email ɗinka.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    alert("An tura hanyar sauya kalmar sirri zuwa email ɗinka.");
  } catch (error) {
    alert("An samu matsala. Ka tabbatar email ɗin daidai ne.");
  }
});
showLoginPassword.addEventListener("click", () => {
  if (loginPassword.type === "password") {
    loginPassword.type = "text";
    showLoginPassword.textContent = "🙈";
  } else {
    loginPassword.type = "password";
    showLoginPassword.textContent = "👁️";
  }
});
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = loginPassword.value;

  
      try {
  await signInWithEmailAndPassword(auth, email, password);

  if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
    const { error: supabaseError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (supabaseError) {
      throw new Error("Supabase: " + supabaseError.message);
    }

    alert("An shiga shafin admin cikin nasara!");
    window.location.href = "admin.html";
  } else {
    alert("An shiga account cikin nasara!");
    window.location.href = "dashboard.html";
  }
} catch (error) {
      
    if (
      error.code === "auth/invalid-credential" ||
      error.code === "auth/wrong-password" ||
      error.code === "auth/user-not-found"
    ) {
      alert("Email ko password ba daidai ba ne.");
    } else if (error.code === "auth/invalid-email") {
      alert("Email ɗin ba daidai ba ne.");
    } else {
      alert("An samu matsala: " + error.message);
    }
  }
});