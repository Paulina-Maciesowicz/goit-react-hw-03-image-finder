import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, setSelectedImage }) => (
  <li className={css.imageGalleryItem}>
    <img
      className={css.imageGalleryItemImage}
      src={image.webformatURL}
      alt={image.id}
      onClick={() => setSelectedImage(image.largeImageURL)}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  setSelectedImage: PropTypes.func.isRequired,
};
