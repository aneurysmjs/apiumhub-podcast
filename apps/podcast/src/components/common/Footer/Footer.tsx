import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import './Footer.css';

const Footer: FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <section className="footer__copyright">
        <p className="footer__author">{t('footer.author')}</p>
      </section>
    </footer>
  );
};

export default Footer;
