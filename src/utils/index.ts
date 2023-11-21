import snarkdown from 'snarkdown';

export const generateURLSearchParams = (body: Record<string, any>) => {
  let params = new URLSearchParams();
  Object.entries(body).forEach(([key, val]) => {
    val && params.append(key, val);
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

export const transformNewlines = (text: string) => {
  return text.replaceAll(/(?:\\r\\n|\\r|\\n)/g, '<br />');
};

export const markdown = (text: string) => {
  return snarkdown(transformNewlines(text));
};
