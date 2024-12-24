import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5';
import './swiggyHeader.css';

class SwiggyHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchVisible: false,
      isScrolled: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const isScrolled = window.scrollY > 0;
    if (isScrolled !== this.state.isScrolled) {
      this.setState({ isScrolled });
    }
  };

  toggleSearch = () => {
    this.setState(prevState => ({
      isSearchVisible: !prevState.isSearchVisible
    }));
    if (!this.state.isSearchVisible) {
      this.props.onSearch(''); // Clear search when opening
    }
  };

  handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    this.props.onSearch(searchTerm);
  };

  render() {
    const { isSearchVisible, isScrolled } = this.state;

    return (
      <header className={`swiggy-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-content">
          <div className="restaurant-info">
            <h1>Pizza Hut</h1>
            <p>50-55 mins</p>
          </div>
          <div className="search-container">
            {isSearchVisible && (
              <input 
                type="text" 
                placeholder="Search for dishes" 
                className="search-input"
                autoFocus
                onChange={this.handleSearchChange}
              />
            )}
            <div className="search-icon" onClick={this.toggleSearch}>
              {isSearchVisible ? (
                <IoCloseOutline size={24} />
              ) : (
                <BiSearch size={24} />
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default SwiggyHeader; 