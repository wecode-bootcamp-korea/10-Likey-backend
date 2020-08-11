const {
  connectDatabase,
  disconnectDatabase,
  customAxios,
} = require("./test_utils");

describe("test_util functions unit tests", () => {
  test("db 연결", async () => {
    let connected;
    try {
      connected = await connectDatabase();
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
      expect(disconnected).toBeUndefined();
    } catch (err) {
      console.log(err);
    }
  });

  test("customized Axios function", async () => {
    const response = await customAxios({
      url: "http://10.58.7.172:8000",
      endpoint: "/product",
    });

    expect(response.status).toBe(200);
    expect(response.data.products.length).toBe(20);
    expect(response.data.products[0]).toHaveProperty("productId");
    expect(response.data.products[19]).toHaveProperty("color");
  });
});
