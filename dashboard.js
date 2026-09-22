import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
const firebaseConfig = {
    apiKey: "AIzaSyCjG_Udhrr4rsFqYszQKMtk2Z2_ysBgSuM",
    authDomain: "ai-book-academy.firebaseapp.com",
    projectId: "ai-book-academy",
    storageBucket: "ai-book-academy.firebasestorage.app",
    messagingSenderId: "400711274890",
    appId: "1:400711274890:web:d7558c32596eaba3c27873"
  }
const app = initializeApp(firebaseConfig);
const SUPABASE_URL = "https://wejuwaismkgclapavavs.supabase.co";
const SUPABASE_KEY = "sb_publishable_dstoxinmazx2sdwDeKFsNQ_KTJ3kju_";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const lessonsList = document.getElementById("lessonsList");
const auth = getAuth(app);

const logoutButton = document.getElementById("logoutButton");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  loadLessons();
});
  

logoutButton.addEventListener("click", async () => {
  try {
    await signOut(auth);
    window.location.href = "login.html";
  } catch (error) {
    alert("An samu matsala wajen fita.");
  }
});
async function loadLessons() {
  lessonsList.innerHTML = "<p>Ana ɗauko darussa...</p>";

  try {
    const { data: lessons, error } = await supabase
      .from("lessons")
      .select("title, description, pdf_url, created_at")
      .order("created_at", { ascending: false });

    if (error) throw error;

    if (!lessons || lessons.length === 0) {
      lessonsList.innerHTML = `
        <article class="course-card">
          <div class="course-icon">📘</div>
          <div>
            <h3>Babu darasi tukuna</h3>
            <p>Darussan da admin ya ɗora za su bayyana a nan.</p>
          </div>
        </article>
      `;
      return;
    }

    lessonsList.innerHTML = "";

    lessons.forEach((lesson) => {
      const card = document.createElement("article");
      card.className = "course-card";

      const icon = document.createElement("div");
      icon.className = "course-icon";
      icon.textContent = "📘";

      const content = document.createElement("div");

      const title = document.createElement("h3");
      title.textContent = lesson.title;

      const description = document.createElement("p");
      description.textContent = lesson.description || "";

      const openButton = document.createElement("a");
      openButton.href = lesson.pdf_url;
      openButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = lesson.pdf_url;
          });
      openButton.className = "button button-primary";
      openButton.textContent = "Buɗe PDF";

      content.append(title, description, openButton);
      card.append(icon, content);
      lessonsList.appendChild(card);
    });
  } catch (error) {
    lessonsList.innerHTML = "";
    const message = document.createElement("p");
    message.textContent = "An kasa ɗauko darussa: " + error.message;
    lessonsList.appendChild(message);
  }
}