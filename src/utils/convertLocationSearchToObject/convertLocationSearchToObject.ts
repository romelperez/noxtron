const convertLocationSearchToObject = (
  locationSearch: string
): Record<string, string> => {
  return locationSearch
    .replace(/^\?/, '')
    .split('&')
    .filter(Boolean)
    .reduce((allOptions, option) => {
      const [optionName, optionValue] = option.split('=').slice(0, 2);
      const value = window.decodeURIComponent(optionValue);
      return { ...allOptions, [optionName]: value };
    }, {});
};

export { convertLocationSearchToObject };
