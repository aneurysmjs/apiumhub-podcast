import { FunctionComponent, MouseEvent, useState, useRef, useCallback } from 'react';

import { useClickOutside } from '@apiumhub/hooks';
import useLanguage from '@/hooks/useLanguage';

import './LangsDropdown.css';

const LANGS = ['ru', 'en', 'es'] as const;

const LangsDropdown: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  /**
   * @description Close handler when cliking outside.?
   */
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useClickOutside(ref, handleClose);

  const [language, setLanguage] = useLanguage(handleClose);

  /**
   * @description Toggles langs dropdown
   */
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  /**
   *
   * @param evt mouse
   */
  const handleClick = (evt: MouseEvent<HTMLButtonElement>) => {
    const target = evt.target as HTMLButtonElement;
    const { lang } = target.dataset;

    if (lang) {
      setLanguage(lang);
    }
  };

  return (
    <div className="langs-dropdown" ref={ref}>
      <button
        className="langs-dropdown__toggle"
        data-testid="dropdown-toggle"
        onClick={handleToggle}
      >
        {language}
      </button>

      {isOpen ? (
        <div className="langs-dropdown__menu" data-testid="dropdown-menu">
          {LANGS.filter((lang) => lang !== language).map((lang) => (
            <button
              key={lang}
              onClick={handleClick}
              className="langs-dropdown__menu-item"
              data-lang={lang}
              data-testid="dropdown-item"
            >
              {lang}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default LangsDropdown;
