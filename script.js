const toggleButtons = [...document.querySelectorAll("[data-bibtex-toggle]")];
const copyButtons = [...document.querySelectorAll("[data-copy-target]")];

toggleButtons.forEach((button) => {
  const panel = document.getElementById(button.dataset.bibtexToggle);
  if (!panel) return;

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    panel.hidden = isOpen;
  });
});

const copyText = async (text) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
};

copyButtons.forEach((button) => {
  const target = document.getElementById(button.dataset.copyTarget);
  if (!target) return;

  button.addEventListener("click", async () => {
    const label = button.textContent;
    await copyText(target.textContent.trim());
    button.textContent = "copied";
    window.setTimeout(() => {
      button.textContent = label;
    }, 1500);
  });
});
