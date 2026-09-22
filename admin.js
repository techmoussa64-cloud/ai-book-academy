import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
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

const logoutButton = document.getElementById("logoutButton");
const uploadForm = document.getElementById("uploadForm");
const lessonTitle = document.getElementById("lessonTitle");
const lessonDescription = document.getElementById("lessonDescription");
const pdfFile = document.getElementById("pdfFile");
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  if (user.email !== ADMIN_EMAIL) {
    alert("Wannan shafin na admin ne kawai.");
    window.location.href = "dashboard.html";
  }
});

logoutButton.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
})
;uploadForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = lessonTitle.value.trim();
  const description = lessonDescription.value.trim();
  const file = pdfFile.files[0];

  if (!title || !description || !file) {
    alert("Ka cika dukkan bayanai sannan ka zaɓi PDF.");
    return;
  }

  if (file.type !== "application/pdf") {
    alert("PDF kawai ake yarda a ɗora.");
    return;
  }

  const submitButton = uploadForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = "Ana ɗorawa...";

  try {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filePath = `${Date.now()}-${safeName}`;

    const { error: uploadError } = await supabase.storage
      .from("lesson-pdfs")
      .upload(filePath, file, {
        contentType: "application/pdf",
        upsert: false
      });

    if (uploadError) throw uploadError;

    const { data: publicData } = supabase.storage
      .from("lesson-pdfs")
      .getPublicUrl(filePath);

    const { error: insertError } = await supabase
      .from("lessons")
      .insert({
        title: title,
        description: description,
        pdf_url: publicData.publicUrl,
        file_path: filePath
      });

    if (insertError) throw insertError;

    alert("An ɗora darasi cikin nasara!");
    uploadForm.reset();
  } catch (error) {
    alert("An samu matsala: " + error.message);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Dora Darasi";
  }
});