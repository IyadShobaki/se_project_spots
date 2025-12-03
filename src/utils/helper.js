export function setButtonText(btn, isLoading) {
  const text = btn.textContent.trim();

  isLoading
    ? (btn.textContent = text.slice(0, -1) + "ing...")
    : (btn.textContent = text.slice(0, -6) + "e");
}
