import { createContactItemByType, formatDate, formatTime } from "./add.js";
import { deleteClientModal } from "./createDeleteModal.js";
import { editClientModal } from "./editClient.js";
import { svgSpinner } from "./svg.js";

export const createClientItem = (data) => {
    const clientTr = document.createElement('tr');
    const clientIDTd = document.createElement('td');
    const clientID = document.createElement('span');
    const clientCardLink = document.createElement('a');
    const clientFullName = document.createElement('td');
    const clientName = document.createElement('span');
    const clientSurname = document.createElement('span');
    const clientLastName = document.createElement('span');
    const clientCreated = document.createElement('td');
    const createDate = document.createElement('span');
    const createTime = document.createElement('span');
    const clientChanged = document.createElement('td');
    const changedDate = document.createElement('span');
    const changedTime = document.createElement('span');
    const clientContacts = document.createElement('td');
    const clientActions = document.createElement('td');
    const clientEdit = document.createElement('button');
    const clientDelete = document.createElement('button');

    const deleteClient = deleteClientModal();
    const editClient = editClientModal(data);

    const editSpinner = document.createElement('span');
    const deleteSpinner = document.createElement('span');

    editSpinner.classList.add('actions__spinner');
    deleteSpinner.classList.add('actions__spinner');

    clientCardLink.classList.add('client__card__link')

    clientTr.classList.add('clients__item');
    clientTr.id = data.id;
    clientIDTd.classList.add('client__id');
    clientFullName.classList.add('clients__fullname');
    clientName.classList.add('clients__name');
    clientSurname.classList.add('clients__surname');
    clientLastName.classList.add('clients__lastname');
    clientCreated.classList.add('clients__created');
    createDate.classList.add('create__date');
    createTime.classList.add('create__time');
    clientChanged.classList.add('clients__changed');
    changedDate.classList.add('changed__date');
    changedTime.classList.add('changed__time');
    clientContacts.classList.add('clients__contacts');
    clientActions.classList.add('clients__actions');
    clientDelete.classList.add('clients__delete', 'btn-reset');
    clientEdit.classList.add('clients__edit', 'btn-reset');

    for (const contact of data.contacts) {
        createContactItemByType(contact.type, contact.value, clientContacts)
    }

    const deleteById = () => {
        import('./clientsApi.js').then(({ deleteClientItem }) => {
            deleteClient.deleteModalDelete.addEventListener('click', () => {

                try {
                    deleteClient.deleteSpinner.style.display = 'block';
                    setTimeout(() => {
                        deleteClientItem(data.id);
                        document.getElementById(data.id).remove();
                        deleteClient.deleteModal.remove();
                    }, 1000)

                } catch (error) {
                    console.log(error);
                } finally {
                    setTimeout(() => deleteClient.deleteSpinner.style.display = 'none', 1000)
                }
            });

        });
    }


    clientDelete.addEventListener('click', () => {
        deleteSpinner.style.display = 'block';
        clientDelete.classList.add('action-wait');

        setTimeout(() => {
            deleteById();
            document.body.append(deleteClient.deleteModal);

            deleteSpinner.style.display = 'none';
            clientDelete.classList.remove('action-wait');
        }, 1000);
    });


    clientEdit.addEventListener('click', () => {
        editSpinner.style.display = 'block';
        clientEdit.classList.add('action-wait');

        setTimeout(() => {
            document.body.append(editClient.editModal);

            editSpinner.style.display = 'none';
            clientEdit.classList.remove('action-wait');
        }, 1000);
    });


    deleteSpinner.innerHTML = svgSpinner;
    editSpinner.innerHTML = svgSpinner;

    clientID.textContent = data.id.substr(9);
    clientName.textContent = data.name;
    clientSurname.textContent = data.surname;
    clientLastName.textContent = data.lastName;
    clientEdit.textContent = 'Изменить';
    clientDelete.textContent = 'Удалить';

    createDate.textContent = formatDate(data.createdAt);
    createTime.textContent = formatTime(data.createdAt);

    changedDate.textContent = formatDate(data.updatedAt);
    changedTime.textContent = formatTime(data.updatedAt);

    clientIDTd.append(clientID)
    clientFullName.append(clientSurname, clientName, clientLastName);
    clientCreated.append(createDate, createTime);
    clientChanged.append(changedDate, changedTime);
    clientActions.append(clientEdit, clientDelete);
    clientDelete.append(deleteSpinner);
    clientEdit.append(editSpinner);
    clientTr.append(
        clientIDTd,
        clientFullName,
        clientCreated,
        clientChanged,
        clientContacts,
        clientActions
    );

    return clientTr;
}

