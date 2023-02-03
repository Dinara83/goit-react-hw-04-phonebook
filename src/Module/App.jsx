import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './PhonebookContact/ContactForm';
import FilterPhonebook from './FilterPhonebook/FilterPhonebook';
import ContactList from './Contacts/ContactList';

import initialContacts from 'services/contacts.json';
import css from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState([...initialContacts], () => {
    const contacts = JSON.pars(localStorage.getItem('my contacts'));
    return contacts ? contacts : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('my contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isDublicate = name => {
    const normalizedName = name.toLowerCase();
    const result = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });

    return Boolean(result);
  };

  const addFormSubmitContact = ({ name, number }) => {
    if (isDublicate(name)) {
      alert(`${name} is already in contacts.`);
      return false;
    }

    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return [newContact, ...prevContacts];
    });

    return true;
  };

  const removeContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const changeFilter = ({ target }) => setFilter(target.value);

  const getfilterContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedContact = filter.toLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normalizedContact) ||
        number.toLowerCase().includes(normalizedContact)
      );
    });
    return result;
  };

  return (
    <div className={css.conteinerPhonebook}>
      <h1>Phonebook</h1>
      <ContactForm onSubmitForm={addFormSubmitContact} />

      <h2>Contacts</h2>
      <FilterPhonebook onChange={changeFilter} />
      <ContactList
        contacts={getfilterContacts()}
        onDeleteContact={removeContact}
      />
    </div>
  );
};

export default App;
