import React from 'react';
import { Link } from 'react-router-dom';

const CardList = ({ cards, title }) => {
    if (!cards.length) {
        return <h3>No Cards Yet</h3>;
    }

    return (
        <div>
            <h3>{title}</h3>
            {cards && cards.map(card => (
                <div key={card._id} className="card mb-3">
                    <p className="card-header">
                        <Link
                        to={`/profile/${card.username}`}
                        style={{ fontWeight: 700 }}
                        className="text-light"
                        >
                            {card.username}
                        </Link>
                        {' '} card on {card.createdAt}
                    </p>
                    <div className="card-body">
                        <Link to={`/card/${card._id}`}>
                            <p>{card.cardTitle}</p>
                            <p className="mb-0">
                                {/* this is where the reaction count used to go */}
                            </p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardList;