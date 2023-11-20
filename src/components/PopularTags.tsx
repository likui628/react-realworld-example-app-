import { useEffect, useState } from 'react';
import { apiGetAllTags } from '../api/tags';

interface PopularTagsProps {
  onChange: (tag: string) => void;
}

export function PopularTags({ onChange }: PopularTagsProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await apiGetAllTags().then(tags => setTags(tags));
      setLoading(false);
    })();
  }, []);

  return (
    <div className="sidebar">
      <p>Popular Tags</p>

      <div className="tag-list">
        {loading ? (
          <div>Loading Tags...</div>
        ) : (
          tags.map(tag => (
            <a
              href="#"
              key={tag}
              className="tag-pill tag-default"
              onClick={() => onChange(tag)}
            >
              {tag}
            </a>
          ))
        )}
      </div>
    </div>
  );
}
