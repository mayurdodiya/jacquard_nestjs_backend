export const RESPONSE_MESSAGES = {
    // ✅ Fetch / Get Data Messages
    GET_DATA: (entity = 'Data') => `${entity} fetched successfully`,
    FETCH_SUCCESS: (entity = 'Data') => `${entity} retrieved successfully`,
    RECORD_FOUND: (entity = 'Record') => `${entity} record found successfully`,
    DATA_FOUND: (entity = 'Data') => `${entity} data found`,
    DATA_EXIST: (entity = 'Data') => `${entity} data already exist!`,
    FETCHED_SUCCESS: (entity = 'Data') => `${entity} data fetched successfully`,
    GET_SUCCESS: (entity = 'Data') => `${entity} data retrieved successfully`,

    // Other Examples
    CREATED: (entity = 'Resource') => `${entity} created successfully`,
    UPDATED: (entity = 'Resource') => `${entity} updated successfully`,
    DELETED: (entity = 'Resource') => `${entity} data deleted successfully`,
    NOT_FOUND: (entity = 'Resource') => `${entity} not found`,

    // ✅ Authentication
    LOGIN_SUCCESS: (entity = 'User') => `${entity} login successful`,
    LOGOUT_SUCCESS: (entity = 'User') => `${entity} logout successful`,
    INVALID_CREDENTIALS: () => `Invalid email or password`,
    UNAUTHORIZED: () => `Unauthorized access`,

    // ✅ Entity Not Found
    PROFILE_FETCHED: (entity = 'Profile') => `${entity} fetched successfully`,
    PROFILE_UPDATED: (entity = 'Profile') => `${entity} data updated successfully`,

    // ✅ Errors
    SOMETHING_WENT_WRONG: () => 'Something went wrong',
    INTERNAL_SERVER_ERROR: () => 'Internal Server Error',
    BAD_REQUEST: () => 'Bad Request',
    FORBIDDEN: () => 'Access Forbidden',
    CONFLICT: (entity = 'Resource') => `${entity} conflict occurred`,
    SERVICE_UNAVAILABLE: () => 'Service is currently unavailable',

    // ✅ Validation
    MISSING_FIELDS: (fields: string) => `Missing required fields: ${fields}`,
    INVALID_INPUT: (field = 'Input') => `Invalid ${field} provided`,

    // ✅ Password/Authentication Related
    PASSWORD_NOT_MATCHED: () => 'Password does not match',
};
