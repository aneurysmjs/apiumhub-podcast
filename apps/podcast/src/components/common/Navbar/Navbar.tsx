import { FunctionComponent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import classNames from 'classnames';

import useTheme from '@/hooks/useTheme';
import Switch from '@/components/common/Switch';
import LangsDropdown from '@/components/common/LangsDropdown';

import './Navbar.css';

type ClassNameProp = { isActive: boolean };

const links = [
  {
    id: 0,
    name: 'navbar.links.home',
    path: '/',
  },
];

const navbarLinkClass = 'navbar-link focus:outline-none';

const Navbar: FunctionComponent = () => {
  const { t } = useTranslation();
  const [theme, toggleTheme] = useTheme();
  const [isOpen, setOpen] = useState(false);

  const handleNavLinkClick = () => {
    setOpen(false);
  };

  return (
    <div className="navbar navbar--fix-top">
      <div className="navbar__container">
        <NavLink to="/" onClick={handleNavLinkClick} className="navbar-brand">
          Podcast
        </NavLink>
        <button
          className="navbar__toggler"
          type="button"
          onClick={() => {
            setOpen(!isOpen);
          }}
        >
          {isOpen ? (
            <FontAwesomeIcon className="text-theme" size="2x" icon={faXmark} />
          ) : (
            <FontAwesomeIcon className="text-theme" size="2x" icon={faBars} />
          )}
        </button>
        <div className="navbar__actions">
          <div className="navbar__langs-dropdown">
            <LangsDropdown />
          </div>

          <div className="navbar__theme">
            <Switch isOn={theme === 'dark'} toggle={toggleTheme as () => void} />
          </div>
        </div>
        <div
          className={classNames('collapsable navbar__collapse navbar__navigation', {
            'navbar__collapse--show': isOpen,
          })}
        >
          <nav className="navbar__menu">
            {links.map(({ id, name, path }) => (
              <NavLink
                key={id}
                to={path}
                onClick={handleNavLinkClick}
                className={({ isActive }: ClassNameProp) =>
                  isActive ? `${navbarLinkClass} navbar-link--active` : navbarLinkClass
                }
              >
                {t(name)}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
