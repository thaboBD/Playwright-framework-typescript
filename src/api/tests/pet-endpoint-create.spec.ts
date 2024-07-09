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
    });
});
