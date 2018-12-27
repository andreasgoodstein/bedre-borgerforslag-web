import React from 'react';
import PropTypes from 'prop-types';

import ForslagShape from 'shapes/forslag';
import { parseLocaleDate } from 'helpers/date';

import './forslag.less';

const Forslag = ({ forslag }) => (
  <article className="display-forslag column centered">
    <div className="display-forslag__title row centered">
      <a href={getForslagLink(forslag.url)} target="_blank" rel="noopener noreferrer" aria-label="Se mere om forslaget på borgerforslag.dk">{forslag.externalId}</a>
    </div>

    <div className="display-forslag__content column">
      <div className="title row">
        <p>{forslag.title}</p>
      </div>

      <hr />

      <div className="votes row">
        <p>Støtter</p>
        <p><b>{forslag.votes}</b></p>
      </div>

      <div className="rate row">
        <p>Pr. dag</p>
        <p>{forslag.votesPerDay}</p>
      </div>

      <div className="rate row">
        <p>Siden igår</p>
        <p>{forslag.votesThisDay}</p>
      </div>

      <div className="rate row">
        <p>Sidste uge</p>
        <p>{forslag.votesThisWeek}</p>
      </div>

      <hr />

      <div className="date row">
        <p>Dato</p>
        <p>{getLocaleDateString(forslag.date)}</p>
      </div>

      <div className="date row">
        <p>Slutdato</p>
        <p>{getEndDateString(forslag.date)}</p>
      </div>
    </div>
  </article>
);

Forslag.propTypes = {
  forslag: PropTypes.shape(ForslagShape).isRequired,
};

export default Forslag;


const getLocaleDateString = (date) => {
  if (!date) {
    return '';
  }

  const forslagdate = parseLocaleDate(date);

  return forslagdate.toLocaleDateString();
};

const getEndDateString = (date) => {
  if (!date) {
    return '';
  }

  const forslagDate = parseLocaleDate(date);
  const endDate = new Date();
  endDate.setDate(forslagDate.getDate() + 180);

  return endDate.toLocaleDateString();
};

const getForslagLink = url => `https://www.borgerforslag.dk${url}`;
