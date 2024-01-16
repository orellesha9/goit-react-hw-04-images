import { Component } from 'react';
import styles from './post.module.css';
import { getAllPosts } from 'api/post';
import PostSearchForm from 'components/Searchbar/PostSearchForm/PostSearchForm';

class Post extends Component {
  state = {
    posts: [],
    loading: false,
    error: null,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    try {
      const { data } = await getAllPosts();
      this.setState({
        posts: data.hits?.length ? data.hits : [],
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({
        loading: false,
      });
    }
    // getAllPosts()
    //   .then(({ data }) => {
    //     this.setState({
    //       posts: data.hits?.length ? data.hits : [],
    //     });
    //   })
    //   .catch(error => {
    //     this.setState({ error: error.message });
    //   })
    //   .finally(() => {
    //     this.setState({
    //       loading: false,
    //     });
    //   });
  }

  render() {
    const { posts, loading, error } = this.state;
    const elements = posts.map(({ id, webformatURL, largeImageURL }) => (
      <li key={id} className={styles.ImageGalleryItem}>
        <img
          className={styles.ImageGalleryItem_image}
          src={webformatURL}
          alt=""
        />
      </li>
    ));
    return (
      <>
      <PostSearchForm/>
        {error && <p className={styles.error}>{error}</p>}
        {loading && <p>...Loading</p>}
        {Boolean(elements.length) && (
          <ul className={styles.ImageGallery}>{elements}</ul>
        )}
        ;
      </>
    );
  }
}

export default Post;
