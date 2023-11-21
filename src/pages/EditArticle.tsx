import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { apiAddArticle, apiArticle, apiUpdateArticle } from '../api/article';
import { NewArticle } from '../types/article';

export function EditArticle() {
  const { slug } = useParams();
  const isEdit = !!slug;

  const [article, setArticle] = useState<NewArticle>({
    title: '',
    description: '',
    body: '',
    tagList: [],
  });
  const [tag, setTag] = useState<string>('');

  useEffect(() => {
    if (!slug) return;
    apiArticle(slug).then(setArticle);
  }, []);

  const onChange = (val: Partial<NewArticle>) => {
    setArticle(prev => ({ ...prev, ...val }));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setArticle({ ...article, tagList: [...article.tagList, tag] });
      setTag('');
    }
  };
  const removeTag = (tagToRemove: string) => {
    setArticle({
      ...article,
      tagList: [...article.tagList.filter(tag => tag !== tagToRemove)],
    });
  };

  const navigate = useNavigate();
  const [error, setError] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await (isEdit
        ? apiUpdateArticle(slug, article)
        : apiAddArticle(article));
      navigate(`/article/${res.slug}`);
    } catch (e: any) {
      const errorMessage = e.response.data.errors;
      const errors = Object.entries(errorMessage).map(
        ([key, value]) => `${key} ${value}`
      );
      setError(errors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ul className="error-messages">
              {error.map((err, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
            <form onSubmit={onSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    value={article.title}
                    disabled={loading}
                    onInput={e => onChange({ title: e.currentTarget.value })}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    value={article.description}
                    disabled={loading}
                    onInput={e =>
                      onChange({ description: e.currentTarget.value })
                    }
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    value={article.body}
                    disabled={loading}
                    onInput={e => onChange({ body: e.currentTarget.value })}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    value={tag}
                    disabled={loading}
                    onInput={e => setTag(e.currentTarget.value)}
                    onKeyDown={onKeyDown}
                  />
                  <div className="tag-list">
                    {article.tagList.map(tag => (
                      <span
                        className="tag-default tag-pill"
                        onClick={() => removeTag(tag)}
                        key={tag}
                      >
                        <i className="ion-close-round"></i>
                        {tag}
                      </span>
                    ))}
                  </div>
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="submit"
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
