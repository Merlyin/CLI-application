const {
    listContacts,
    getContactById,
    removeContact,
    addContact
} = require("./contacts.js");
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }){
    switch (action) {
        case "list":
            listContacts();
            break;

        case "get":
            const contact = await getContactById(id);
            console.log(contact);
            break;

        case "add":
            addContact(name, email, phone)
                .then(() => console.log("Contact added successfully."))
                .catch((error) => console.error("Error adding contact: " + error.message));
            break;

        case "remove":
            removeContact(id)
                .then(() => console.log("Contact removed successfully."))
                .catch((error) => console.error("Error removing contact: " + error.message));;
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);