import { test, expect } from '@playwright/test';
import { getRandomInt, pet } from '../utils/petData';
import { PetStatus } from '../utils/types';

test.describe('Pet endpoint : PUT Method', () => {
    let petId :number;

    test.beforeEach(async ({ request }) => {
        const response = await request.post('pet', {
            data: pet
        });
        petId = pet.id;
        expect(response.status()).toBe(200);
    });

    test('should update an existing pet name', async ({ request }) => {
        const newPetName = `new name ${getRandomInt(1, 1000)}`;
        const response = await request.put('pet', {
            data: {
                id: petId,
                name: newPetName
            }
        });

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody).toBeTruthy();
        expect(responseBody.name).toBe(newPetName);
    });

    test('should update an existing pet status to sold', async ({ request }) => {
        const response = await request.put('pet', {
            data: {
                id: petId,
                status: PetStatus.sold
            }
        });

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody).toBeTruthy();
        expect(responseBody.status).toBe(PetStatus.sold);
    });

});