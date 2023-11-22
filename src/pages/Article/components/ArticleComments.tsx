import React, { useEffect, useState } from 'react';
import {
  apiAddArticleComment,
  apiArticleComments,
  apiDeleteArticleComment,
} from '../../../api/comment';
import { Comment } from '../../../types/comment';
import { Link } from 'react-router-dom';
import { formatTime } from '../../../utils';
import { useAppSelector } from '../../../hooks/store';

interface ArticleCommentsProps {
  slug: string;
}
export function ArticleComments({ slug }: ArticleCommentsProps) {
  const user = useAppSelector(state => state.auth.user);

  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    apiArticleComments(slug).then(setComments);
  }, []);

  const [comment, setComment] = useState('');

  const onPostComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await apiAddArticleComment(slug, comment).then(comment => {
      setComments([comment, ...comments]);
    });
    setComment('');
  };

  const onDeleteComment = async (id: number) => {
    await apiDeleteArticleComment(slug, id);
    setComments(comments.filter(comment => comment.id !== id));
  };

  return (
    <div className="row">
      <div className="col-xs-12 col-md-8 offset-md-2">
        {user ? (
          <>
            <form className="card comment-form" onSubmit={onPostComment}>
              <div className="card-block">
                <textarea
                  className="form-control"
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="card-footer">
                <img alt="" src={user.image} className="comment-author-img" />
                <button className="btn btn-sm btn-primary" type="submit">
                  Post Comment
                </button>
              </div>
            </form>

            {comments.map(comment => (
              <div className="card" key={comment.id}>
                <div className="card-block">
                  <p className="card-text">{comment.body}</p>
                </div>
                <div className="card-footer">
                  <Link
                    to={`/profile/${comment.author.username}`}
                    className="comment-author"
                  >
                    <img
                      alt=""
                      src={comment.author.image}
                      className="comment-author-img"
                    />
                  </Link>
                  &nbsp;
                  <Link
                    to={`/profile/${comment.author.username}`}
                    className="comment-author"
                  >
                    {comment.author.username}
                  </Link>
                  <span className="date-posted">
                    {formatTime(comment.updatedAt)}
                  </span>
                  {comment.author.username === user.username && (
                    <span
                      className="mod-options"
                      onClick={() => onDeleteComment(comment.id)}
                    >
                      <i className="ion-trash-a"></i>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>
            <Link to="/login">Sign in</Link> or&nbsp;
            <Link to="/register">sign up</Link>&nbsp; to add comments on this
            article.
          </p>
        )}
      </div>
    </div>
  );
}
