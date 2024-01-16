import styles from './image-gallery.module.css';

const ImageGallery = ({children}) => {
  return <ul className={styles.ImageGallery}>{children}
  </ul>;
};

export default ImageGallery;
