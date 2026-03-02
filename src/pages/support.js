import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import * as styles from './support.module.css';

import Banner from '../components/Banner';
import Contact from '../components/Contact';
import Layout from '../components/Layout/Layout';
import ThemeLink from '../components/ThemeLink';
import Container from '../components/Container';

const SupportPage = (props) => {
  const subpages = [
    { title: 'Contact', key: 'contact' },
    { title: 'Artist Statement', key: 'statement' },
    { title: 'CV', key: 'cv' },
    { title: 'Selected Works & Exhibitions', key: 'works' },
  ];

  const [current, setCurrent] = useState(subpages[0]);

  const renderElement = (key) => {
    let tempElement = <React.Fragment />;

    switch (key) {
      case 'contact':
        tempElement = <Contact />;
        break;

      case 'statement':
        tempElement = (
          <div>
            <h2>Artist Statement</h2>
            <p>
              Determined, yet undecided—my practice explores generative systems
              and latent states of possibility, where meaning has not yet fully
              settled.
            </p>
            <p>
              Working with AI-generated imagery, real-time systems, and
              interactive structures, I focus on moments of transition—when
              invisible data becomes perceptible, and form emerges without
              resolution.
            </p>
            <p>
              Rather than presenting fixed outcomes, my work constructs
              environments in which images continuously transform through
              uncertainty, delay, and interaction. Instability is treated not as
              failure, but as a productive condition that allows new
              interpretations and futures to unfold.
            </p>
          </div>
        );
        break;

      case 'cv':
        tempElement = (
          <div>
            <h2>CV</h2>
            <p><strong>Name</strong><br />Kim Mun Jung</p>

            <p><strong>Education</strong><br />
              BFA, Printmaking, Hongik University, Seoul<br />
              MFA, Fine Art, Tama Art University, Tokyo
            </p>

            <p><strong>Practice</strong><br />
              Media Art, Generative AI, Interactive Systems, Audiovisual Environments
            </p>
          </div>
        );
        break;

      case 'works':
        tempElement = (
          <div>
            <h2>Selected Works & Exhibitions</h2>
            <ul>
              <li><strong>Latent Becomes Potential</strong> — AI-generated video work</li>
              <li>Invited Screening, Earth Film Festival (Korea)</li>
              <li>Workshop & Research Forum, Tainan National University of the Arts</li>
              <li>Exhibition, Cheonggyecheon Ocean Soul</li>
            </ul>
          </div>
        );
        break;

      default:
        break;
    }

    return tempElement;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (props.location.hash) {
      const hash = props.location.hash.substring(1);
      const tempCurrent = subpages.find((detail) => detail.key === hash);
      if (tempCurrent && tempCurrent.key !== current.key) {
        setCurrent(tempCurrent);
        window.scrollTo(0, 400);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location]);

  return (
    <Layout disablePaddingBottom>
      <div className={styles.root}>
        <Banner
          maxWidth={'700px'}
          name={current.title}
          bgImage={'/about.png'}
          color={'var(--standard-white)'}
          height={'300px'}
        />

        <div className={styles.navContainer}>
          {subpages.map((details) => (
            <ThemeLink
              key={details.key}
              isActive={current.key === details.key}
              to={`/support#${details.key}`}
              onClick={() => navigate(`/support#${details.key}`)}
            >
              {details.title}
            </ThemeLink>
          ))}
        </div>

        <div className={styles.pageContainer}>
          <Container size={'large'} spacing={'min'}>
            {subpages.map((details) => (
              <div
                key={details.key}
                className={`${styles.content} ${
                  current.key === details.key ? styles.show : styles.hide
                }`}
              >
                {renderElement(details.key)}
              </div>
            ))}
          </Container>
        </div>
      </div>
    </Layout>
  );
};

export default SupportPage;
