import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '3804591256' },
      { id: 'id-2', name: 'Hermione Kline', number: '3804438912' },
      { id: 'id-3', name: 'Eden Clements', number: '3806451789' },
      { id: 'id-4', name: 'Annie Copeland', number: '3802279126' },
    ],
    filter: '',
  };

  addContact = newContact => {
    const isElem = this.state.contacts.find(contact => {
      return contact.name === newContact.name;
    });
    if (isElem) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, { ...newContact, id: nanoid() }],
      };
    });
  };

  deleteContact = idContact => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== idContact),
    }));
  };

  changeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  searchByFilter = () => {
    const { contacts, filter } = this.state;

    const lowerWord = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerWord)
    );
  };

  render() {
    const { contacts, filter } = this.state;

    const filterList = this.searchByFilter();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAdd={this.addContact} />

        <h2>Contacts</h2>
        <Filter
          listContacts={contacts}
          filter={filter}
          onChange={this.changeFilter}
        />
        <ContactList onDelete={this.deleteContact} listContacts={filterList} />
      </div>
    );
  }
}
