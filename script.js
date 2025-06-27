document.addEventListener("DOMContentLoaded", () => {
  const langBtn = document.getElementById("lang-btn");
  const ptVersion = document.getElementById("pt-version");
  const enVersion = document.getElementById("en-version");

  langBtn.addEventListener("click", () => {
    if (ptVersion.style.display === "none") {
      ptVersion.style.display = "block";
      enVersion.style.display = "none";
      langBtn.textContent = "English";
    } else {
      ptVersion.style.display = "none";
      enVersion.style.display = "block";
      langBtn.textContent = "Português";
    }
  });
});
