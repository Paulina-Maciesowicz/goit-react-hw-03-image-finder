import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
// import { key } from '../asset/pass';
import css from './App.module.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      page: 1,
      images: [],
      isLoading: false,
      error: null,
      selectedImage: null,
    };
  }

  componentDidMount() {
    this.fetchImages();
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImages();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  fetchImages = () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });

    fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=21858532-01f8fabf05f69063186fd3644&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          isLoading: false,
        }));
      })
      .catch(error => {
        this.setState({ error, isLoading: false });
      });
  };

  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.setState({ selectedImage: null });
    }
  };

  handleSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleImageSelection = imageUrl => {
    this.setState({ selectedImage: imageUrl });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { images, isLoading, error, selectedImage } = this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSubmit} />
        {error && <p>Something went wrong: {error.message}</p>}
        {isLoading && <Loader />}
        {images.length > 0 && (
          <>
            <ImageGallery
              images={images}
              id={nanoid}
              setSelectedImage={this.handleImageSelection}
            />
            <Button onClick={this.handleLoadMore} />
          </>
        )}
        {selectedImage && (
          <Modal
            imageUrl={selectedImage}
            onCloseModal={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}

export default App;
