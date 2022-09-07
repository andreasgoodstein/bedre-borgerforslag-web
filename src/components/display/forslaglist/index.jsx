import React from 'react';
import PropTypes from 'prop-types';

import Forslag from 'components/display/forslag';
import { Loader } from 'components/display/loader/loader';
import { parseLocaleDate } from 'helpers/date';
import ForslagShape from 'shapes/forslag';

import './forslaglist.less';

class ForslagList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedSort: 'votes',
      selectedFilter: 'ongoing',
    };

    this.handleSortSelected = this.handleSortSelected.bind(this);
    this.handleFilterSelected = this.handleFilterSelected.bind(this);
  }

  handleSortSelected(event) {
    this.setState({ selectedSort: event.target.value });
  }

  handleFilterSelected(event) {
    this.setState({ selectedFilter: event.target.value });
  }

  render() {
    const { forslagList } = this.props;
    const { selectedSort, selectedFilter } = this.state;

    return (
      <div className="forslag-list">
        <div className="forslag-list__selectors">
          <div className="sort-selector">
            <p id="sort-label">Sorter efter</p>
            <select
              value={selectedSort}
              onChange={this.handleSortSelected}
              aria-labelledby="sort-label"
            >
              <option value="votes">Antal støtter</option>
              <option value="votesPerDay">Støtter per dag</option>
              <option value="date">Nyeste</option>
            </select>
          </div>

          <div className="filter-selector">
            <p id="filter-label">Filtrer</p>
            <select
              value={selectedFilter}
              onChange={this.handleFilterSelected}
              aria-labelledby="filter-label"
            >
              <option value="ongoing">Igangværende</option>
              <option value="finished">Afsluttet</option>
              <option value="all">Alle</option>
            </select>
          </div>
        </div>

        <section className="forslag-list__list" role="list">
          {getSortedForslagElements(
            forslagList?.filter(getStatusFilter(selectedFilter)) || [],
            selectedSort
          )}
        </section>
      </div>
    );
  }
}

ForslagList.propTypes = {
  forslagList: PropTypes.arrayOf(PropTypes.shape(ForslagShape)).isRequired,
};

const getSortedForslagElements = (forslagList, sortKey) => {
  if (!forslagList || !sortKey || forslagList.length < 1) {
    return <Loader />;
  }

  switch (sortKey) {
    case 'date':
      return forslagList
        .sort((a, b) => parseLocaleDate(b.date) - parseLocaleDate(a.date))
        .map(getForslagElement);

    default:
      return forslagList
        .sort((a, b) => (b && a ? b[sortKey] - a[sortKey] : 1))
        .map(getForslagElement);
  }
};

const getStatusFilter = (filterKey) => (forslag) =>
  filterKey === 'all' ||
  (filterKey === 'ongoing' &&
    forslag.status === 'ongoing' &&
    forslag.votes < 50000) ||
  (filterKey !== 'ongoing' && filterKey === forslag.status);

const getForslagElement = (forslag) => (
  <Forslag key={forslag.externalId} forslag={forslag} />
);

export default ForslagList;
