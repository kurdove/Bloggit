const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisement/";
const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement = require("../../src/db/models").Advertisement;


describe("routes : advertisement", () => {

    beforeEach((done) => {
        this.advertisement;
        sequelize.sync({force: true}).then((res) => {

            Advertisement.create({
            title: "Assignment in progress",
            description: "Create new model"
            })
            .then((ad) => {
            this.advertisement = ad;
            done();
            })
            .catch((err) => {
            console.log(err);
            done();
            });

        });

    });
  
    describe("GET /advertisement", () => {

        it("should return a status code 200 and all advertisements", (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).toContain("Advertisement");
                // expect(body).toContain("Create new model");
                done();
            });
        });

    });

    describe("GET /advertisement/new", () => {

        it("should render new advertisements form", (done) => {
            request.get(`${base}new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("New Advertisement");
                done();
              });
        });

    });

    describe("POST /advertisement/create", () => {
        
        const options = {
          url: `${base}create`,
          form: {
            title: "My new ad",
            description: "The most proficient advertisement"
          }
        };
  
        it("should create a new advertisement and redirect", (done) => {
  
          request.post(options,
            (err, res, body) => {
                Advertisement.findOne({where: {title: "My new ad"}})
                .then((advertisement) => {
                expect(res.statusCode).toBe(303);
                expect(advertisement.title).toBe("My new ad");
                expect(advertisement.description).toBe("The most proficient advertisement");
                done();
              })
              .catch((err) => {
                console.log(err);
                done();
              });
            }
          );
        });

    });

    describe("GET /advertisement/:id", () => {

        it("should render a view with the selected advertisement", (done) => {
          request.get(`${base}${this.advertisement.id}`, (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain("Assignment in progress");
            done();
          });
        });
   
    });

    describe("GET /advertisement/:id/destroy", () => {

        it("should delete the advertisement with the associated ID", (done) => {
            Advertisement.all()
            .then((ads)=>{
                const adCountBeforeDelete = ads.length;
                expect(adCountBeforeDelete).toBe(1);

                request.post(`${base}${this.advertisement.id}/destroy`, (err, res, body)=>{
                    Advertisement.all()
                    .then((ads)=>{
                        expect(err).toBeNull();
                        expect(ads.length).toBe(adCountBeforeDelete-1);
                        done();
                    });
                });
            });
        });
   
    });

    describe("GET /advertisement/:id/edit", () => {

        it("should render a view with an edit advertisement form", (done) => {
          request.get(`${base}${this.advertisement.id}/edit`, (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain("Edit Advertisement");
            expect(body).toContain("Assignment in progress");
            done();
          });
        });
   
    });

    describe("POST /advertisement/:id/update", () => {

        it("should update the advertisement with the given values", (done) => {
           const options = {
              url: `${base}${this.advertisement.id}/update`,
              form: {
                title: "Final step",
                description: "There will be hapiness"
              }
            };

            request.post(options,
              (err, res, body) => {
   
              expect(err).toBeNull();
              Advertisement.findOne({
                where: { id: this.advertisement.id }
              })
              .then((ads) => {
                expect(ads.title).toBe("Final step");
                done();
              });
            });
        });
   
    });
});