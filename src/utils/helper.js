export function setButtonText(btn, isLoading) {
  isLoading
    ? (btn.textContent = btn.textContent.slice(0, -1) + "ing...")
    : (btn.textContent = btn.textContent.slice(0, -6) + "e");
}
