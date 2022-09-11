const getCookieTest = require("../utils/getCookieTest");


test("cookie should be parsed and return the value", () => {
    expect(getCookieTest("token", "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.zSOHDUCQv9IDq6RtsCoPX8mJpQBO6e-H9OiKEcpvWIU;"))
    .toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.zSOHDUCQv9IDq6RtsCoPX8mJpQBO6e-H9OiKEcpvWIU");
});

test("should return false when no cookie", () => {
    expect(getCookieTest("token", "")).toBe(false);
}); 

test("should return false when cookie value not a jwt format", () => {
    expect(getCookieTest("token", "token=aaa;")).toBe(false);
}); 