const decodeURLParameter = (parameter: string | undefined | null): string => {
  try {
    return window.atob(parameter || '');
  } catch (error) {
    console.error(error);
    return '';
  }
};

export { decodeURLParameter };
