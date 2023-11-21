import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiArticle } from '../../api/article';
import { Article as ArticleType } from '../../types/article';
import { ArticleComments } from './components/ArticleComments';
import { ArticleBanner } from './components/ArticleBanner';
import { ArticleActions } from './components/ArticleActions';
import { transformNewlines } from '../../utils';

export function Article() {
  const { slug } = useParams();

  const [article, setArticle] = useState<ArticleType>();
  useEffect(() => {
    if (!slug) return;
    apiArticle(slug).then(setArticle);
  }, [slug]);

  return (
    <div className="article-page">
      {article && (
        <>
          <ArticleBanner article={article} />

          <div className="container page">
            <div className="row article-content">
              <div
                className="col-md-12"
                dangerouslySetInnerHTML={{
                  __html: transformNewlines(article?.body || ''),
                }}
              />
            </div>

            <hr />
            <ArticleActions article={article} />
          </div>
          <ArticleComments slug={article.slug} />
        </>
      )}
    </div>
  );
}
