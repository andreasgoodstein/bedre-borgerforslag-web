import React from 'react';
import PropTypes from 'prop-types';

import { FORSLAG_URL, UPDATE_URL } from 'config';

import { registerMessageListener } from 'service-worker';
import { dateIsOlderThanDays, parseLocaleDate } from 'helpers/date';

class ForslagProvider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      forslag: [],
      updates: [],
    };

    registerMessageListener(this.handleForslagMessage.bind(this));
  }

  async componentDidMount() {
    const [forslagResponse, updateResponse] = await Promise.all([fetch(FORSLAG_URL), fetch(UPDATE_URL)]);
    const [forslag, updates] = await Promise.all([forslagResponse.json(), updateResponse.json()]);

    this.setState(oldState => ({
      forslag,
      updates,
    }));
  }

  handleForslagMessage(message) {
    const { forslag, updates } = message.data;

    if (forslag) {
      this.setState(oldState => ({
        forslag,
      }));
    } else if (updates) {
      this.setState(oldState => ({
        updates,
      }));
    }
  }

  render() {
    const { children } = this.props;
    const forslagList = enrichForslagWithUpdates(this.state);

    return React.cloneElement(children, { forslagList });
  }
}

ForslagProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ForslagProvider;

const enrichForslagWithUpdates = ({ forslag, updates }) => forslag.map((forslagItem) => {
  const forslagUpdates = updates.filter(update => update.externalId === forslagItem.externalId);

  const updatesLastWeek = forslagUpdates.filter(update => dateIsOlderThanDays(update.updated, 8))
    .sort((a, b) => b.updated - a.updated);

  const updatesLast24Hours = updatesLastWeek.filter(update => dateIsOlderThanDays(update.updated, 2))
    .sort((a, b) => b.updated - a.updated);


  const votesThisWeek = forslagItem.votes - (updatesLastWeek[0]?.votes || forslagItem.votes);
  const votesThisDay = forslagItem.votes - (updatesLast24Hours[0]?.votes || forslagItem.votes);

  const votesPerDay = getVotesPerDay(forslagItem);

  return {
    ...forslagItem,
    votesThisWeek,
    votesThisDay,
    votesPerDay,
  };
});

const getVotesPerDay = (forslag) => {
  const forslagDate = parseLocaleDate(forslag.date);

  if (!(forslagDate instanceof Date && !isNaN(forslagDate))) {
    console.log(forslag.date);
  }
  const today = new Date();
  const dayDifference = Math.floor((today - forslagDate) / (1000 * 3600 * 24));

  return Math.floor(forslag.votes / dayDifference);
};
