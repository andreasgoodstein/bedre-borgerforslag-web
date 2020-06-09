import PropTypes from 'prop-types';

export default {
  externalId: PropTypes.string,
  title: PropTypes.string,
  votes: PropTypes.number,
  date: PropTypes.date,
  url: PropTypes.string,
  status: PropTypes.string,
  votesPerDay: PropTypes.number,
  votesThisDay: PropTypes.number,
  votesThisWeek: PropTypes.number,
};
