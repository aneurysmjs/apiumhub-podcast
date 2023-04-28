import { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon';
import { faSun } from '@fortawesome/free-solid-svg-icons/faSun';

import './Switch.css';

interface SwitchProps {
  isOn: boolean;
  toggle: () => void;
}

const Switch: FunctionComponent<SwitchProps> = ({ toggle, isOn }) => (
  <button
    role="switch"
    aria-checked={isOn}
    data-testid="toggle"
    className={`switch ${isOn ? 'switch--on' : 'switch--off'}`}
    onClick={toggle}
  >
    {isOn ? (
      <FontAwesomeIcon className="switch__icon switch__icon--left" icon={faMoon} />
    ) : (
      <FontAwesomeIcon className="switch__icon switch__icon--right" icon={faSun} />
    )}
    <span className="sr-only">switch</span>
    <span
      aria-hidden="true"
      className={`switch__toggler ${isOn ? 'switch__toggler--on' : 'switch__toggler--off'}`}
    />
  </button>
);

export default Switch;
