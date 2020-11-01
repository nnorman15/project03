import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CARD } from '../utils/queries';
//import Auth from '../utils/auth';

const SingleCard = props => {
  //once the useParams is imported, adding the followig line will read the url param
  const { id: cardId } = useParams();
  //console.log(cardId);

  const { loading, data } = useQuery(QUERY_CARD, {
    variables: { id: cardId }
  });

  const card = data?.card || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {card.cardTitle}
          </span>{' '}
          <span className="card-date">{card.createdAt}</span>
        </p>
        <div className="card-body">
          <p>{card.cardBody}</p>
          <p>{card.cardSubject}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
