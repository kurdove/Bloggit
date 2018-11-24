const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Post", () => {

    beforeEach((done) => {
        this.topic;
        this.post;
        this.user;
   
        sequelize.sync({force: true}).then((res) => {
   
            User.create({
                email: "starman@tesla.com",
                password: "Trekkie4lyfe"
            })
            .then((user) => {
                this.user = user; //store the user
    
                Topic.create({
                title: "Expeditions to Alpha Centauri",
                description: "A compilation of reports from recent visits to the star system.",
    
                posts: [{
                    title: "My first visit to Proxima Centauri b",
                    body: "I saw some rocks.",
                    userId: this.user.id
                }]
                }, {
    
                include: {
                    model: Post,
                    as: "posts"
                }
                })
                .then((topic) => {
                this.topic = topic; //store the topic
                this.post = topic.posts[0]; //store the post
                done();
                })
            })
        });
    });

    describe("#create()", () => {

        it("should create a topic object with a title, description", (done) => {
            Topic.create({
                title: "Week 1 of investigation",
                description: "This week I was very productive, I was chilling and spending budget money",
                topicId: this.topic.id
            })
            .then((topic) => {

                expect(topic.title).toBe("Week 1 of investigation");
                expect(topic.description).toBe("This week I was very productive, I was chilling and spending budget money");
                done();

            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

    });

    // describe("#getPosts()", () => {

    //     it("should return the posts associated with the topic", (done) => {

    //         Topic.create({
    //             title: "Mission to Mars",
    //             description: "Mission accomplished in 300 days"
    //         })
    //         .then((topic) => {
    //             Post.create({
    //                 title: "Day 01",
    //                 body: "Setting up labaratory",
    //                 topicId: topic.id,
    //                 userId: user.id
    //             })
    //             .then(() => {
    //                 Post.create({
    //                     title: "Day 02",
    //                     body: "Gathering testing samples",
    //                     topicId: topic.id,
    //                     userId: user.id
    //                 })
    //                 .then(() => {
    //                     topic.getPosts()
    //                     .then((posts) => {
    //                         expect(posts[0].title).toBe("Day 01");
    //                         expect(posts[1].title).toBe("Day 02");
    //                         done();
    //                     });
    //                 })
    //             });
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             done();
    //         })

    //     });
    // });
});