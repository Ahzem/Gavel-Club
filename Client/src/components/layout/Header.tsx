import { Navigation } from './Navigation';
import { SITE_CONFIG } from '../../lib/constants';

export function Header() {
  return (
    <header className="layout__header">
      <div className="header__container">
        <div className="header__logo">
          <img src="/logo.png" alt="Logo" className="header__logo-icon"  />
          <span>{SITE_CONFIG.name}</span>
        </div>
        <Navigation className="nav" />
      </div>
    </header>
  );
}