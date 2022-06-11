const isolate = (url: string) => {
  window.open(`${window.location.origin}${url}`, 'sandbox');
};

export { isolate };
