import { Article } from '../types/article';
import { formatTime } from '../utils';
import { Link } from 'react-router-dom';

interface ArticlePreviewProps {
  article: Article;
}

export function ArticlePreview({ article }: ArticlePreviewProps) {
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
        <button
          className={`btn ${
            article.favorited ? 'btn-primary' : 'btn-outline-primary'
          } btn-sm pull-xs-right`}
        >
          <i className="ion-heart"></i> {article.favoritesCount}
        </button>
      </div>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
}
