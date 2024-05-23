import { createContactItem } from "./createContacts.js";
import { svgContactDefault, svgContactHover, svgSpinner } from "./svg.js";

export const createClientsForm = () => {
    const modalTitle = document.createElement('h2');
    const modalClose = document.createElement('button');
    const form = document.createElement('form');
    const inputLastName = document.createElement('input');
    const labelLastName = document.createElement('label');
    const inputSurname = document.createElement('input');
    const labelSurname = document.createElement('label');
    const inputName = document.createElement('input');
    const labelName = document.createElement('label');
    const requiredSurname = document.createElement('span');
    const requiredName = document.createElement('span');

    const addContactBtn = document.createElement('button');
    const addContactBtnDefaultSvg = document.createElement('span');
    const addContactBtnHoverSvg = document.createElement('span');

    const saveBtn = document.createElement('button');
    const cancelBtn = document.createElement('button');

    const contactsBlock = document.createElement('div');

    const placeholderNameUp = document.createElement('div');
    const placeholderLastNameUp = document.createElement('div');
    const placeholderSurameUp = document.createElement('div');

    const errorBlock = document.createElement('p');
    const unacceptableLetter = document.createElement('span');
    const writeName = document.createElement('span');
    const writeSurename = document.createElement('span');
    const writeLastName = document.createElement('span');
    const requiredValue = document.createElement('span');
    const requiredContacts = document.createElement('span');
    const saveSpinner = document.createElement('span');


    saveSpinner.classList.add('modal__spinner');
    modalTitle.classList.add('modal__title');
    modalClose.classList.add('modal__close', 'btn-reset');
    form.classList.add('modal__form');
    inputName.classList.add('modal__input');
    labelName.classList.add('modal__label');
    inputLastName.classList.add('modal__input');
    labelLastName.classList.add('modal__label');
    inputSurname.classList.add('modal__input');
    labelSurname.classList.add('modal__label');

    requiredSurname.classList.add('modal__label');
    requiredName.classList.add('modal__label');

    placeholderNameUp.classList.add('form__up');
    placeholderLastNameUp.classList.add('form__up');
    placeholderSurameUp.classList.add('form__up');

    addContactBtn.classList.add('modal__btn-contacts', 'modal__btn-contacts--active', 'btn-reset');
    saveBtn.classList.add('modal__btn-save', 'btn-reset', 'site-btn');
    cancelBtn.classList.add('modal__btn-cancel', 'btn-reset');
    addContactBtnDefaultSvg.classList.add('btn-reset', 'btn__contacts-svg', 'btn__contacts-svg--default', 'btn__contacts-svg--active');
    addContactBtnHoverSvg.classList.add('btn-reset', 'btn__contacts-svg', 'btn__contacts-svg--hover');

    contactsBlock.classList.add('modal__contact');
    labelName.for = 'placeholderNameUp';
    labelSurname.for = 'placeholderSurameUp';
    labelLastName.for = ' placeholderLastNameUp';

    inputName.id = 'placeholderNameUp';
    inputLastName.id = 'placeholderLastNameUp';
    inputSurname.id = 'placeholderSurameUp';

    inputName.type = 'text';
    inputLastName.type = 'text';
    inputSurname.type = 'text';

    errorBlock.classList.add('modal__error');
    unacceptableLetter.id = 'unacceptableLetter';
    writeName.id = 'writeName';
    writeSurename.id = 'writeSurename';
    writeLastName.id = 'writeLastName';
    requiredValue.id = 'requiredValue';
    requiredContacts.id = 'requiredContacts';

    saveSpinner.innerHTML = svgSpinner;
    inputSurname.placeholder = 'Фамилия';
    inputName.placeholder = 'Имя';
    inputLastName.placeholder = 'Отчество';

    modalTitle.textContent = 'Новый клиент';
    labelSurname.textContent = 'Фамилия';
    labelName.textContent = 'Имя';
    labelLastName.textContent = 'Отчество';

    addContactBtn.textContent = 'Добавить контакт';
    saveBtn.textContent = 'Сохранить';
    cancelBtn.textContent = 'Отмена';

    requiredSurname.textContent = '*';
    requiredName.textContent = '*';

    addContactBtnDefaultSvg.innerHTML = svgContactDefault;
    addContactBtnHoverSvg.innerHTML = svgContactHover;

    labelName.append(requiredName);
    labelSurname.append(requiredSurname);
    saveBtn.append(saveSpinner);
    placeholderNameUp.append(inputName, labelName);
    placeholderLastNameUp.append(inputLastName, labelLastName);
    placeholderSurameUp.append(inputSurname, labelSurname,);
    contactsBlock.append(addContactBtn);

    errorBlock.append(writeName, writeSurename, writeLastName, requiredValue, unacceptableLetter);

    form.append(
        placeholderSurameUp,
        placeholderNameUp,
        placeholderLastNameUp,
        contactsBlock,
        errorBlock,
        saveBtn,
        cancelBtn);
    addContactBtn.append(addContactBtnDefaultSvg, addContactBtnHoverSvg);



    addContactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const contactItems = document.getElementsByClassName('contact');

        if (contactItems.length < 9) {
            const contactItem = createContactItem();
            contactsBlock.prepend(contactItem.contact);
            if (contactItems.length >= 5) {
                document.querySelector('.main-modal__content').style.top = '60%';
            } else {
                document.querySelector('.main-modal__content').style.top = '50%';
            }
        } else {
            const contactItem = createContactItem();
            contactsBlock.prepend(contactItem.contact);
            addContactBtn.classList.remove('modal__btn-contacts--active');
        }
    });



    addContactBtn.addEventListener('mousemove', () => {
        addContactBtnDefaultSvg.classList.remove('btn__contacts-svg--active');
        addContactBtnHoverSvg.classList.add('btn__contacts-svg--active')
    });
    addContactBtn.addEventListener('mouseleave', () => {
        addContactBtnDefaultSvg.classList.add('btn__contacts-svg--active');
        addContactBtnHoverSvg.classList.remove('btn__contacts-svg--active')
    });


    return {
        form,
        modalTitle,
        modalClose,
        cancelBtn,
        inputName,
        inputSurname,
        inputLastName,
        labelName,
        labelSurname,
        labelLastName,
        contactsBlock,
        addContactBtn,
    };
}