import {GraphQLError} from "graphql";

export class GQLValidationError extends GraphQLError {
    constructor(obj) {
        super();
        this.message = JSON.stringify(obj);
    }
}
export default {
    UnprocessableEntity: (message) => {
        return new GQLValidationError({errorCode: 422, message});
    }
};