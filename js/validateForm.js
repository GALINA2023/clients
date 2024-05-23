export const validateClientForm = () => {
    const userName = document.getElementById('placeholderNameUp');
    const userSurname = document.getElementById('placeholderSurameUp');
    const userLastName = document.getElementById('placeholderLastNameUp');
    const unacceptableLetter = document.getElementById('unacceptableLetter');
    const writeName = document.getElementById('writeName');
    const writeSurname = document.getElementById('writeSurename');
    const writeLastName = document.getElementById('writeLastName');
    const requiredValue = document.getElementById('requiredValue');

    const validateArray = [unacceptableLetter, writeName, writeSurname, writeLastName, requiredValue]

    const regexp = /[^а-яА-ЯёЁ]+$/g;

    const onInputValue = input => {
        input.addEventListener('iput', () => {
            input.style.borderColor = 'var(--color-modalline)';
            for (const item of validateArray) {
                item.textContent = '';
            }
        });

        input.oncut = input.oncopy = input.onpaste = () => {
            input.style.borderColor = 'var(--color-modalline)';
            for (const item of validateArray) {
                item.textContent = '';
            }
        };

        input.onchange = () => {
            input.style.borderColor = 'var(--color-modalline)';

            if (userSurname.value && userName.value && userLastName.value) {
                for (const item of validateArray) {
                    item.textContent = '';
                }
            }
        };
    };

    onInputValue(userName);
    onInputValue(userSurname);
    onInputValue(userLastName);

    const checkRequiredName = (input, message, name) => {
        if (!input.value) {
            input.style.borderColor = 'rgba(240, 106, 77, 1)';
            message.textContent = `Введите ${name} клиента!`;
            return false;
        } else {
            message.textContent = '';
        }
        return true;
    }

    const checkByRegexp = (input, regexp) => {
        if (regexp.test(input.value)) {
            input.style.borderColor = 'rgba(240, 106, 77, 1)';
            unacceptableLetter.textContent = `Недопустимые символы!`;
            return false
        }
        return true;
    };

    if (!checkRequiredName(userSurname, writeSurname, 'Фамилию')) {
        return false
    };
    if (!checkRequiredName(userName, writeName, 'Имя')) {
        return false
    };

    if (!checkByRegexp(userSurname, regexp)) {
        return false
    };
    if (!checkByRegexp(userName, regexp)) {
        return false
    };
    if (!checkByRegexp(userLastName, regexp)) {
        return false
    };

    return true;

}