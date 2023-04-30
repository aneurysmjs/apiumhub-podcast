import { type FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { useNavigate } from 'react-router-dom';

import './BackButton.css';

const BackButton: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <button type="button">
      <FontAwesomeIcon className="back-button" icon={faChevronLeft} onClick={() => navigate(-1)} />
    </button>
  );
};

export default BackButton;
