const fs = require("fs/promises");
const path = require("path");
const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');


const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  }
  
async function getContactById(contactId) {
    const contacts = await listContacts();
    const currentContact = contacts.filter((contact) => contact.id === contactId);
    if (currentContact.length === 0) {
        return null;
    };
    return currentContact;
  }
  
async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
        return null;
    };
    const [removedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removedContact;
  }
  
async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { id: uuidv1(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  }

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  }