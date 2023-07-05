import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ onClick, isDisabled }) => (
  <button
    type="button"
    className={css.button}
    onClick={onClick}
    disabled={isDisabled}
  >
    <span className="button-label">Load more</span>
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};
