import React from 'react';
import PropTypes from 'prop-types';

import Forslag from 'components/display/forslag';

import ForslagShape from 'shapes/forslag';

import './forslaglist.less';

const ForslagList = ({ forslagList = [] }) => (
  <ul className="forslag-list">
    {getSortedForslagElements(forslagList, 'votesThisDay')}
  </ul>
);

ForslagList.propTypes = {
  forslagList: PropTypes.arrayOf(PropTypes.shape(ForslagShape)).isRequired,
};

export default ForslagList;

const getSortedForslagElements = (forslagList, sortKey) => forslagList && forslagList
  .sort((a, b) => b[sortKey] - a[sortKey])
  .map(forslag => (<Forslag key={forslag.externalId} forslag={forslag} />));
