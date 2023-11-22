import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Article } from '../../types/article';
import { apiArticles } from '../../api/article';
import { ArticlePreview } from '../../components/ArticlePreview';
import { useRequest } from '../../hooks/query';

export default function Feed() {
  const { username } = useParams();
  const { pathname } = useLocation();

  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesCount, setArticlesCount] = useState(0);

  const { loading, request } = useRequest();

  useEffect(() => {
    if (!username) return;
    const key = pathname.endsWith('favorites') ? 'favorited' : 'author';
    const value = username.replace(/^@/, '');

    request(async () => {
      await apiArticles({
        [key]: value,
        limit: 5,
        offset: 0,
      }).then(({ articles, articlesCount }) => {
        setArticles(articles);
        setArticlesCount(articlesCount);
      });
    });
  }, [username, pathname]);

  const onArticleChange = (updateArticle: Article) => {
    setArticles(prevState =>
      prevState.map(article =>
        article.slug === updateArticle.slug ? updateArticle : article
      )
    );
  };

  return (
    <>
      {loading ? (
        <div className="article-preview">Loading articles...</div>
      ) : articlesCount === 0 ? (
        <div className="article-preview">No articles are here... yet.</div>
      ) : (
        articles.map(article => (
          <ArticlePreview
            key={article.slug}
            article={article}
            onChange={onArticleChange}
          />
        ))
      )}
    </>
  );
}
