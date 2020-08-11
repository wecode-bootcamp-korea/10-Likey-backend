const {
  connectDatabase,
  disconnectDatabase,
  customAxios,
} = require("./test_utils");
const { expectCt } = require("helmet");

describe("db connection check", () => {
  test("db 연결", async () => {
    let connected;
    try {
      connected = await connectDatabase();
      console.log(connected);
    } catch (err) {
      console.log(err);
    } finally {
      expect(connected).toBeTruthy();
    }
  });

  test("db disconnect", async () => {
    let disconnected;
    try {
      disconnected = await disconnectDatabase();
      console.log(disconnected);
    } catch (err) {
      console.log(err);
    } finally {
      expect(disconnected).toBeTruthy();
    }
  });
});
