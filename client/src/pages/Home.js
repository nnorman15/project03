import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import CardList from '../components/CardList';
import { QUERY_CARDS, QUERY_ME_BASIC } from '../utils/queries';
import Auth from '../utils/auth';
//import FriendList from '../components/FriendList';
import CardForm from '../components/CardForm';

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_CARDS);
  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  //optional chaining negates the need to check if an object even exists before accessing its properties
  //In this case, no data will exist until the query to the server is finished. So if we type data.cards, we'll receive an error saying we can't access the property of data—because it is undefined.What we're saying is, if data exists, store it in the cards constant we just created. If data is undefined, then save an empty array to the cards component.
  const cards = data?.cards || [];
  //console.log(cards);

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        {/* <div className="col-12 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <CardList cards={cards} title="Some Feed for Card(s)..." />
          )}
        </div> */}
        {loggedIn && (
          <div className="col-12 mb-3">
            <CardForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <CardList cards={cards} title="Some Feed for Card(s)..." />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            friends list went here
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
