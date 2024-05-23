import { addClientModal } from "./addNewClient.js";
import { createPreloader } from "./preloader.js";
import { svgAddNewClient } from "./svg.js";

export const createClientsSection = () => {
    const section = document.createElement('section')
    const container = document.createElement('div');
    const main = document.createElement('main');
    const tableWrapper = document.createElement('div')
    const title = document.createElement('h1');
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const thadeTr = document.createElement('tr');
    const diplayID = document.createElement('th');
    const diplayFIO = document.createElement('th');
    const createAt = document.createElement('th');
    const createAtSpan = document.createElement('span')
    const updateAt = document.createElement('th');
    const updateAtSpan = document.createElement('span')
    const contacts = document.createElement('th');
    const actions = document.createElement('th');
    const sortLetters = document.createElement('span');

    const addClientBtn = document.createElement('button');
    const addClientSvg = document.createElement('span');
    const clientSvg = document.createElement('img');

    const sortDisplayItems = [diplayID, diplayFIO, createAt, updateAt];
    for (const item of sortDisplayItems) {
        item.addEventListener('click', () => {
            if (item.classList.contains('sort-down')) {
                item.classList.remove('sort-down');
                item.classList.add('sort-up');
            } else {
                item.classList.add('sort-down');
                item.classList.remove('sort-up');
            }
        });

    }

    createAt.addEventListener('click', () => {
        if (createAt.classList.contains('sort-down')) {
            createAtSpan.classList.add('sort-up')
        } else {
            createAtSpan.classList.remove('sort-up')
        }
    });

    updateAt.addEventListener('click', () => {
        if (updateAt.classList.contains('sort-down')) {
            updateAtSpan.classList.add('sort-up')
        } else {
            updateAtSpan.classList.remove('sort-up')
        }
    });



    diplayID.setAttribute('data-type', 'id');
    diplayFIO.setAttribute('data-type', 'text');
    createAt.setAttribute('data-type', 'create');
    updateAt.setAttribute('data-type', 'update');

    main.classList.add('main');
    section.classList.add('clints');
    container.classList.add('clients__container', 'container');
    tableWrapper.classList.add('clients__wrapper');
    title.classList.add('clients__title');
    table.classList.add('clients__table', 'table');

    thead.classList.add('clients__thead', 'thead-info');
    thadeTr.classList.add('client__thadeTr');

    tbody.classList.add('clients__tbody');
    diplayID.classList.add('thead__item', 'thead-info__item--id', 'sort-up');
    diplayFIO.classList.add('thead__item', 'thead-info__item--fio', 'sort-down');
    createAt.classList.add('thead__item', 'thead-info__item--create', 'sort-down');
    createAtSpan.classList.add('create__span');
    updateAt.classList.add('thead__item', 'thead-info__item--update', 'sort-down');
    updateAtSpan.classList.add('update__span');
    contacts.classList.add('thead__item', 'thead-info__item--contacts');
    actions.classList.add('thead__item', 'thead-info__item--actions');
    sortLetters.classList.add('thead__sort');
    addClientBtn.classList.add('clients__btn', 'btn-reset');
    addClientSvg.classList.add('clients__svg');

    title.textContent = 'Клиенты';
    diplayID.textContent = 'id';
    diplayFIO.textContent = 'Фамилия Имя Отчество';
    sortLetters.textContent = 'а-я';
    createAt.textContent = 'Дата и время ';
    updateAt.textContent = 'Последние ';
    contacts.textContent = 'Контакты';
    actions.textContent = 'Действия';
    addClientBtn.textContent = 'Добавить клиента';
    addClientSvg.innerHTML = svgAddNewClient;

    addClientBtn.addEventListener('click', () => {
        document.body.append(addClientModal());
    })


    main.append(section);
    section.append(container);
    container.append(title, tableWrapper, addClientBtn);
    table.append(thead, tbody);
    thead.append(thadeTr);
    tableWrapper.append(table, createPreloader());
    thadeTr.append(
        diplayID,
        diplayFIO,
        createAt,
        updateAt,
        contacts,
        actions
    )

    diplayFIO.append(sortLetters);
    createAt.append(createAtSpan);
    updateAt.append(updateAtSpan);
    addClientSvg.append(clientSvg);
    addClientBtn.append(addClientSvg);

    return {
        main,
        table,
        tbody
    }
}
createClientsSection();