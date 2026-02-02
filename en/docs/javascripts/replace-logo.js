const selector = '#inner-body > header > div > div > a > span';

const replaceLogo = () => {
  const logo = document.querySelector(selector);
  if (!logo) return;

  logo.innerHTML = `
    <img src="/en/assets/logo.svg" alt="Eitri Docs" class="h-8 w-auto" />
  `;
};

replaceLogo();