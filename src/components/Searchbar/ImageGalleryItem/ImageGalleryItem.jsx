import styles from './imagegalleryItem.module.css';

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
  return <ul className={styles.ImageGallery}>{elements}</ul>;
};


export default ImageGalleryItem;
