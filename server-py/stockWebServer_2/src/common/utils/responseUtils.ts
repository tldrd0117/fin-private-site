export default {
    isError: (body: object) => {
        return Object.hasOwnProperty.call(body, 'error');
    },
    makeSuccessBody: (body: object) => {
        return {
            ...body,
            result: 'success',
        };
    },
    makeErrorBody: (body: object) => {
        return {
            ...body,
            result: 'fail',
        };
    },
    makeErrorBodyByError: (error: Error) => {
        return {
            error: [
                {
                    message: error.message,
                },
            ],
            result: 'fail',
        };
    },
    makeErrorBodyByMessage: (message: string) => {
        return {
            error: [
                {
                    message: message,
                },
            ],
            result: 'fail',
        };
    },
    makeErrorBodyByErrors: (errors: Array<Error>) => {
        return {
            error: errors.map((e) => {
                return {
                    message: e.message,
                };
            }),
            result: 'fail',
        };
    },
};
