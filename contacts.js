const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, "utf8");
        const contacts = JSON.parse(data);
        console.table(contacts);
    } catch (error) {
        console.error(error.message);
    }
}

async function getContactById(contactId) {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    return contacts[contactId];
  }

async function addContact(name, email, phone) {
    try {
        const data = await fs.readFile(contactsPath, "utf8");
        const contacts = JSON.parse(data);
        const id = String(contacts.length + 1);
        contacts.push({ id, name, email, phone });
        await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
    } catch (error) {
        console.error(error.message);
    }
}

async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath, "utf8");
        const contacts = JSON.parse(data);
        const newContacts = contacts.slice(0, contactId).concat(contacts.slice(contactId + 1));
        await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};