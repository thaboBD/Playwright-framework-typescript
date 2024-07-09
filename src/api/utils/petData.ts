export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const petId = getRandomInt(500, 10000);

export const pet = {
    id: petId,
    category: {
        id: petId,
        name: "string"
    },
    name: "doggie",
    photoUrls: [
        "string"
    ],
    tags: [
        {
            id: petId,
            name: "string"
        }
    ],
    status: "available"
};
