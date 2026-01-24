// This file has been intentionally left blank because https://sacedemo.com is not available for API testing.
// The following is an example of how the Auth API tests would look like if the API were accessible.

/*
import { test, expect, request } from '@playwright/test';
import { AuthClient } from './clients/AuthClient';
import { USERS } from '../../test-data/users';

test.describe('Auth API', () => {
    
    test('Login API works', async () => {
        const apiContext = await request.newContext({
            baseURL: process.env.BASE_URL
        });

        const authClient = new AuthClient(apiContext);

        const response = await authClient.login(
            USERS.STANDARD.username,
            USERS.STANDARD.password
        );
        expect(response.status()).toBe(200);
    });

    test('Login fails with invalid credentials', async () => {
        const apiContext = await request.newContext({
            baseURL: process.env.BASE_URL
        });

        const authClient = new AuthClient(apiContext);
        const response = await authClient.login(
            'wrong_user',
            'wrong_pass'
        );

        expect(response.status()).toBe(401);

        const body = await response.json();
        expect(body.message).toBeDefined();
    });
});
*/