import { ArticleProps } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { formatTime } from '../../../utils';
import { useAppSelector } from '../../../state/storeHooks';
import { apiDeleteArticle } from '../../../api/article';

export function ArticleMeta({ article }: ArticleProps) {
  const user = useAppSelector(state => state.auth.user);
  const isAuthor = user?.username === article.author.username;

  const navigate = useNavigate();
  const onDeleteArticle = async () => {
    await apiDeleteArticle(article.slug);
    navigate('/');
  };
  return (
    <div className="article-meta">
      {isAuthor ? (
        <>
          <Link
            to={`/editor/${article.slug}`}
            className="btn btn-outline-secondary btn-sm"
          >
            <i className="ion-edit"></i> Edit Article
          </Link>
          &nbsp;
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={onDeleteArticle}
          >
            <i className="ion-trash-a"></i> Delete Article
          </button>
        </>
      ) : (
        <>
          <Link to={`/profile/${article.author.username}`}>
            <img alt="" src={article.author.image} />
          </Link>
          <div className="info">
            <Link to={`/profile/${article.author.username}`} className="author">
              {article.author.username}
            </Link>
            <span className="date">{formatTime(article.updatedAt)}</span>
          </div>
          <button className="btn btn-sm btn-outline-secondary">
            <i className="ion-plus-round"></i>
            &nbsp; {article.author.following ? 'Unfollow' : 'Follow'}&nbsp;
            {article.author.username}
          </button>
          &nbsp;
          <button className="btn btn-sm btn-outline-primary">
            <i className="ion-heart"></i>
            &nbsp; Favorite Post &nbsp;
            <span className="counter">({article.favoritesCount})</span>
          </button>
        </>
      )}
    </div>
  );
}
