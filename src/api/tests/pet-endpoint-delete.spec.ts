import { test, expect } from '@playwright/test';
import { pet } from '../utils/petData';

test.describe('Pet endpoint : DELETE Method', () => {
    test.beforeEach(async ({ request }) => {
        const response = await request.post('pet', {
            data: pet
        });
        expect(response.status()).toBe(200);
    });

    test('should delete an existing pet', async ({ request }) => {
        const response = await request.delete(`pet/${pet.id}`);
        expect(response.status()).toBe(200);
    });

    test('should return 404 for non-existing pet', async ({ request }) => {
        const response = await request.delete(`pet/${pet.id + 1}`);
        expect(response.status()).toBe(404);
    });
});