import { useState, useEffect,useRef,useMemo, Component } from 'react';
import styles from './postsearchform.module.css';
import { nanoid } from 'nanoid'

const PostSearchForm = ({ onSubmit }) => {
  const [state, setState] = useState({ search: '' });

  const inputRef = useRef(null);

  useEffect(() => {
inputRef.current.focus();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    reset();
  };

  const reset = () => {
    setState({ search: '' });
  };

const searchId = useMemo(()=> nanoid(), [])

  return (
    <header class={styles.Searchbar}>
      <form id={searchId} onSubmit={handleSubmit} className={styles.searchForm}>
        <button type="submit" className={styles.SearchForm_button}>
          <span className={styles.SearchForm_button_label}></span>
        </button>

        <input id={searchId} ref={inputRef}
          name="search"
          value={state.search}
          onChange={handleChange}
          className={styles.SearchForm_input}
          type="text"
          required
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

/*
class PostSearchForm extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.setState({
      search: '',
    });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { search } = this.state;

    return (
      <header class={styles.Searchbar}>
        <form onSubmit={handleSubmit} className={styles.SearchForm}>
          <button type="submit" className={styles.SearchForm_button}>
            <span className={styles.SearchForm_button_label}></span>
          </button>

          <input
            name="search"
            value={search}
            onChange={handleChange}
            className={styles.SearchForm_input}
            type="text"
            required
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
*/
export default PostSearchForm;
