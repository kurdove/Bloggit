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
                this.user = user;
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
                this.topic = topic;
                this.post = topic.posts[0];
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

    describe("#getPosts", () => {
        it("should find all posts assiciated to specified Topic", done => {
            Post.create({
                title: "New Post",
                body: "Dummy body goes here",
                topicId: this.topic.id,
                userId: this.user.id
            })
            .then(post => {
                this.topic.getPosts()
                .then((posts) => {
                expect(posts[1].dataValues.title).toBe(post.title);
                expect(posts[1].dataValues.body).toBe(post.body);
                expect(posts[1].dataValues.topicId).toBe(this.topic.id);
                done();
                })
            })
            .catch(err => {
                console.log(err);
                done();
            })
        });
    });
});