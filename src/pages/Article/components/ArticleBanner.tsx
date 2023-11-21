import { ArticleProps } from '../types';
import { ArticleMeta } from './ArticleMeta';
export function ArticleBanner({ article }: ArticleProps) {
  return (
    <div className="banner">
      <div className="container">
        <h1>{article.title}</h1>

        <ArticleMeta article={article} />
      </div>
    </div>
  );
}
