let _lastFocus: HTMLElement | null = null;

export function openLightbox(lb: HTMLElement, img: HTMLImageElement, src: string, alt: string) {
  _lastFocus = document.activeElement as HTMLElement | null;
  img.src = src;
  img.alt = alt;
  lb.classList.add('open');
  lb.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  // Move focus into the dialog so screen readers are confined to it
  const focusable = lb.querySelector<HTMLElement>('button, [href], img[tabindex], [tabindex]');
  (focusable ?? lb).focus();
}

export function closeLightbox(lb: HTMLElement) {
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  // Restore focus to the element that triggered the lightbox
  _lastFocus?.focus();
  _lastFocus = null;
}
