import { createClientsForm } from "./createModalForm.js"
import { sendClientData } from "./clientsApi.js"
import { validateClientForm } from "./validateForm.js";
import { validateClientContact } from "./validateContact.js";
import { createClientItem } from "./createClientItem.js";

export const addClientModal = () => {
    const createForm = createClientsForm();
    const modal = document.createElement('div');
    const modalContent = document.createElement('div');

    modal.classList.add('modal', 'main-modal', 'modal-active');
    modalContent.classList.add('modal__content', 'main-modal__content', 'modal-active');
    createForm.form.classList.add('add-client');

    modal.append(modalContent);
    modalContent.append(createForm.modalClose, createForm.modalTitle, createForm.form);

    createForm.form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateClientForm()) {

            return;
        }

        const contactTypes = document.querySelectorAll('.contact__name');
        const contactValues = document.querySelectorAll('.contact__input');

        let contacts = [];
        let clientObj = {};

        for (let i = 0; i < contactTypes.length; i++) {
            // validateClientContact(contactTypes[i],contactValues[i]);
            if (!validateClientContact(contactTypes[i], contactValues[i])) {

                return;
            }

            contacts.push({
                type: contactTypes[i].innerHTML,
                value: contactValues[i].value
            })
        }


        clientObj.surname = createForm.inputSurname.value;
        clientObj.name = createForm.inputName.value;
        clientObj.lastName = createForm.inputLastName.value;
        clientObj.contacts = contacts;


        const spinner = document.querySelector('.modal__spinner');
        try {
            spinner.style.display = 'block';
            const data = await sendClientData(clientObj, 'POST');
            setTimeout(() => {
                document.querySelector('.clients__tbody').append(createClientItem(data));
                document.querySelector('.modal').remove();

            }, 1000);
        } catch (error) {
            console.log(error);
        }
        finally {
            setTimeout(() => spinner.style.display = 'block', 1000);
        }

    });

    createForm.modalClose.addEventListener('click', () => {
        modal.remove();
    });

    createForm.cancelBtn.addEventListener('click', () => {
        modal.remove();
    });
    document.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.remove();
        }
    });

    return modal;

}

