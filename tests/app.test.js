const { getAllGames, getGameById } = require("../controllers/index");
const { app } = require("../index");
const http = require("http");
const request = require('supertest');

jest.mock("../controllers", () => ({
    ...jest.requireActual("../controllers"),
    getAllGames: jest.fn(),
    getGameById: jest.fn(),
}));

let server;
beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll((done) => {
    server.close(done);
});

describe("API testing", () => {
    it("Should return list of all games", async () => {
        let mockGames = [
            {
                'gameId': 1,
                'title': 'The Legend of Zelda: Breath of the Wild',
                'genre': 'Adventure',
                'platform': 'Nintendo Switch',
            },
            {
                'gameId': 2,
                'title': 'Red Dead Redemption 2',
                'genre': 'Action',
                'platform': 'PlayStation 4',
            },
            {
                'gameId': 3,
                'title': 'The Witcher 3: Wild Hunt',
                'genre': 'RPG',
                'platform': 'PC',
            },
        ];
        
        getAllGames.mockReturnValue(mockGames);
        let result = await request(server).get("/games");
        expect(result.statusCode).toBe(200);
        expect(result.body).toEqual(mockGames);
    });

    it("should return game by id", async () => {
        let mockGame = {
            'gameId': 2,
            'title': 'Red Dead Redemption 2',
            'genre': 'Action',
            'platform': 'PlayStation 4',
        };

        getGameById.mockReturnValue(mockGame);

        let result = await request(server).get("/games/details/2");
        expect(result.statusCode).toBe(200);
        expect(result.body).toEqual(mockGame);
    });
});

describe("Endpoint test", () => {
    it("should return all games using getAllGames function", () => {
        let mockGames = [
            {
                'gameId': 1,
                'title': 'The Legend of Zelda: Breath of the Wild',
                'genre': 'Adventure',
                'platform': 'Nintendo Switch',
            },
            {
                'gameId': 2,
                'title': 'Red Dead Redemption 2',
                'genre': 'Action',
                'platform': 'PlayStation 4',
            },
            {
                'gameId': 3,
                'title': 'The Witcher 3: Wild Hunt',
                'genre': 'RPG',
                'platform': 'PC',
            },
        ];

        getAllGames.mockReturnValue(mockGames);
        let result = getAllGames();
        expect(result).toEqual(mockGames); // Directly compare result with mock data
        expect(getAllGames).toHaveBeenCalled(); // Ensure the mock function was called
    });
});
