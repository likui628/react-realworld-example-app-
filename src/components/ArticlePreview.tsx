import { Article } from '../types/article';
import { formatTime } from '../utils';
import { Link } from 'react-router-dom';
import { ArticleFavoriteButton } from './ArticleFavoriteButton';

interface ArticlePreviewProps {
  article: Article;
  onChange: (article: Article) => void;
}

export function ArticlePreview({ article, onChange }: ArticlePreviewProps) {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profile/${article.author.username}`}>
          <img alt="" src={article.author.image} />
        </Link>
        <div className="info">
          <Link to={`/profile/${article.author.username}`} className="author">
            {article.author.username}
          </Link>
          <span className="date">{formatTime(article.updatedAt)}</span>
        </div>
        <ArticleFavoriteButton
          className="pull-xs-right"
          onChange={onChange}
          article={article}
        />
      </div>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
}
