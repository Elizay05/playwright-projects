export const AUTH_ERRORS = {
    UNAUTHORIZED: (path) =>
        `Epic sadface: You can only access '${path}' when you are logged in.`
};

export const LOGIN_ERRORS = {
    username_required: 'Username is required',
    password_required: 'Password is required',
    invalid_credentials: 'Username and password do not match any user in this service'
};

export const CHECKOUT_INFO_FORM_ERRORS = {
    first_name_required: 'First Name is required',
    last_name_required: 'Last Name is required',
    postal_code_required: 'Postal Code is required'
};