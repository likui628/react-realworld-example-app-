import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Article } from '../../types/article';
import { apiArticles, ArticleQueryParams } from '../../api/article';
import { ArticlePreview } from '../../components/ArticlePreview';

export default function Feed() {
  const { username } = useParams();
  const { pathname } = useLocation();

  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesCount, setArticlesCount] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!username) return;
    const key = pathname.endsWith('favorites') ? 'favorited' : 'author';
    const value = username.replace(/^@/, '');
    setLoading(true);
    apiArticles({
      [key]: value,
      limit: 5,
      offset: 0,
    })
      .then(({ articles, articlesCount }) => {
        setArticles(articles);
        setArticlesCount(articlesCount);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [username, pathname]);
  return (
    <>
      {loading ? (
        <div className="article-preview">Loading articles...</div>
      ) : articlesCount === 0 ? (
        <div className="article-preview">No articles are here... yet.</div>
      ) : (
        articles.map(article => (
          <ArticlePreview key={article.slug} article={article} />
        ))
      )}
    </>
  );
}
