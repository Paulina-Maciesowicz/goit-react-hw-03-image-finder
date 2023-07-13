import React, { Component } from 'react';
import axios from 'axios';

// import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
// import { key } from '../asset/pass';
import css from './App.module.css';

export class App extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    error: null,
    selectedImage: null,
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const response = await axios.get(
      `/pixabay.com/api/?q=${this.state.query}&page=${this.state.page}&key=21858532-01f8fabf05f69063186fd3644&image_type=photo&orientation=horizontal&per_page=12`
    );
    response
      .then(data => {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          isLoading: false,
        }));
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
      });
    // this.setState({ data: response.data });
    document.addEventListener('keydown', this.handleKeyDown);
  }

  async componentDidUpdate(prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({
        isLoading: true,
      });
      const response = await axios.get(
        `/pixabay.com/api/?q=${this.state.query}&page=${this.state.page}&key=21858532-01f8fabf05f69063186fd3644&image_type=photo&orientation=horizontal&per_page=12`
      );
      response
        .then(data => {
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            isLoading: false,
          }));
        })
        .catch(error => {
          this.setState({
            error,
            isLoading: false,
          });
        });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleSubmit = query => {
    this.setState({
      query,
      page: 1,
      images: [],
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleImageSelection = imageUrl => {
    this.selectedImage({ selectedImage: imageUrl });
  };

  handleCloseModal = () => {
    this.selectedImage({ selectedImage: null });
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

// console.log(key);
// export const App = () => {
//   const [query, setQuery] = useState('');
//   const [page, setPage] = useState(1);
//   const [images, setImages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     setIsLoading(true);
//     fetch(
//       `https://pixabay.com/api/?q=${query}&page=${page}&key=21858532-01f8fabf05f69063186fd3644&image_type=photo&orientation=horizontal&per_page=12`
//     )
//       .then(response => response.json())
//       .then(data => {
//         setImages(prevImages => [...prevImages, ...data.hits]);
//         setIsLoading(false);
//       })
//       .catch(error => {
//         setError(error);
//         setIsLoading(false);
//       });
//   }, [query, page]);

//   useEffect(() => {
//     const handleKeyDown = event => {
//       if (event.key === 'Escape') {
//         setSelectedImage(null);
//       }
//     };
//     document.addEventListener('keydown', handleKeyDown);
//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []);

//   const handleSubmit = query => {
//     setQuery(query);
//     setPage(1);
//     setImages([]);
//   };

//   const handleLoadMore = () => {
//     setPage(prevPage => prevPage + 1);
//   };

//   const handleImageSelection = imageUrl => {
//     setSelectedImage(imageUrl);
//   };

//   const handleCloseModal = () => {
//     setSelectedImage(null);
//   };

//   return (
//     <div className={css.app}>
//       <Searchbar onSubmit={handleSubmit} />
//       {error && <p>Something went wrong: {error.message}</p>}
//       {isLoading && <Loader />}
//       {images.length > 0 && (
//         <>
//           <ImageGallery
//             images={images}
//             id={nanoid}
//             setSelectedImage={handleImageSelection}
//           />
//           <Button onClick={handleLoadMore} />
//         </>
//       )}
//       {selectedImage && (
//         <Modal imageUrl={selectedImage} onCloseModal={handleCloseModal} />
//       )}
//     </div>
//   );
// };
