const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Post", () => {

    beforeEach((done) => {
        this.topic;
        this.post;
        sequelize.sync({force: true}).then((res) => {

            Topic.create({
                title: "Mission to Moon",
                description: "Mission failed due to sikness on board"
            })
            .then((topic) => {
                this.topic = topic;
                Post.create({
                title: "Failure investigation",
                body: "Investigation results would explain the failure of the mission",
                topicId: this.topic.id
                })
                .then((post) => {
                this.post = post;
                done();
                });
            })
            .catch((err) => {
                console.log(err);
                done();
            });
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

    describe("#getPosts()", () => {

        it("should return the posts associated with the topic", (done) => {

            Topic.create({
                title: "Mission to Mars",
                description: "Mission accomplished in 300 days"
            })
            .then((topic) => {
                Post.create({
                    title: "Day 01",
                    body: "Setting up labaratory",
                    topicId: topic.id
                })
                .then(() => {
                    Post.create({
                        title: "Day 02",
                        body: "Gathering testing samples",
                        topicId: topic.id
                    })
                    .then(() => {
                        topic.getPosts()
                        .then((posts) => {
                            expect(posts[0].title).toBe("Day 01");
                            expect(posts[1].title).toBe("Day 02");
                            done();
                        });
                    })
                });
            })
            .catch((err) => {
                console.log(err);
                done();
            })

        });
    });
});