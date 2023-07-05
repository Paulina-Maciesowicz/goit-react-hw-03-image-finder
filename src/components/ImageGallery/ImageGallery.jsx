import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, id, setSelectedImage }) => (
  <ul className={css.gallery}>
    {images.map(image => (
      <ImageGalleryItem
        key={id()}
        image={image}
        setSelectedImage={setSelectedImage}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  id: PropTypes.func.isRequired,
  setSelectedImage: PropTypes.func.isRequired,
};
