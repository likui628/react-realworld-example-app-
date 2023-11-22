import { ArticleProps } from '../pages/Article/types';
import { Link, useNavigate } from 'react-router-dom';
import { formatTime } from '../utils';
import { useAppSelector } from '../hooks/store';
import { apiDeleteArticle } from '../api/article';
import { apiFollowUser, apiUnfollowUser } from '../api/user';
import { Article } from '../types/article';
import { AuthenticatedWrapper } from './AuthenticatedWrapper';
import { ArticleFavoriteButton } from './ArticleFavoriteButton';

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
          <AuthenticatedWrapper>
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
          </AuthenticatedWrapper>
          &nbsp;
          <ArticleFavoriteButton
            onChange={onChange}
            article={article}
            showLabel={true}
          />
        </>
      )}
    </div>
  );
}
