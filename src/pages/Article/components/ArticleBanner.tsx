import { ArticleMeta, ArticleMetaProps } from './ArticleMeta';

export function ArticleBanner({ article, onChange }: ArticleMetaProps) {
  return (
    <div className="banner">
      <div className="container">
        <h1>{article.title}</h1>

        <ArticleMeta article={article} onChange={onChange} />
      </div>
    </div>
  );
}
