const decodeURLParameter = (parameter: string | undefined | null): string => {
  try {
    return window.atob(window.decodeURI(parameter || ''));
  } catch (error) {
    console.error(error);
    return '';
  }
};

export { decodeURLParameter };
