import React from 'react';
import PropTypes from 'prop-types';

import ForslagShape from 'shapes/forslag';
import { parseLocaleDate } from 'helpers/date';
import { statusMap } from 'helpers/status';

import './forslag.less';

const Forslag = ({ forslag }) => (
  <article className="display-forslag column centered" role="listitem">
    <a href={getForslagLink(forslag.url)} target="_blank" rel="noopener noreferrer" aria-label="Se mere om forslaget på borgerforslag.dk">
      <div className="display-forslag__title row centered">
        <p>{forslag.externalId}</p>
      </div>

      <div className="title row">
        <p>{forslag.title}</p>
      </div>

      <div className="display-forslag__content column">

        <hr />

        <div className="votes row">
          <p>Støtter</p>
          <p><b>{forslag.votes}</b></p>
        </div>

        <div className="rate row">
          <p>Siden i går</p>
          <p>{forslag.votesThisDay}</p>
        </div>

        <div className="rate row">
          <p>Den sidste uge</p>
          <p>{forslag.votesThisWeek}</p>
        </div>

        <div className="rate row">
          <p>Pr. dag siden oprettelse</p>
          <p>{forslag.votesPerDay}</p>
        </div>

        <hr />

        <p>{statusMap.get(forslag.status)}</p>

        <div className="date row">
          <p>Dato</p>
          <p>{getLocaleDateString(forslag.date)}</p>
        </div>

        <div className="date row">
          <p>Slutdato</p>
          <p>{getEndDateString(forslag.date)}</p>
        </div>
      </div>
    </a>
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
  const endDate = new Date(forslagDate.getTime());
  endDate.setDate(forslagDate.getDate() + 180);

  return endDate.toLocaleDateString();
};

const getForslagLink = url => `https://www.borgerforslag.dk${url}`;
