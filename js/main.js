function setCopyStatus(button, text, ms = 1200) {
  const prev = button.innerHTML;
  button.innerHTML = text;
  button.disabled = true;
  window.setTimeout(() => {
    button.innerHTML = prev;
    button.disabled = false;
  }, ms);
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "absolute";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
}

window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("copyBibBtn");
  const block = document.getElementById("bibtexBlock");
  if (!btn || !block) return;

  btn.addEventListener("click", async () => {
    try {
      await copyText(block.textContent.trim() + "\n");
      setCopyStatus(btn, '<i class="fa-solid fa-check"></i> Copied');
    } catch {
      setCopyStatus(btn, '<i class="fa-solid fa-triangle-exclamation"></i> Failed', 1600);
    }
  });
});

