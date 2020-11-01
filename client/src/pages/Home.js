import React, {useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import CardList from '../components/CardList';
import { QUERY_CARDS } from '../utils/queries';
import Auth from '../utils/auth';

const Home = () => {

  const [cardSubjectFilter, setCardSubjectFilter] = useState('')

  const loggedIn = Auth.loggedIn();
  //when not logged in do not show any cards ... passing in garbage for the email is a hacky way of ensuring this
  let email = 'garbage'; 
  if (loggedIn){
    email = Auth.getProfile().data.email;
  }
  //console.log(email);

  const handleChange = event => {
    //console.log(event.target.value);
    setCardSubjectFilter(event.target.value);
  };

  let { loading, data } = useQuery(QUERY_CARDS, {
    variables: { email: email, cardSubject: cardSubjectFilter }
  });

  //console.log(data);
  const cards = data?.cards || [];
  //console.log(cards);

  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <h3>Select Your Subject</h3>
            <select name="cardSubject" className="form-input col-12 col-md-12" onChange={handleChange} value={cardSubjectFilter}>
              <option value="selectSubject">Subject...</option>
              <option value="Cooking">Cooking</option>
              <option value="Javascript">Javascript</option>
            </select>
          </div>
        )}
        <div className={`col-12 mb-3`}>
          {loggedIn && loading ? (
            <div>Loading...</div>
          ) : (
            <CardList cards={cards} cardSubjectFilter={cardSubjectFilter} title="Your Card(s)..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
