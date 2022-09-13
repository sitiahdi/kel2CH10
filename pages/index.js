import Head from "next/head";
import Link from "next/link";
import styles from "../styles/landingPage.module.css";

function Home() {
  return (
    <div>
      <Head>
        <title>PLAY</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>

			<div id="main" className={`${styles.main} d-flex justify-content-center align-content-center`}>
				<div className="main-container d-flex justify-content-center align-content-center flex-column">
					<h1 className="main-title text-center fw-bold text-white mb-5 display-3">PLAY TRADITIONAL GAME</h1>
					<h3 className="main-text text-center fs-2 text-white px-2 mb-5">Experience new traditional game play</h3>
					<div className="d-flex justify-content-center align-content-center mt-4">
						<Link href="/game-list">
							<a className="text-decoration-none link-dark">
								<button type="button" className={`${styles.button} btn btn-lg text-nowrap`}>
									<strong>PLAY NOW</strong>
								</button>
							</a>
						</Link>
					</div>
				</div>
			</div>

      <div id="features" className={styles.features}>
        <div className="features-container">
          <div className="row">
            <div className="col-sm-2 col-md-3 col-lg-6 col-xl-7"></div>
            <div className="col-sm-8 col-md-6 col-lg-5 col-xl-4">
              <h1 className={`${styles.featurestitle} fs-2 text-white mb-2`}>What so special?</h1>
              <h3 className={`${styles.featurestext} text-white mb-5 pb-4 display-2`}>FEATURES</h3>
              <ul className={`${styles.marker} ps-3`}>
                <li className={styles.marker1}>
                  <div className={`${styles.first} pb-5`}>
                    <h2 className="features1 ms-4 fs-3 text-warning mb-4">TRADITIONAL GAMES</h2>
                    <p className={`${styles.firstdetail} features1-detail ms-4`}>If you miss your childhood, we provide many traditional games here</p>
                    <span className={styles.markerspan}></span>
                  </div>
                </li>
                <li className={styles.markerelse}>
                  <h2 className="features2 ms-4 fs-3 text-warning mb-5">GAME SUIT</h2>
                </li>
                <li className={styles.markerelse}>
                  <h2 className="features3 ms-4 fs-3 text-warning">TBD</h2>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div id="quotes" className={styles.quotes}>
        <div className="quotes-container">
          <div className="row">
            <div className="col-lg-5 p-5 d-flex flex-column justify-content-center align-content-center">
              <div className={styles.quotesbanner}>
                <h1 className="features-text text-white text-nowrap mb-4 display-2">TOP SCORES</h1>
                <p className={styles.quotestext}>This top score from various games provided on this platform</p>
                <Link href="/profile">
                  <a>
                    <button type="button" className={`${styles.button} btn btn-lg text-black mt-4`}>
                      <strong>See More</strong>
                    </button>
                  </a>
                </Link>
              </div>
            </div>
            <div className={`${styles.cardcontainer} card-container col-lg-5 offset-lg-1`}>
              <div className="row">
                <div className="col-sm-5 offset-lg-3 mb-4">
                  <div className={`${styles.card} card`}>
                    <div className="card-header mb-0 pb-0 d-flex flex-row align-content-center justify-content-between">
                      <div className="card-header1 d-flex flex-row">
                        <div className={styles.photo1}></div>
                        <div className={styles.photoshadow}></div>
                        <div className="card-header-text d-flex flex-column justify-content-center align-content-center ps-4">
                          <h3 className={styles.name}>Evan Lahti</h3>
                          <p className={styles.job}>PC Gamer</p>
                        </div>
                      </div>
                      <div className={styles.icon}></div>
                    </div>
                    <div className="card-body mt-0 pt-3 mb-xl-2">
                      <h6 className={styles.comment}>“One of my gaming highlights of /the year.”</h6>
                      <p className={styles.date}>June 18, 2021</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-5 mb-4">
                  <div className={`${styles.card} card`}>
                    <div className="card-header mb-0 pb-0 d-flex flex-row align-content-center justify-content-between">
                      <div className="card-header1 d-flex flex-row">
                        <div className={styles.photo2}></div>
                        <div className={styles.photoshadow}></div>
                        <div className="card-header-text ps-4">
                          <h3 className={styles.name}>Jada Griffin</h3>
                          <p className={styles.job}>Nerdreactor</p>
                        </div>
                      </div>
                      <div className={styles.icon}></div>
                    </div>
                    <div className="card-body mt-0 pt-2">
                      <h6 className={styles.comment}>“The next big thing in the world of streaming and survival games.”</h6>
                      <p className={styles.date}>June 10, 2021</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-5 offset-lg-3">
                  <div className={`${styles.card} card`}>
                    <div className="card-header mb-0 pb-0 d-flex flex-row align-content-center justify-content-between">
                      <div className="card-header1 d-flex flex-row">
                        <div className={styles.photo3}></div>
                        <div className={styles.photoshadow}></div>
                        <div className="card-header-text d-flex flex-column justify-content-center align-content-center ps-4">
                          <h3 className={styles.name}>Aaron Williams</h3>
                          <p className={styles.job}>Uproxx</p>
                        </div>
                      </div>
                      <div className={styles.icon}></div>
                    </div>
                    <div className="card-body mt-0 pt-2">
                      <h6 className={styles.comment}>“Snoop Dogg Playing The Wildly Entertaining ‘SOS’ Is Ridiculous.”</h6>
                      <p className={styles.date}>December 24, 2018</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="news" className={styles.news}>
        <div className="row">
          <div className="col-lg-6 col-md-1"></div>
          <div className="col-lg-6 col-md-10 col-sm-12">
            <h1 className={`${styles.newstitle} fs-2 text-white mb-3`}>Want to stay in touch?</h1>
            <h3 className={`${styles.newstext} text-white mb-4 display-2`}>NEWSTELLER SUBSCRIBE</h3>
            <p className={`${styles.newsdesc} text-white mb-5`}>
              In order to start receiving our news, all you have to do is enter your email address. Everything else will be taken care of by us. We will send you emails containing information about game. We dont spam.
            </p>
            <div className="news-input d-sm-flex flex-row flex-nowrap" readOnly>
              <form className={`${styles.formfloat} form-floating mb-3`}>
                <input type="email" className={`${styles.formcontrol} form-control fs-5 text-warning`} id="floatingInputValue" placeholder="youremail@binar.co.id" defaultValue="youremail@binar.co.id" />
                <label htmlFor="floatingInputValue" className={`${styles.formlabel} form-label`}>
                  Your email adress
                </label>
              </form>
              <div className={styles.newsbutton}>
                <button type="button" className={`${styles.button} btn btn-lg ms-sm-3`}>
                  <strong>Subscribe Now</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
