import PropTypes from 'prop-types';

import ContactListItem from './ContactListItem/ContactListItem';

import css from './contact-list.module.css';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <div>
      <ul className={css.contactsList}>
        {contacts.map(({ id, name, number }) => (
          <ContactListItem
            key={id}
            name={name}
            number={number}
            deleteContact={onDeleteContact}
            id={id}
          />
        ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
