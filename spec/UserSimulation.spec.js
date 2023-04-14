describe("User Simulation: ", function() {
    let id;
    
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
                    email: (Math.floor(Math.random() * 1000000)).toString(),
                    password: (Math.floor(Math.random() * 1000000)).toString()
                })
            })
            .then(res => {
                status = res.status;
                return res.json()
            })
            .then(data => {
                apiResponse = data;
                id = apiResponse._id;
            });
        });

        it("should return user data", function() {
            expect(Object.keys(apiResponse)).toContain("token");
        });
    
        it("should give 201 status code", function() {
            expect(status).toEqual(201);
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
                id: id
            })
        });
    });
});