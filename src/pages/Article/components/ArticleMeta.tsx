import { ArticleProps } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { formatTime } from '../../../utils';
import { useAppSelector } from '../../../state/storeHooks';
import {
  apiDeleteArticle,
  apiFavoriteArticle,
  apiUnfavoriteArticle,
} from '../../../api/article';
import { apiFollowUser, apiUnfollowUser } from '../../../api/user';
import { Article } from '../../../types/article';

export interface ArticleMetaProps extends ArticleProps {
  onChange: (article: Article) => void;
}
export function ArticleMeta({ article, onChange }: ArticleMetaProps) {
  const user = useAppSelector(state => state.auth.user);
  const isAuthor = user?.username === article.author.username;

  const navigate = useNavigate();
  const onDeleteArticle = async () => {
    await apiDeleteArticle(article.slug);
    navigate('/');
  };

  const onFollowUser = async () => {
    const { username, following } = article.author;
    const queryApi = following ? apiUnfollowUser : apiFollowUser;
    const updatedProfile = await queryApi(username);

    onChange({ ...article, author: { ...updatedProfile } });
  };

  const onFavoriteArticle = async () => {
    const { slug, favorited } = article;
    const queryApi = favorited ? apiUnfavoriteArticle : apiFavoriteArticle;
    const updatedArticle = await queryApi(slug);

    onChange(updatedArticle);
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
          <button
            onClick={onFollowUser}
            className={`btn btn-sm ${
              article.author.following
                ? 'btn-secondary'
                : 'btn-outline-secondary'
            }`}
          >
            <i className="ion-plus-round"></i>
            &nbsp; {article.author.following ? 'Unfollow' : 'Follow'}&nbsp;
            {article.author.username}
          </button>
          &nbsp;
          <button
            onClick={onFavoriteArticle}
            className={`btn btn-sm ${
              article.favorited ? 'btn-primary' : 'btn-outline-primary'
            }`}
          >
            <i className="ion-heart"></i>
            &nbsp; {article.favorited ? 'Unfavorite' : 'Favorite'} Post &nbsp;
            <span className="counter">({article.favoritesCount})</span>
          </button>
        </>
      )}
    </div>
  );
}
