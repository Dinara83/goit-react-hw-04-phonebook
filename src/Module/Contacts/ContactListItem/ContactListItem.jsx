import PropTypes from 'prop-types';

import css from './contact-list-item.module.css';

const ContactListItem = ({ id, name, number, deleteContact }) => {
  return (
    <li className={css.contactsItem}>
      <span className={css.contactsText}>
        {name}: {number}
      </span>
      <button className={css.contactsBtn} onClick={() => deleteContact(id)}>
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactListItem;
