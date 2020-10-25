import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CARD } from '../utils/queries';
//import ReactionList from '../components/ReactionList';
//import ReactionForm from '../components/ReactionForm';
import Auth from '../utils/auth';

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
            {card.username}
          </span>{' '}
          card on {card.createdAt}
        </p>
        <div className="card-body">
          <p>{card.cardTitle}</p>
        </div>
      </div>
      {/* {card.reactionCount > 0 && <ReactionList reactions={card.reactions} />} */}
      {/* {Auth.loggedIn() && <ReactionForm cardId={card._id} />} */}
    </div>
  );
};

export default SingleCard;
