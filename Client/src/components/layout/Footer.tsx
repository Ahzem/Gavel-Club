import { SITE_CONFIG } from '../../lib/constants';

export function Footer() {
  return (
    <footer className="layout__footer">
      <div className="footer__container">
        <div>
          <p className="footer__copyright">
            © {new Date().getFullYear()} {SITE_CONFIG.name}
          </p>
        </div>
        <div>
          <p className="footer__disclaimer">
            {SITE_CONFIG.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}