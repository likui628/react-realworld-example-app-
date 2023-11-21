import { Link } from 'react-router-dom';
import { formatTime } from '../../../utils';
import { ArticleProps } from '../types';

export function ArticleBanner({ article }: ArticleProps) {
  return (
    <div className="banner">
      <div className="container">
        <h1>{article?.title}</h1>

        <div className="article-meta">
          <Link to={`/profile/${article?.author.username}`}>
            <img alt="" src={article?.author.image} />
          </Link>
          <div className="info">
            <Link to={`/profile/${article?.author.username}`}>
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
          &nbsp;&nbsp;
          <button className="btn btn-sm btn-outline-primary">
            <i className="ion-heart"></i>
            &nbsp; Favorite Post&nbsp;
            <span className="counter">({article?.favoritesCount})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
