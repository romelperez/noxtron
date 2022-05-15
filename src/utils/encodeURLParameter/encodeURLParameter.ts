const encodeURLParameter = (parameter: string | undefined | null): string => {
  try {
    return window.btoa(parameter || '');
  } catch (error) {
    console.error(error);
    return '';
  }
};

export { encodeURLParameter };
