class ExpressError extends Error {
    constructor(status, message) {
        super(message);   // ✅ PASS MESSAGE HERE
        this.status = status;
    }
}

module.exports = ExpressError;
