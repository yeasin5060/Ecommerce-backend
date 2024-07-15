class ApiError extends Error {
    constructor (statuscode , message , error = null ) {
        super(message)
        this.message = message;
        this.statuscode = statuscode;
        this.status = false;
        this.error = error;
        this.data = null;
    };
};

export {ApiError};