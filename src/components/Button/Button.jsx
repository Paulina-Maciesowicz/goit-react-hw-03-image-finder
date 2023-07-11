import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ onClick, isDisabled }) => (
  <div className={css.searchbar}>
    <button
      type="button"
      className={css.button}
      onClick={onClick}
      disabled={isDisabled}
    >
      <span className={css.buttonLabel}>Load more</span>
    </button>
  </div>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};
