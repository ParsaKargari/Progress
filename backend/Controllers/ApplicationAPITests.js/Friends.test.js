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
  },
];

const mockFriendsDataOutput = [
  {
    friendID: "user123",
    friendUsername: "user123Name",
    friendStatus: "online",
    friendPercentage: 75,
  },
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
      const createFriendMock = jest.spyOn(
        Friends.prototype,
        "getFriendsWithPersonAllData"
      );
      createFriendMock.mockReturnValue([]);
      const friendID = 1;

      const res = await request(app).get(`/friends/${friendID}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual([]);
    });

    // Test 3: Condition that ID exists, given user has friends
    it("Should return a list of friends", async () => {
      const createFriendMock = jest.spyOn(
        Friends.prototype,
        "getFriendsWithPersonAllData"
      );
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
      const acceptFriendMock = jest.spyOn(
        Friends.prototype,
        "acceptFriendRequest"
      );
      acceptFriendMock.mockReturnValue({});

      const friendID = 1;
      const friendRequestID = 2;

      const res = await request(app).get(
        `/friends/acceptFriend/${friendID}/${friendRequestID}`
      );
      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual("success");
    });
  });

  // What's being tested?
  // Declining a friend request
  describe("/friends/declineFriend/:id/:friendId", () => {
    // List of tests
    // Test 1: Condition that friend request does not exist
    it("Should return a success message", async () => {
      const declineFriendMock = jest.spyOn(
        Friends.prototype,
        "declineFriendRequest"
      );
      declineFriendMock.mockReturnValue({});

      const friendID = 1;
      const friendRequestID = 2;

      const res = await request(app).get(
        `/friends/declineFriend/${friendID}/${friendRequestID}`
      );
      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual("success");
    });
  });

  // What's being tested?
  // Getting a list of friend requests, both sent and received
  describe("/friends/getRequests/:id", () => {
    // Test 1: Condition that ID exists, given user has no friend requests
    it("Should return an empty array", async () => {
      const mockReturnValue = [{ RequestsReceived: [], RequestsSent: [] }]; // Adjusted mock return value

      const getRequestsMock = jest.spyOn(Friends.prototype, "getRequestsSent");
      getRequestsMock.mockReturnValue(mockReturnValue);

      const getRequestsReceivedMock = jest.spyOn(
        Friends.prototype,
        "getRequestsReceived"
      );
      getRequestsReceivedMock.mockReturnValue(mockReturnValue);

      const friendID = 1;

      const res = await request(app).get(`/friends/getRequests/${friendID}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual([[], []]); // Expecting an array of two empty arrays
    });

    // Test 2: Condition that ID exists, given user has friend requests
    it("Should return a list of friend requests", async () => {
      const mockRequestsSent = [{ RequestsSent: ["user2", "user3"] }];
      const mockRequestsReceived = [{ RequestsReceived: ["user4", "user5"] }];

      // Mock user names based on IDs (for simplicity, IDs are used directly as names)
      const mockUsernamesSent = ["user2Name", "user3Name"];
      const mockUsernamesReceived = ["user4Name", "user5Name"];

      // Setup mocks
      const getRequestsSentMock = jest.spyOn(
        Friends.prototype,
        "getRequestsSent"
      );
      getRequestsSentMock.mockReturnValue(mockRequestsSent);
      const getRequestsReceivedMock = jest.spyOn(
        Friends.prototype,
        "getRequestsReceived"
      );
      getRequestsReceivedMock.mockReturnValue(mockRequestsReceived);
      const getUserNamesFromIDListMock = jest.spyOn(
        Friends.prototype,
        "getUserNamesFromIDList"
      );
      // Mock the usernames return based on the IDs received or sent
      getUserNamesFromIDListMock
        .mockImplementationOnce((ids) => Promise.resolve(mockUsernamesReceived)) // First call for received IDs
        .mockImplementationOnce((ids) => Promise.resolve(mockUsernamesSent)); // Second call for sent IDs

      const friendID = 1;

      // Perform the request to the test route
      const res = await request(app).get(`/friends/getRequests/${friendID}`);
      console.log("Body: ", res.body);

      // Assertions
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual([
        expect.arrayContaining(mockUsernamesSent), // Expect array containing names of users to whom requests were sent
        expect.arrayContaining(mockUsernamesReceived), // Expect array containing names of users who sent requests
      ]);

      // Verify that mocks were called as expected
      expect(getRequestsSentMock).toHaveBeenCalledWith(friendID.toString());
      expect(getRequestsReceivedMock).toHaveBeenCalledWith(friendID.toString());
      expect(getUserNamesFromIDListMock).toHaveBeenCalledTimes(2);
    });
  });

  // What's being tested?
  // Searching
  describe("/friends/search/:id", () => {
    // List of tests
    // Test 1: Condition that ID does not exist
    it("Should return a message to enter a username", async () => {
      const friendID = 999999999;

      const res = await request(app).get(`/friends/search/${friendID}`);
      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual("Please Enter A Username.");
    });
  });

  // What's being tested?
  // Sending a friend request
  describe("/friends/search/:id/:friendId", () => {
    // List of tests
    // Test 1: Other sent a friend request
    it("informs that the searched user already sent a friend request", async () => {
      // Ensure UserID is returned as a string if that’s what your logic expects
      jest
        .spyOn(Friends.prototype, "getFriendID")
        .mockReturnValue([{ UserID: "2" }]);
      jest
        .spyOn(Friends.prototype, "getFriendsWithPersonAllData")
        .mockReturnValue([]);
      jest
        .spyOn(Friends.prototype, "getRequestsReceived")
        .mockReturnValue([{ RequestsReceived: ["2"] }]);

      const friendID = "1"; // Assuming the IDs are expected as strings
      const friendRequestID = "2";

      const res = await request(app).get(
        `/friends/search/${friendID}/${friendRequestID}`
      );

      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual(
        "This user has already sent you a friend request! Accept it to add them as a friend."
      );
    });

    // Test 2:
    // Other has already sent a friend request
    it("informs that you already got a friend request", async () => {
      jest
        .spyOn(Friends.prototype, "getFriendID")
        .mockReturnValue([{ UserID: "2" }]);
      jest
        .spyOn(Friends.prototype, "getFriendsWithPersonAllData")
        .mockReturnValue([]);
      jest
        .spyOn(Friends.prototype, "getRequestsReceived")
        .mockReturnValue([{ RequestsReceived: ["2"] }]);

      const friendID = "1";
      const friendRequestID = "2";

      const res = await request(app).get(
        `/friends/search/${friendID}/${friendRequestID}`
      );

      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual(
        "This user has already sent you a friend request! Accept it to add them as a friend."
      );
    });

    // Test 3: User already added as friend
    it("informs that the user is already added as a friend", async () => {
      jest
        .spyOn(Friends.prototype, "getFriendID")
        .mockReturnValue([{ UserID: "2" }]);
      jest
        .spyOn(Friends.prototype, "getFriendsWithPersonAllData")
        .mockReturnValue([{ Person1: "1", Person2: "2" }]);
      jest.spyOn(Friends.prototype, "getRequestsReceived").mockReturnValue([]);

      const res = await request(app).get(`/friends/search/2/1`);

      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual("User Already Added As Friend");
    });

    // Test 4: Success case
    it("informs that the friend request was successfully sent", async () => {
      jest
        .spyOn(Friends.prototype, "getFriendID")
        .mockReturnValue([{ UserID: "2" }]);
      jest
        .spyOn(Friends.prototype, "getFriendsWithPersonAllData")
        .mockReturnValue([]);
      jest.spyOn(Friends.prototype, "getRequestsReceived").mockReturnValue([]);

      const res = await request(app).get(`/friends/search/1/2`);

      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual("Friend Request Successfully Sent.");
    });
  });

  // What's being tested?
  // adding a friend
  describe("/friends/addFriend", () => {
    // List of tests
    // Test 1: Condition that ID does not exist
    it("successfully adds a friend relationship", async () => {
      const mockAddFriend = jest
        .spyOn(Friends.prototype, "addFriend")
        .mockResolvedValue({
          error: null,
          count: null,
          status: 201,
          statusText: "Created",
        });

      const response = await request(app)
        .post("/friends/addFriend")
        .send({
          friend1: {
            id: "1",
            username: "user1",
            status: "online",
            percentage: 75,
          },
          friend2: {
            id: "2",
            username: "user2",
            status: "online",
            percentage: 80,
          },
        });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        statusText: "Created",
        status: 201,
        count: null,
        error: null,
      });
      expect(mockAddFriend).toHaveBeenCalledWith(
        {
          id: "1",
          username: "user1",
          status: "online",
          percentage: 75,
        },
        {
          id: "2",
          username: "user2",
          status: "online",
          percentage: 80,
        }
      );
    });
  });
});
