const encodeSourceCode = (code: string | undefined | null): string => {
  try {
    return window.encodeURI(window.btoa(code || ''));
  } catch (error) {
    console.error(error);
    return '';
  }
};

export { encodeSourceCode };
