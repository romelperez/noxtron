const decodeSourceCode = (code: string | undefined | null): string => {
  try {
    return window.atob(window.decodeURI(code || ''));
  } catch (error) {
    console.error(error);
    return '';
  }
};

export { decodeSourceCode };
