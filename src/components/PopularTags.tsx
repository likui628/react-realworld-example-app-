import { useEffect, useState } from 'react';
import { apiGetAllTags } from '../api/tags';

export function PopularTags() {
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
            <a href="/" key={tag} className="tag-pill tag-default">
              {tag}
            </a>
          ))
        )}
      </div>
    </div>
  );
}
