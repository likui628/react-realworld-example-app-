export const generateURLSearchParams = (body: Record<string, any>) => {
  let params = new URLSearchParams();
  Object.entries(body).forEach(([key, val]) => {
    params.append(key, val);
  });
  return params.toString();
};

export const formatTime = (time: string) => {
  return new Date(time).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
