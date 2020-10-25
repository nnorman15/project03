import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_CARD } from '../../utils/mutations';
import { QUERY_CARDS, QUERY_ME } from '../../utils/queries';

const CardForm = () => {

const [cardTitle, setText] = useState('');
const [characterCount, setCharacterCount] = useState(0);

const handleChange = event => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
};

const handleFormSubmit = async event => {
    event.preventDefault();
  
    try {
      // add card to database
      await addCard({
        variables: { cardTitle }
      });
  
      // clear form value
      setText('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
};

const [addCard, { error }] = useMutation(ADD_CARD, {
    update(cache, { data: { addCard } }) {
      try {
        // could potentially not exist yet, so wrap in a try...catch
        const { cards } = cache.readQuery({ query: QUERY_CARDS });
        cache.writeQuery({
          query: QUERY_CARDS,
          data: { cards: [addCard, ...cards] }
        });
      } catch (e) {
        console.error(e);
      }
  
      // update me object's cache, appending new card to the end of the array
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, cards: [...me.cards, addCard] } }
      });
    }
  });

  return (
    <div>
      <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
    </p>
    <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
    >
        <textarea
            placeholder="Here's a new card..."
            value={cardTitle}
            className="form-input col-12 col-md-9"
            onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CardForm;