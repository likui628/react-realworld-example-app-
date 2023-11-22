import { AuthenticatedWrapper } from './AuthenticatedWrapper';
import { apiFavoriteArticle, apiUnfavoriteArticle } from '../api/article';
import { ArticleMetaProps } from './ArticleMeta';

interface ArticleFavoriteButtonProps extends ArticleMetaProps {
  className?: string;
  showLabel?: boolean;
}
export function ArticleFavoriteButton({
  article,
  onChange,
  className,
  showLabel,
}: ArticleFavoriteButtonProps) {
  const onFavoriteArticle = async () => {
    const { slug, favorited } = article;
    const queryApi = favorited ? apiUnfavoriteArticle : apiFavoriteArticle;
    const updatedArticle = await queryApi(slug);

    onChange(updatedArticle);
  };

  return (
    <AuthenticatedWrapper>
      <button
        onClick={onFavoriteArticle}
        className={`btn btn-sm ${className} ${
          article.favorited ? 'btn-primary' : 'btn-outline-primary'
        }`}
      >
        <i className="ion-heart"></i>
        {showLabel ? (
          <>
            &nbsp; {article.favorited ? 'Unfavorite' : 'Favorite'} Post &nbsp;
            <span className="counter">({article.favoritesCount})</span>
          </>
        ) : (
          <>
            &nbsp;<span className="counter">{article.favoritesCount}</span>
          </>
        )}
      </button>
    </AuthenticatedWrapper>
  );
}
