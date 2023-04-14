const bcrypt = require("bcryptjs");

describe("User Simulation: ", function() {
    let user, token;

    describe("registering new user", function() {
        let apiResponse, status;

        beforeAll(async function() {
            await fetch("http://localhost:5000/api/users", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    name: `DeleteIfYouSeeThis_${new Date().toISOString()}`,
                    email: "test@gmail.com",
                    password: "password"
                })
            })
            .then(res => {
                status = res.status;
                return res.json()
            })
            .then(data => {
                apiResponse = data;
            });
        });

        it("should return user data", function() {
            expect(Object.keys(apiResponse)).toContain("token");
        });
    
        it("should give 201 status code", function() {
            expect(status).toEqual(201);
        });
    });

    describe("logging in new user", function() {
        let status;

        beforeAll(async function() {
            await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    email: "test@gmail.com",
                    password: "password"
                })
            })
            .then(res => {
                status = res.status;
                return res.json()
            })
            .then(data => {
                user = data;
            });
        });

        it("should return user data", function() {
            expect(Object.keys(user)).toContain("token");
        });
    
        it("should give 200 status code", function() {
            expect(status).toEqual(200);
        });
    });

    describe("updating user email", function() {
        let status;

        beforeAll(async function() {
            token = user.token;
            await fetch("http://localhost:5000/api/users/updateEmail", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    password: "password",
                    newEmail: "updateEmail@gmail.com"
                })
            })
            .then(res => {
                status = res.status;
                return res.json()
            })
            .then(data => {
                user = data;
            });
        });

        it("should return user data", function() {
            expect(user.email).toEqual("updateEmail@gmail.com");
        });
    
        it("should give 200 status code", function() {
            expect(status).toEqual(200);
        });
    });

    describe("updating user password", function() {
        let status;

        beforeAll(async function() {
            await fetch("http://localhost:5000/api/users/updatePassword", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    password: "password",
                    newPassword: "newPassword"
                })
            })
            .then(res => {
                status = res.status;
                return res.json()
            })
            .then(data => {
                user = data;
            });
        });

        it("should return user data", async function() {
            expect(await bcrypt.compare("newPassword", user.password)).toEqual(true, "newPassword does not equal hashed password.");
        });
    
        it("should give 200 status code", function() {
            expect(status).toEqual(200);
        });
    });

    describe("verifying user email (test endpoint)", function() {
        let status;

        beforeAll(async function() {
            await fetch("http://localhost:5000/api/tests/verifyEmail", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then(res => {
                status = res.status;
                return res.json()
            })
            .then(data => {
                user = data;
            });
        });
    
        it("should give 200 status code", function() {
            expect(status).toEqual(200);
        });
    });

    afterAll(async function() {
        await fetch("http://localhost:5000/api/tests/deleteUser", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                id: user._id
            })
        });
    });
});