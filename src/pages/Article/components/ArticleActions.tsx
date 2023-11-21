import { Article } from '../../../types/article';
import { ArticleProps } from '../types';
import { Link } from 'react-router-dom';
import { formatTime } from '../../../utils';

export function ArticleActions({ article }: ArticleProps) {
  return (
    <div className="article-actions">
      <div className="article-meta">
        <Link to={`/profile/${article?.author.username}`}>
          <img alt="" src={article?.author.image} />
        </Link>
        <div className="info">
          <Link to={`/profile/${article?.author.username}`} className="author">
            {article?.author.username}
          </Link>
          <span className="date">
            {article?.updatedAt && formatTime(article.updatedAt)}
          </span>
        </div>
        <button className="btn btn-sm btn-outline-secondary">
          <i className="ion-plus-round"></i>
          &nbsp; {article?.author.following ? 'Unfollow' : 'Follow'}&nbsp;
          {article?.author.username}
        </button>
        &nbsp;
        <button className="btn btn-sm btn-outline-primary">
          <i className="ion-heart"></i>
          &nbsp; Favorite Post <span className="counter">(29)</span>
        </button>
      </div>
    </div>
  );
}
