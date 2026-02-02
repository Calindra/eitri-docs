const footerSelector = '.text-muted-foreground.w-full.text-center.text-xs';

const replaceFooter = () => {
  const footer = document.querySelector(footerSelector);
  if (!footer) return;

  footer.innerHTML = `
    © Eitri 2026 <a href="https://eitri.tech" target="_blank" rel="noopener">Eitri</a> ·
    <a href="https://www.linkedin.com/company/eitritech/" target="_blank" rel="noopener">LinkedIn</a> ·
    <a href="https://www.instagram.com/eitritech/" target="_blank" rel="noopener">Instagram</a>
  `;
};

replaceFooter();
