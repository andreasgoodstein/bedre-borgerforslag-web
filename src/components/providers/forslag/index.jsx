import React from 'react';
import PropTypes from 'prop-types';

import { FORSLAG_OPTIONS, FORSLAG_URL } from 'config';

import { dateIsOlderThanDays, parseLocaleDate } from 'helpers/date';

class ForslagProvider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      forslagList: [],
    };
  }

  async componentDidMount() {
    const [{ data }] = await Promise.all([
      (
        await fetch(FORSLAG_URL, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(FORSLAG_OPTIONS),
        })
      ).json(),
    ]);

    this.setState(() => ({
      forslagList: enrichForslagWithUpdates({ forslagList: data }),
    }));
  }

  render() {
    const { children } = this.props;
    const { forslagList } = this.state;

    return React.cloneElement(children, { forslagList });
  }
}

ForslagProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ForslagProvider;

const enrichForslagWithUpdates = ({ forslagList }) =>
  forslagList
    ? forslagList.map((forslag) => ({
        ...forslag,
        votesPerDay: getVotesPerDay(forslag),
      }))
    : [];

const getVotesPerDay = (forslag) => {
  const forslagDate = parseLocaleDate(forslag.date);

  if (!(forslagDate instanceof Date && !Number.isNaN(forslagDate))) {
    console.warn('Bad date', forslag.date);
  }

  const today = new Date();
  const dayDifference = Math.floor((today - forslagDate) / (1000 * 3600 * 24));

  return Math.floor(forslag.votes / dayDifference);
};
