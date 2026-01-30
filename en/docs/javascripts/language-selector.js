// Language Selector for Eitri Docs
document.addEventListener('DOMContentLoaded', function() {
  // Find the header's right section
  const headerRight = document.querySelector('header .ml-auto');
  if (!headerRight) return;

  // Create language selector container
  const langSelector = document.createElement('div');
  langSelector.className = 'language-selector flex items-center gap-2';
  langSelector.innerHTML = `
    <a href="https://docs.eitri.tech/en/"
       class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground rounded-md px-3 h-8"
       title="English">
      EN
    </a>
    <span class="text-muted-foreground">|</span>
    <a href="https://docs.eitri.tech/pt/"
       class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground rounded-md px-3 h-8"
       title="Português">
      PT
    </a>
  `;

  // Insert before the theme toggle button
  const themeButton = headerRight.querySelector('button[title="Toggle theme"]');
  if (themeButton) {
    // Insert separator and language selector before theme button
    const separator = document.createElement('div');
    separator.setAttribute('data-orientation', 'vertical');
    separator.setAttribute('role', 'none');
    separator.setAttribute('data-slot', 'separator');
    separator.className = 'bg-border shrink-0 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px hidden lg:block';

    themeButton.parentNode.insertBefore(separator, themeButton);
    themeButton.parentNode.insertBefore(langSelector, themeButton);
  }
});
