const convertLocationSearchToString = (
  locationSearch: Record<string, boolean | number | string | undefined>
): string => {
  return Object.keys(locationSearch)
    .filter((optionName: string) => locationSearch[optionName] !== undefined)
    .map((optionName: string) => {
      const optionValue = window.encodeURIComponent(
        String(locationSearch[optionName])
      );
      return `${optionName}=${optionValue}`;
    })
    .join('&');
};

export { convertLocationSearchToString };
