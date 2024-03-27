const supertest = require("supertest");
const request = require("supertest");
const app = require("../../app");
// get friends to spyon
const Friends = require("../ApplicationAPIs/Friends");

const mockFriendsDataInput = [
  {
    Person1: "user123",
    Person1Username: "user123Name",
    Person1Status: "online",
    Person1Percentage: 75,
    Person2: "friend456",
    Person2Username: "friend456Name",
    Person2Status: "offline",
    Person2Percentage: 60,
  }
];

const mockFriendsDataOutput = [
  {
    friendID: "user123",
    friendUsername: "user123Name",
    friendStatus: "online",
    friendPercentage: 75,
  }
];

// Friends.test.js
describe("Friends", () => {
  // What's being tested?
  // Getting a list of friends
  describe("/friends/:id", () => {
    // List of tests
    // Test 1: Condition that ID does not exist
    it("Should return an empty array", async () => {
      const friendID = 999999999;

      const res = await request(app).get(`/friends/${friendID}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual([]);
    });

    // Test 2: Condition that ID exists, given user has no friends
    it("Should return an empty array", async () => {
      const createFriendMock = jest.spyOn(Friends.prototype, "getFriendsWithPersonAllData");
      createFriendMock.mockReturnValue([]);
      const friendID = 1;

      const res = await request(app).get(`/friends/${friendID}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual([]);
    });

    // Test 3: Condition that ID exists, given user has friends
    it("Should return a list of friends", async () => {
      const createFriendMock = jest.spyOn(Friends.prototype, "getFriendsWithPersonAllData");
      createFriendMock.mockReturnValue(mockFriendsDataInput);
      const friendID = 1;

      const res = await request(app).get(`/friends/${friendID}`);
      expect(res.statusCode).toEqual(200);

      expect(res.body).toEqual(mockFriendsDataOutput);
    });
  });

  // What's being tested?
  // Accepting a friend request
  describe("/friends/acceptFriend/:id/:friendId", () => {
    // List of tests
    // Test 1: Condition that friend request does not exist
    it("Should return a success message", async () => {
      const acceptFriendMock = jest.spyOn(Friends.prototype, "acceptFriendRequest");
      acceptFriendMock.mockReturnValue({});

      const friendID = 1;
      const friendRequestID = 2;

      const res = await request(app).get(`/friends/acceptFriend/${friendID}/${friendRequestID}`);
      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual('success');
    });
  });
});
