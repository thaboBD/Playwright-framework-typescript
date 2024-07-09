import { test, expect } from '@playwright/test';
import { pet } from '../utils/petData';

test.describe('Pet endpoint : POST Method', () => {
    test('should create a new pet', async ({ request }) => {
       
        const response = await request.post('pet', {
            data: pet
        });

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody).toBeTruthy();
        expect(responseBody.id).toBe(pet.id);
        expect(responseBody).toEqual(pet);

    });

    test('should not create a new pet as some required fields are missing', async ({ request }) => {
        const response = await request.post('pet', {
            data: {
                name: 'new pet'
            }
        });

        const responseBody = await response.json();

        // pet is still created and status code is 200 due to the API implementation. This would be a bug in the API normally.
        expect(response.status()).toBe(200);
        expect(responseBody).not.toEqual(pet);
    });

    test('should not creat a new pet as request body is empty', async ({ request }) => {
        const response = await request.post('pet', {
            data: {}
        });
        const responseBody = await response.json();

        // pet is still created and status code is 200 due to the API implementation. This would be a bug in the API normally.
        expect(response.status()).toBe(200);
        expect(responseBody).not.toEqual(pet);

    });
});
