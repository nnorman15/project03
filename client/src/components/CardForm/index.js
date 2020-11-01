import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { QUERY_CARD } from '../../utils/queries';
import { ADD_CARD, EDIT_CARD, DELETE_CARD } from '../../utils/mutations';
import Auth from '../../utils/auth';

const CardForm = props => {
  
  // const token = Auth.loggedIn() ? Auth.getToken() : null;

  // if (!token) {
  //   return false;
  // }

  let email = ''; 

  //check if user is logged in
  const loggedIn = Auth.loggedIn();
  
  //if user is logged in populate the email var with the user's email which will be used when the card is submitted
  if (loggedIn){
    email = Auth.getProfile().data.email;
  }

  //console.log(email);

  const [cardBody, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const handleChange = event => {
      if (event.target.value.length <= 500) {
        setText(event.target.value);
        setCharacterCount(event.target.value.length);
      }
  };

  const handleFormSubmit = async event => {
      event.preventDefault();

      //console.log(event.target.cardSubject.value);
      //console.log(event.target.cardTitle.value);
      //console.log(event.target.cardBody.value);

      try {

        if (cardId){
          //console.log('EDIT CARD');
          await editCard({
            variables: { 
              cardId: event.target.cardId.value,
              cardTitle: event.target.cardTitle.value, 
              cardBody: event.target.cardBody.value, 
              cardSubject: event.target.cardSubject.value,
              email: email
            }
          });
        }
        else{
          //console.log('NEW CARD');
          await addCard({
            variables: { 
              cardTitle: event.target.cardTitle.value, 
              cardBody: event.target.cardBody.value, 
              cardSubject: event.target.cardSubject.value,
              email: email
            }
          });
        }
        
    
        // clear form value
        setText('');
        setCharacterCount(0);

      } catch (e) {
        console.error(e);
      }
  };

  //function that adds card to db via mutation
  const [addCard, { error }] = useMutation(ADD_CARD, {
    update(cache, { data: { addCard } }) {
      try {

        //console.log(addCard);
        //console.log(addCard._id);

        //once the card has been added, redirect to the card-form for that card (self)
        //window.location.href = "/card/" + addCard._id;
        window.location.href = "/card-form/" + addCard._id;

      } catch (e) {
        console.error(e);
      }
    }
  });

  //function that edits card to db via mutation
  const [editCard, { editError }] = useMutation(EDIT_CARD, {
    update(cache, { data: { editCard } }) {
      try {

        //console.log(addCard);
        //console.log(addCard._id);

        //once the card has been added, redirect to the card-form for that card (self)
        //window.location.href = "/card/" + addCard._id;
        window.location.href = "/card-form/" + addCard._id;

      } catch (e) {
        console.error(e);
      }
    }
  });

  //delete card
  const [deleteCard] = useMutation(DELETE_CARD);
  const handleDeleteCard = async (cardId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await deleteCard({
        variables: { 
          _id: cardId
        }
      });
    }
    catch (err) {
        console.error(err);
    }
  };

  //if cardId is passed via url param, fetch card data and populate form
  const { id: cardId } = useParams();
  //console.log(cardId);
  
  const { loading, data } = useQuery(QUERY_CARD, {
    variables: { id: cardId }
  });

  const card = data?.card || {};

  if (!cardId){
    card.cardSubject = '';
    card.cardTitle = '';
    card.cardBody = '';

    //setCharacterCount(5);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  //if cardId is present then the form will edit card data.  if cardId is not present form will create a new card
  //change form title accordingly
  let formTitle = '';
  if (cardId){
    formTitle = 'Edit this Card!';
  }
  else{
    formTitle = 'Add a New Card!';
  }

  return (
    <div>
      <h3>{formTitle}</h3>
      <form
          className="flex-row justify-center justify-space-between-md align-stretch"
          onSubmit={handleFormSubmit}
      >
        <input type="hidden" name="cardId" defaultValue={cardId}></input>
        <select name="cardSubject" className="form-input col-12 col-md-12" defaultValue={card.cardSubject}>
          <option value="Cooking">Cooking</option>
          <option value="Javascript">Javascript</option>
        </select>
        <input 
          type="text" 
          name="cardTitle"
          placeholder="Flash card title..." 
          defaultValue={card.cardTitle}
          className="form-input col-12 col-md-12"
        ></input>
        <textarea
            name="cardBody"
            placeholder="Flash card body..."
            defaultValue={card.cardBody}
            className="form-input col-12 col-md-12"
            onChange={handleChange}
        ></textarea>
        <p className={`col-12 col-md-12 char-counter ${characterCount === 500 || error ? 'text-error' : ''}`}>
          Character Count: {characterCount}/500
          {error && <span className="col-12 col-md-12">Something went wrong...</span>}
        </p>
        <button className="btn col-12 col-md-12" type="submit">Submit</button>
        <button className="btn col-12 col-md-12" type="button" onClick={() => handleDeleteCard(cardId)}>Delete</button>
      </form>
    </div>
  );
};

export default CardForm;