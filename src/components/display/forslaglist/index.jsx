import React from 'react';
import PropTypes from 'prop-types';

import Forslag from 'components/display/forslag';
import { parseLocaleDate } from 'helpers/date';
import ForslagShape from 'shapes/forslag';

import './forslaglist.less';

class ForslagList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedSort: 'votesThisWeek',
    };

    this.handleSortSelected = this.handleSortSelected.bind(this);
  }

  handleSortSelected(event) {
    this.setState({ selectedSort: event.target.value });
  }

  render() {
    const { forslagList } = this.props;
    const { selectedSort } = this.state;

    return (
      <div className="forslag-list">
        <div className="forslag-list__sort-selector">
          <p id="sort-label">Sorter efter</p>
          <select value={selectedSort} onChange={this.handleSortSelected} aria-labelledby="sort-label">
            <option value="votesThisWeek">Støtter den sidste uge</option>
            <option value="votesThisDay">Støtter det sidste døgn</option>
            <option value="votesPerDay">Støtter per dag</option>
            <option value="votes">Antal støtter</option>
            <option value="date">Nyeste</option>
          </select>
        </div>

        <section className="forslag-list__list" role="list">
          {getSortedForslagElements(forslagList, selectedSort)}
        </section>
      </div>
    );
  }
}

ForslagList.propTypes = {
  forslagList: PropTypes.arrayOf(PropTypes.shape(ForslagShape)).isRequired,
};

export default ForslagList;

const getSortedForslagElements = (forslagList, sortKey) => {
  if (!forslagList || !sortKey) {
    return null;
  }

  switch (sortKey) {
    case 'date':
      return forslagList.sort((a, b) => parseLocaleDate(b.date) - parseLocaleDate(a.date))
        .map(getForslagElement);

    default:
      return forslagList
        .sort((a, b) => b[sortKey] - a[sortKey])
        .map(getForslagElement);
  }
};

const getForslagElement = forslag => (<Forslag key={forslag.externalId} forslag={forslag}/>);
