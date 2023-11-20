import { PopularTags } from '../components/PopularTags';
import { ArticlePreview } from '../components/ArticlePreview';
import { useAppSelector } from '../state/storeHooks';
import { useEffect, useState } from 'react';
import { Pagination } from '../components/Pagination';
import { Article } from '../types/article';
import {
  apiArticles,
  apiFeedArticles,
  ARTICLE_PAGE_LIMIT,
} from '../api/article';

export function Home() {
  const isAuthenticated = useAppSelector(state => !!state.auth.user);
  const [activeTab, setActiveTab] = useState<'feed' | 'global' | 'tag'>('feed');

  const [tag, setTag] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const [loading, setLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesCount, setArticlesCount] = useState(0);

  useEffect(() => {
    setArticles([]);
    setArticlesCount(0);

    let apiQuery = null;
    switch (activeTab) {
      case 'feed':
        apiQuery = apiFeedArticles({
          limit: ARTICLE_PAGE_LIMIT,
          offset: (page - 1) * 10,
        });
        break;
      case 'global':
      case 'tag':
        apiQuery = apiArticles({
          tag: activeTab === 'tag' ? tag : undefined,
          limit: ARTICLE_PAGE_LIMIT,
          offset: (page - 1) * 10,
        });
        break;
    }
    setLoading(true);
    apiQuery
      .then(({ articles, articlesCount }) => {
        setArticles(articles);
        setArticlesCount(articlesCount);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [tag, page, activeTab]);

  function getNavClass(tabName: string) {
    return activeTab === tabName ? 'nav-link active' : 'nav-link';
  }

  return (
    <>
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  {isAuthenticated && (
                    <li className="nav-item">
                      <a
                        className={getNavClass('feed')}
                        href="#"
                        onClick={() => setActiveTab('feed')}
                      >
                        Your Feed
                      </a>
                    </li>
                  )}

                  <li className="nav-item">
                    <a
                      className={getNavClass('global')}
                      href="#"
                      onClick={() => setActiveTab('global')}
                    >
                      Global Feed
                    </a>
                  </li>
                  {tag && (
                    <li className="nav-item">
                      <a
                        className={getNavClass('tag')}
                        href="#"
                        onClick={() => setActiveTab('tag')}
                      >
                        # tag
                      </a>
                    </li>
                  )}
                </ul>
              </div>
              {loading ? (
                <div className="article-preview">Loading articles...</div>
              ) : articlesCount === 0 ? (
                <div className="article-preview">
                  No articles are here... yet.
                </div>
              ) : (
                articles.map(article => (
                  <ArticlePreview key={article.slug} article={article} />
                ))
              )}
              <Pagination count={articlesCount} page={page} setPage={setPage} />
            </div>

            <div className="col-md-3">
              <PopularTags
                onChange={(tag: string) => {
                  setActiveTab('tag');
                  setTag(tag);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
