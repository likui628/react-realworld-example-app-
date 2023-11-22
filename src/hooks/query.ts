import { useState } from 'react';

export function useRequest() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const request = async (api: () => Promise<void>): Promise<void> => {
    try {
      setLoading(true);
      await api();
    } catch (e: any) {
      const errorMessage = e.response.data.errors;
      const errors = Object.entries(errorMessage).map(
        ([key, value]) => `${key} ${value}`
      );
      setErrors(errors);
    } finally {
      setLoading(false);
    }
  };

  return { loading, errors, request };
}
