
export const updateObject = (oldObject: any, updatedValues: any) => {
    return {
        ...oldObject,
        ...updatedValues,
    };
};

export const checkValidity = (value: any, rules: any) => {
    let isValid: any = true;

    if (rules.required) {
        let convertedValue = value.toString(); // in case it is a number we convert it to string
        isValid =
            convertedValue.trim() !== '' &&
            convertedValue.trim() !== null &&
            isValid;
    }

    if (rules.isEmail) {
        const pattern = /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/;
        isValid = pattern.test(value) && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
    }

    if (rules.isImageTypeValid) {
        const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (value !== undefined) {
            let resultIsValid = allowedImageTypes.find(function(element) {
                return element === value.type;
            });

            isValid = resultIsValid && isValid;
        }
    }

    if (rules.isPhoneOrFaxNumber && rules.required === undefined) {
        if (value.trim() !== '') {
            const pattern = /^[+]*[0-9][-\s/0-9]*$/;
            isValid = pattern.test(value.trim()) && isValid;
        } else {
            isValid = true;
        }
    }

    if (rules.isPhoneOrFaxNumber && rules.required) {
        const pattern = /^[+]*[0-9][-\s/0-9]*$/;
        isValid = pattern.test(value.trim()) && isValid;
    }

    return isValid;
};

export const formatDate = (d: Date) => {
    let year = `${d.getFullYear()}`.substring(2),
        month =
            d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1),
        date = d.getDate() > 9 ? d.getDate() : '0' + d.getDate();
    // hours = (d.getHours()),
    // minutes = (d.getMinutes());

    // return `${date}.${month}.${year} ${hours}:${minutes}`;
    return `${month} ${date},${year}`;
};

export const formatDateForMiniChart = (d: Date) => {
    let month =
            d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1),
        date = d.getDate() > 9 ? d.getDate() : '0' + d.getDate();

    return `${date}.${month}`;
};

export const formatDateForChart = (d: Date) => {
    let year = `${d.getFullYear()}`.substring(2),
        month =
            d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1),
        date = d.getDate() > 9 ? d.getDate() : '0' + d.getDate(),
        hours = d.getHours(),
        minutes = d.getMinutes();

    return `${date}.${month}.${year} ${hours}:${minutes}`;
    // return `${date}.${month}.${year}`;
};
