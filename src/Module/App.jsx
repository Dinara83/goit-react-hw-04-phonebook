import { useState } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './PhonebookContact/ContactForm';
import FilterPhonebook from './FilterPhonebook/FilterPhonebook';
import ContactList from './Contacts/ContactList';

import initialContacts from 'services/contacts.json';
import css from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState([...initialContacts]);
  const [filter, setFilter] = useState('');

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
        <ContactList contacts={getfilterContacts()} onDeleteContact={removeContact} />
    </div>
  );
};

export default App;

// class App extends Component {
//   state = {
//     contacts: initialContacts,
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = JSON.parse(localStorage.getItem('my contacts'));
//     if (contacts?.length) {
//       // contacts && contacts.length
//       this.setState({ contacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { contacts } = this.state;
//     if (contacts !== prevState.contacts) {
//       localStorage.setItem('my contacts', JSON.stringify(contacts));
//     }
//   }

//   removeContact = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== id),
//     }));
//   };

//   addFormSubmitContact = ({ name, number }) => {
//     if (this.isDublicate(name)) {
//       alert(`${name} is already in contacts.`);
//       return false;
//     }

//     this.setState(prevState => {
//       const { contacts } = prevState;

//       const newContact = {
//         id: nanoid(),
//         name,
//         number,
//       };

//       return { contacts: [newContact, ...contacts] };
//     });

//     return true;
//   };

//   isDublicate(name) {
//     const normalizedName = name.toLowerCase();
//     const { contacts } = this.state;

//     const result = contacts.find(({ name }) => {
//       return name.toLowerCase() === normalizedName;
//     });

//     return Boolean(result);
//   }

//   changeFilter = ({ target }) => {
//     this.setState({ filter: target.value });
//   };

//   getfilterContacts() {
//     const { filter, contacts } = this.state;
//     if (!filter) {
//       return contacts;
//     }
//     const normalizedContact = filter.toLowerCase();
//     const result = contacts.filter(({ name, number }) => {
//       return (
//         name.toLowerCase().includes(normalizedContact) ||
//         number.toLowerCase().includes(normalizedContact)
//       );
//     });
//     return result;
//   }

//   render() {
//     const contacts = this.getfilterContacts();
//     const { addFormSubmitContact, changeFilter, removeContact } = this;

//     return (
//       <div className={css.conteinerPhonebook}>
//         <h1>Phonebook</h1>
//         <ContactForm onSubmit={addFormSubmitContact} />

//         <h2>Contacts</h2>
//         <FilterPhonebook onChange={changeFilter} />
//         <ContactList contacts={contacts} onDeleteContact={removeContact} />
//       </div>
//     );
//   }
// }
