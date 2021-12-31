const mongo = require("../index.js");
const assert = require("assert");
const config = {
    DB_URI: process.env.DB__URI,
    DB_NAME: "mongo_test",
};
console.log(process.env.INTUGINE_DB_URI);
describe("Mongo DB", () => {
    describe("Connection", () => {
        let db = null;
        let error = null;
        it("Should connect successfully", (done) => {
            mongo(process.env.INTUGINE_DB_URI, "mongo_test", {
                auth: {
                    username: process.env.INTUGINE_DB_USER,
                    password: process.env.INTUGINE_DB_PASS,
                },
            })
                .then(async (DB) => {
                    db = DB;
                    if (db.is_connected()) {
                        await db.close();
                        done();
                    } else done(db);
                })
                .catch((e) => {
                    error = e;
                    console.error(error);
                    done(error);
                });
        });
    });
    describe("Functions", () => {
        let db = null;
        before((done) => {
            mongo(process.env.INTUGINE_DB_URI, "mongo_test", {
                auth: {
                    username: process.env.INTUGINE_DB_USER,
                    password: process.env.INTUGINE_DB_PASS,
                },
            })
                .then((DB) => {
                    db = DB;
                    done();
                })
                .catch((e) => {
                    done(error);
                });
        });
        after(async () => {
            await db.close()
        });
        describe("is_connected", () => {
            it("Should return true", (done) => {
                if (db && db.is_connected()) done();
                else done(db);
            });
        });

        describe("create", () => {
            it("should insert array of objects", (done) => {
                db.create("trips", [
                    {
                        x: 1,
                    },
                    {
                        x: 2,
                    },
                ])
                    .then((r) => {
                        if (r.insertedCount === 2) done();
                        else done(r);
                    })
                    .catch((e) => {
                        done(e);
                    });
            });
            it("should insert single object", (done) => {
                db.create("trips", {
                    x: 1,
                })
                    .then((r) => {
                        if (r.insertedCount === 1) done();
                        else done(r);
                    })
                    .catch((e) => {
                        done(e);
                    });
            });
            it("should override createdAt", (done) => {
                db.create("trips", [
                    {
                        x: 1,
                        createdAt: new Date("2020"),
                    },
                ])
                    .then((r) => {
                        if (r.insertedCount !== 1) return Promise.reject(r);
                        else
                            return db.read("trips", {
                                _id: db.objectid(r.insertedIds[0]),
                            });
                    })
                    .then((r) => {
                        if (
                            r.length &&
                            r[0].createdAt &&
                            r[0].createdAt.toISOString() ===
                                new Date("2020").toISOString()
                        )
                            done();
                        else done(r);
                    })
                    .catch((e) => {
                        done(e);
                    });
            });
        });

        describe("read", () => {
            it("Should return 1 element without query", (done) => {
                db.read("trips")
                    .then((r) => {
                        if (Array.isArray(r) && r.length === 1) done();
                        else done(r);
                    })
                    .catch((e) => {
                        done(e);
                    });
            });
            it("Should return more than 1 element with query", (done) => {
                db.read("trips", { x: 1 }, 10)
                    .then((r) => {
                        if (Array.isArray(r) && r.length > 1) done();
                        else {
                            console.log(r);
                            done(r);
                        }
                    })
                    .catch((e) => {
                        done(e);
                    });
            });
            it("Should return more than 1 elements without query", (done) => {
                db.read("trips", {}, 10)
                    .then((r) => {
                        if (Array.isArray(r) && r.length > 1) done();
                        else done(r);
                    })
                    .catch((e) => {
                        done(e);
                    });
            });
            // it("Should return more than 1 elements with query", (done) => {
            //     db.read("trips", { device: "A467" }, 10)
            //         .then((r) => {
            //             console.log(r)
            //             if (Array.isArray(r) && r.length > 1) done();
            //             else done(r);
            //         })
            //         .catch((e) => {
            //             done(e);
            //         });
            // });
        });
        describe("distinct", () => {
            it("Should find elements", (done) => {
                db.distinct("devices", "id")
                    .then((r) => {
                        if (Array.isArray(r)) done();
                        else done(r);
                    })
                    .catch((e) => {
                        done(e);
                    });
            });
        });
        describe("objectid", () => {
            it("Should return null", (done) => {
                const objectid = db.objectid("ABCD");
                if (!objectid) done();
                else done(objectid);
            });
            it("Should return objectid", (done) => {
                const objectid = db.objectid("5d9cc857f0013b13df9a31eb");
                if (objectid) done();
                else done(objectid);
            });
        });
        describe("count", () => {
            it("Should return a number", (done) => {
                db.count("devices")
                    .then((r) => {
                        if (typeof r === "number") done();
                        else done(r);
                    })
                    .catch((e) => {
                        done(e);
                    });
            });
        });
        describe("close", () => {
            it("Connection should be closed", (done) => {
                db.close()
                    .then((r) => {
                        if (db.is_connected()) done();
                        else done(r);
                    })
                    .catch((e) => {
                        done(e);
                    });
            });
        });
    });
});