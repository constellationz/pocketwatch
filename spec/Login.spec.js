describe("Login", function() {
    describe("correct user information", function() {
        let apiResponse, status;

        beforeEach(async function() {
            await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    email: "tyler@tyler.com",
                    password: "tyler"
                }),
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
    
        it("should give 200 status code", function() {
            expect(status).toEqual(200);
        });
    });

    describe("incorrect user information", function() {
        let apiResponse, status;

        beforeEach(async function() {
            await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    email: "tyler@tyler.com",
                    password: "asdf"
                }),
            })
            .then(res => {
                status = res.status;
                return res.json()
            })
            .then(data => {
                apiResponse = data;
            });
        });
    
        it("should return failure message", function() {
            expect(Object.keys(apiResponse)).toContain("message");
        });
    
        it("should give 400 status code", function() {
            expect(status).toEqual(400);
        });
    });
});