import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { PopularTags } from '../components/PopularTags';
import { ArticlePreview } from '../components/ArticlePreview';

export function Home() {
  return (
    <>
      <Header />
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link disabled" href="/">
                      Your Feed
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="/">
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>

              <ArticlePreview />

              <ArticlePreview />

              <ArticlePreview />
            </div>

            <div className="col-md-3">
              <PopularTags />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
