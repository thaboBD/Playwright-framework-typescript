import { test, expect } from '@playwright/test';
import {PetStatus} from '../utils/types';
import { pet } from '../utils/petData';

test.describe('Pet endpoint : GET Method', () => {

    let petId :number;

    test.beforeEach(async ({ request }) => {
        const response = await request.post('pet', {
            data: pet
        });
        petId = pet.id;
        expect(response.status()).toBe(200);
    });
   
    test('should retrieve pet information by ID for existing pet', async ({ request }) => {
        const response = await request.get(`pet/${petId}`);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody).toBeTruthy();
        expect(responseBody.id).toBe(petId);
    });

    test('should return 404 for non-existing pet', async ({ request }) => {
        const response = await request.get(`pet/${petId + 1}`);
        expect(response.status()).toBe(404);
    });
});

test.describe('Retrieve Pet Information by Status', () => {
    test('should retrieve pet information by status', async ({ request }) => {
        const response = await request.get(`pet/findByStatus?status=${PetStatus.available}`);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody).toBeTruthy();
        expect(responseBody.length).toBeGreaterThan(0);
        expect(responseBody[0].status).toBe(PetStatus.available);
    });
});
