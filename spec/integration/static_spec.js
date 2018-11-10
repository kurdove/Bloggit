const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

//assignment-01 begin
const marco = "http://localhost:3000/marco";
//assignment-01 end

describe('routes : static', ()=>{
    describe('GET /', ()=>{
        it("should return status code 200 and have 'Welcome to Bloccit' in the body of the response", ()=>{
            request.get(base, (err, res, body)=>{
                expect(res.statusCode).toBe(200);
                expect(body).toContain("Welcome to Bloccit");
                done();
            });
        });
    });

    //assignment-01 begin
    describe('GET /marco', ()=>{
        it('should return status code 200 and --polo--', (done)=>{
            request.get(marco, (err, res, body)=>{
                expect(res.statusCode).toBe(200);
                expect(body).toBe('polo');
            });
        });
    });
    //assignment-01 end
});