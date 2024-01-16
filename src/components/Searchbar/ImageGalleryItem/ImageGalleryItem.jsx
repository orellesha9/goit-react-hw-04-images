import styles from './imagegalleryItem.module.css';
import ImageGallery from 'components/ImageGallery/ImageGallery';

const ImageGalleryItem = ({showModal, items }) => {
  const elements = items.map(({ id, webformatURL, largeImageURL }) => (
    <li key={id} onClick={()=> showModal({webformatURL, largeImageURL})} className={styles.ImageGalleryItem}>
      <img
        className={styles.ImageGalleryItem_image}
        src={webformatURL}
        alt=""
      />
    </li>
  ));
  return <ImageGallery className={styles.ImageGallery}>{elements}</ImageGallery>;
};


export default ImageGalleryItem;
