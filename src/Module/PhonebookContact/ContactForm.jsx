import { useState } from 'react';

import PropTypes from 'prop-types';

import css from './contact-form.module.css';
import inititalStateForm from 'services/inititalStateForm';

const ContactForm = ({ onSubmitForm }) => {
  const [state, setState] = useState({ ...inititalStateForm });

  const handleChange = evt => {
    const { name, value } = evt.currentTarget;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmitForm({ name, number });
    setState({ ...inititalStateForm });
  };

  const { name, number } = state;

  return (
    <form className={css.wrapper} onSubmit={handleSubmit}>
      <label className={css.label}>Name</label>
      <input
        className={css.input}
        value={name}
        type="text"
        name="name"
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <label className={css.label}>Number</label>
      <input
        className={css.input}
        value={number}
        type="tel"
        name="number"
        onChange={handleChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button className={css.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
