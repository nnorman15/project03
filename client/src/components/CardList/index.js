import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const CardList = ({ cards, cardSubjectFilter, title }) => {
    const loggedIn = Auth.loggedIn();
    if (loggedIn){
        if (!cardSubjectFilter || cardSubjectFilter === "selectSubject"){
            return <div className="pageMsg">Please select a subject for a list of cards.</div>;
        }
        else {
            if (!cards.length) {
                return <div className="pageMsg">There are no cards assigned to the chosen subject.</div>;
            }
        }
    }
    else {
        return <div className="pageMsg">Please login or signup!</div>;
    }


    return (
        <div>
            <h3>{title}</h3>
            {cards && cards.map(card => (
                <div key={card._id} className="card mb-3">
                    <p className="card-header">
                        &nbsp;<span className="card-date">{card.createdAt}</span>
                    </p>
                    <div className="card-body">
                        <Link to={`/card-form/${card._id}`}>
                            <p className="cardTitle">{card.cardTitle}</p>
                            <p className="cardBody">{card.cardBody}</p>                            
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardList;