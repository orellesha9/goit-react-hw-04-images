import { Component } from 'react';
import styles from './postsearchform.module.css';

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
        <button type="submit" className={styles.SearchForm_button_label}>
          <span className={styles.SearchForm_button_label}>Search</span>
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

export default PostSearchForm;
