import React from 'react';
import SwiggyHeader from '../components/swiggyHeader';
import SwiggyCard from '../components/swiggyCard';
import { menuItems } from '../data/menuItems';
import './assignment.css';

const VegIcon = () => (
  <div className="food-icon veg">
    <div className="icon-outline">
      <div className="icon-dot"></div>
    </div>
  </div>
);

const NonVegIcon = () => (
  <div className="food-icon non-veg">
    <div className="icon-outline">
      <div className="icon-dot"></div>
    </div>
  </div>
);

const ToggleSwitch = ({ isChecked, onChange, isVeg }) => (
  <label className="toggle-switch">
    <input type="checkbox" checked={isChecked} onChange={onChange} />
    <span className={`toggle-slider ${isVeg ? 'veg-toggle' : 'non-veg-toggle'}`}>
      <div className="toggle-icon">
        <div className="icon-outline">
          <div className="icon-dot"></div>
        </div>
      </div>
    </span>
  </label>
);

class AssignmentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      vegSelected: false,
      nonVegSelected: false
    };
  }

  handleSearch = (term) => {
    this.setState({
      searchTerm: term.toLowerCase()
    });
  };

  toggleVegFilter = () => {
    this.setState(prevState => ({
      vegSelected: !prevState.vegSelected
    }));
  };

  toggleNonVegFilter = () => {
    this.setState(prevState => ({
      nonVegSelected: !prevState.nonVegSelected
    }));
  };

  getHighlightedText = (text, highlight) => {
    if (!highlight.trim()) return text;
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === highlight.toLowerCase() ? 
        <span key={index} className="highlighted-text">{part}</span> : part
    );
  };

  render() {
    const { searchTerm, vegSelected, nonVegSelected } = this.state;

    const filteredItems = menuItems.filter(item => {
      const searchMatch = item.name.toLowerCase().includes(searchTerm) ||
                         item.description.toLowerCase().includes(searchTerm);
      
      if (vegSelected && !nonVegSelected) return item.isVeg && searchMatch;
      if (nonVegSelected && !vegSelected) return !item.isVeg && searchMatch;
      if (vegSelected && nonVegSelected) return searchMatch;
      return searchMatch;
    });

    return (
      <div className="assignment-container">
        <SwiggyHeader onSearch={this.handleSearch} />
        <div className="sticky-wrapper">
          <div className="filter-section">
            <button 
              className={`filter-button ${vegSelected ? 'active' : ''}`}
              onClick={this.toggleVegFilter}
            >
              <VegIcon />
              <span>Pure Veg</span>
            </button>
            <button 
              className={`filter-button ${nonVegSelected ? 'active' : ''}`}
              onClick={this.toggleNonVegFilter}
            >
              <NonVegIcon />
              <span>Non Veg</span>
            </button>
          </div>
        </div>
        <div className="menu-section">
          <div className="recommended-section">
            <h3>
              {searchTerm ? `Search Results (${filteredItems.length})` : 'Recommended (20)'}
            </h3>
            <div className="cards-container">
              {filteredItems.map((item, index) => (
                <SwiggyCard 
                  key={index} 
                  item={{
                    ...item,
                    name: this.getHighlightedText(item.name, searchTerm),
                    description: this.getHighlightedText(item.description, searchTerm)
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AssignmentPage;
