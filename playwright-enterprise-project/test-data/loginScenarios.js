import { USERS } from './users';

export const LOGIN_SCENARIOS = [
    {
        title: 'Standard user can login successfully',
        user: USERS.STANDARD,
        shouldLogin: true
    },
    {
        title: 'Locked user cannot login',
        user: USERS.LOCKED,
        shouldLogin: false,
        errorMessage: 'Epic sadface: Sorry, this user has been locked out.'
    },
    {
        title: 'Problem user can login',
        user: USERS.PROBLEM,
        shouldLogin: true
    },
    {
        title: 'Performance glitch user can login (slow response)',
        user: USERS.PERFORMANCE,
        shouldLogin: true
    },
    {
        title: 'Error user can login',
        user: USERS.ERROR,
        shouldLogin: true
    },
    {
        title: 'Visual user can login',
        user: USERS.VISUAL,
        shouldLogin: true
    }
];