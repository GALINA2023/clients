export const createClientsHeader = () => {
    const header = document.createElement('header');
    const container = document.createElement('div');
    const wrapper = document.createElement('div');
    const logo = document.createElement('a');
    const logoImg = document.createElement('img');
    const inner = document.createElement('div');
    const form = document.createElement('form');
    const input = document.createElement('input');
    const findList = document.createElement('ul');

    findList.classList.add('find-list', 'hide');
    header.classList.add('header');
    container.classList.add('container', 'header__container');
    wrapper.classList.add('header__wrapper');
    logo.classList.add('logo', 'header__logo');
    logoImg.classList.add('logo__img');
    logoImg.src = 'img/logo.png';
    logoImg.alt = 'Logo Clients';
    inner.classList.add('header__inner');
    form.classList.add('header__form');
    input.classList.add('header__input');
    input.placeholder = 'Введите запрос';


    inner.append(input, findList);
    header.append(container);
    logo.append(logoImg);
    form.append(inner);
    container.append(logo, form);



    return header;

}

