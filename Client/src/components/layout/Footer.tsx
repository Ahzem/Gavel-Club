import { Facebook, Github, Instagram, Mail, User } from "lucide-react";
import { SITE_CONFIG } from "../../lib/constants";

export function Footer() {
  return (
    <footer className="layout__footer">
      <div className="footer__container">
        <div className="footer__grid">
          {/* About Section */}
          <div className="footer__section">
            <h3 className="footer__title">About Us</h3>
            <p className="footer__text">{SITE_CONFIG.description}</p>
            <div className="footer__social">
              <a href="https://facebook.com" className="footer__social-link">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" className="footer__social-link">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__section">
            <h3 className="footer__title">Quick Links</h3>
            <ul className="footer__links">
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/activities">Activities</a>
              </li>
              <li>
                <a href="/membership">Join Us</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer__section">
            <h3 className="footer__title">Contact Us</h3>
            <address className="footer__address">
              Institute of Technology
              <br />
              University of Moratuwa
              <br />
              Diyagama, Homagama
              <br />
              Sri Lanka
            </address>
            <a
              href="mailto:gavelclub@itum.mrt.ac.lk"
              className="footer__contact-link"
            >
              gavelclub@itum.mrt.ac.lk
            </a>
          </div>

          {/* Admin & Developer */}
          <div className="footer__section">
            <h3 className="footer__title">Portal</h3>
            <div className="footer__admin">
              <a href="/adminlogin" className="footer__admin-link">
                <User size={16} />
                Sign in as Admin
              </a>
            </div>
            <div className="footer__developer">
              <p className="footer__developer-text">Developed by:</p>
              <a
                href="https://github.com/Ahzem"
                className="footer__developer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={16} />
                Ahzem
              </a>
              <a
                href="mailto:muhammadhahzem1422@gmail.com"
                className="footer__developer-link"
              >
                <Mail size={16} />
                Contact Developer
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} {SITE_CONFIG.name}
          </p>
          <p className="footer__disclaimer">{SITE_CONFIG.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
