import { useEffect, useState } from 'react';
import styles from './searchbar.module.css';
import PostSearchForm from './PostSearchForm/PostSearchForm';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { searchPosts } from 'api/post';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';

const Searchbar = () => {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [postDetails, setPostDetails] = useState({});
  const [totalHits, setTotalHits] = useState(0);

  const handleSearch = ({ search }) => {
    setSearch(search);
    setPosts([]);
    setPage(1);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data } = await searchPosts(search, page);
        setPosts ((prevPosts) =>
          data.hits?.length ? [...prevPosts, ...data.hits] : prevPosts
        );
        setTotalHits(data.totalHits)
        // this.setState(({ posts }) => ({
        //   posts: data.hits?.length ? [...posts, ...data.hits] : posts,
        //   totalHits: data.totalHits,
        // }));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (search) {
      fetchPosts();
    }
  }, [search, page]);

  const loadMore = () => setPage(prevPage => prevPage + 1);

  const showModal = ({ webformatURL, largeImageURL }) => {
    setModalOpen(true);
    setPostDetails({
      webformatURL,
      largeImageURL,
    });
  };

  const closeModal = () => {
    setModalOpen(false);
    setPostDetails({});
  };

  const isPost = Boolean(posts.length);
  return (
    <>
      <PostSearchForm onSubmit={handleSearch} />
      {error && <p className={styles.error}>{error}</p>}
      {loading && <Loader />}
      {isPost && <ImageGalleryItem showModal={showModal} items={posts} />}
      {isPost && posts.length < totalHits ? (
        <Button onClick={loadMore} type="button">
          Load more
        </Button>
      ) : null}
      {modalOpen && (
        <Modal close={closeModal}>
          <img src={postDetails.largeImageURL} alt="text" />
        </Modal>
      )}
    </>
  );
};

/*
class Searchbar extends Component {
  state = {
    search: '',
    posts: [],
    loading: false,
    error: null,
    page: 1,
    modalOpen: false,
    postDetails: {},
    totalHits: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (search && (search !== prevState.search || page !== prevState.page)) {
      this.fetchPosts();
    }
  }

  async fetchPosts() {
    const { search, page } = this.state;
    try {
      this.setState({
        loading: true,
      });
      const { data } = await searchPosts(search, page);
      this.setState(({ posts }) => ({
        posts: data.hits?.length ? [...posts, ...data.hits] : posts,
        totalHits: data.totalHits,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showModal = ({ webformatURL, largeImageURL }) => {
    this.setState({
      modalOpen: true,
      postDetails: { webformatURL, largeImageURL },
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      postDetails: {},
    });
  };

  handleSearch = ({ search }) => {
    this.setState({
      search,
      posts: [],
      page: 1,
    });
  };

  render() {
    const { handleSearch, loadMore, showModal } = this;
    const { posts, loading, error, modalOpen, postDetails, totalHits } =
      this.state;

    const isPost = Boolean(posts.length);
    return (
      <>
        <PostSearchForm onSubmit={handleSearch} />
        {error && <p className={styles.error}>{error}</p>}
        {loading && <Loader />}
        {isPost && <ImageGalleryItem showModal={showModal} items={posts} />}
        {isPost && posts.length < totalHits ? (
          <Button onClick={loadMore} type="button">
            Load more
          </Button>
        ) : null}
        {modalOpen && (
          <Modal close={this.closeModal}>
            <img src={postDetails.largeImageURL} alt="text" />
          </Modal>
        )}
      </>
    );
  }
}
*/
export default Searchbar;
