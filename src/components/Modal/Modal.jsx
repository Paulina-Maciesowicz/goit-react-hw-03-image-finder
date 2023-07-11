import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ imageUrl, onCloseModal }) => {
  const handleClose = event => {
    if (event.target.className === `${css.overlay}`) {
      onCloseModal();
    }
  };

  return (
    <div className={css.overlay} onClick={handleClose}>
      <div className={css.modal}>
        <img className={css.img} src={imageUrl} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
