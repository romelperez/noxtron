const convertLocationSearchToString = (
  locationSearch: Record<string, boolean | number | string | undefined>
): string => {
  return Object.keys(locationSearch)
    .filter((optionName: string) => locationSearch[optionName] !== undefined)
    .map(
      (optionName: string) =>
        `${optionName}=${String(locationSearch[optionName])}`
    )
    .join('&');
};

export { convertLocationSearchToString };
