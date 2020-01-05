const mongo = require('../index.js');
const config = require('../config.json');
const assert = require('assert');
describe("Mongo DB", () => {
    describe("Connection", () => {
        let db = null;
        let error = null;
        it("Should connect successfully", (done) => {
            mongo(config.DB_URI, 'furlenco')
                .then((DB) => {
                    db = DB;
                    if (db.is_connected()) {
                        db.close();
                        done();
                    } else done(db);
                })
                .catch((e) => {
                    error = e;
                    console.error(error);
                    done(error);
                });
        });
        it("Should fail connecting", (done) => {
            mongo(config.DB_URI.replace("intugine", "xyz"), 'furlenco')
                .then((DB) => {
                    done({ message: "Not sure how it got here" });
                })
                .catch((e) => {
                    if (e.message === "Authentication failed.") done();
                    else done(e);
                });
        });
    });
    describe("Functions", () => {
        let db = null;
        before((done) => {
            mongo(config.DB_URI, 'furlenco')
                .then((DB) => {
                    db = DB;
                    done();
                })
                .catch((e) => {
                    done(error);
                });
        });
        describe("is_connected", () => {
            it("Should return true", (done) => {
                if (db && db.is_connected()) done();
                else done(db);
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
                    })
            });
            it("Should return 1 element with query", (done) => {
                db.read("trips", { device: "A467" })
                    .then((r) => {
                        if (Array.isArray(r) && r.length === 1) done();
                        else done(r);
                    })
                    .catch((e) => {
                        done(e);
                    })
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
            it("Should return more than 1 elements with query", (done) => {
                db.read("trips", { device: "A467" }, 10)
                    .then((r) => {
                        if (Array.isArray(r) && r.length > 1) done();
                        else done(r);
                    })
                    .catch((e) => {
                        done(e);
                    })
            });
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
                    })
            });
        });
        describe("objectid", () => {
            it("Should return null", (done) => {
                const objectid = db.objectid("ABCD")
                if (!objectid) done();
                else done(objectid);
            });
            it("Should return objectid", (done) => {
                const objectid = db.objectid("5d9cc857f0013b13df9a31eb")
                if (objectid) done();
                else done(objectid);
            });
        });
        describe("count", () => {
            it("Should return a number", (done) => {
                db.count('devices')
                    .then((r) => {
                        if (typeof(r) === "number") done();
                        else done(r);
                    })
                    .catch((e) => {
                        done(e);
                    })
            });
        });
        describe("close", () => {
            it("Connection should be closed", (done) => {
                setTimeout(() => {
                    db.close();
                    done();
                })
            });
        });
    });
});