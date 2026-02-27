export const swrConfig = {
  fetcher: (url: string) => fetch(url).then((res) => res.json()),
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};
