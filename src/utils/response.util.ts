import { HttpStatus } from '@nestjs/common';

export class ResponseHandler {
    /** ✅ Success Response (200) */
    static ok(data: any = {}, message = 'Success') {
        return {
            success: true,
            status: HttpStatus.OK,
            message,
            data,
        };
    }

    /** ✅ Created Response (201) */
    static created(data: any = {}, message = 'Resource created successfully') {
        return {
            success: true,
            status: HttpStatus.CREATED,
            message,
            data,
        };
    }

    /** ✅ No Content (204) */
    static noContent(message = 'No content') {
        return {
            success: true,
            status: HttpStatus.NO_CONTENT,
            message,
            data: null,
        };
    }

    /** ❌ Bad Request (400) */
    static badRequest(message = 'Bad request') {
        return {
            success: false,
            status: HttpStatus.BAD_REQUEST,
            message,
            data: null,
        };
    }

    /** ❌ Unauthorized (401) */
    static unauthorized(message = 'Unauthorized') {
        return {
            success: false,
            status: HttpStatus.UNAUTHORIZED,
            message,
            data: null,
        };
    }

    /** ❌ Forbidden (403) */
    static forbidden(message = 'Forbidden') {
        return {
            success: false,
            status: HttpStatus.FORBIDDEN,
            message,
            data: null,
        };
    }

    /** ❌ Not Found (404) */
    static notFound(message = 'Not found') {
        return {
            success: false,
            status: HttpStatus.NOT_FOUND,
            message,
            data: null,
        };
    }

    /** 💥 Conflict (409) */
    static conflict(message = 'Conflict') {
        return {
            success: false,
            status: HttpStatus.CONFLICT,
            message,
            data: null,
        };
    }

    /** 💥 Internal Server Error (500) */
    static internalError(message = 'Internal Server Error') {
        return {
            success: false,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message,
            data: null,
        };
    }

    /** 💥 Service Unavailable (503) */
    static serviceUnavailable(message = 'Service Unavailable') {
        return {
            success: false,
            status: HttpStatus.SERVICE_UNAVAILABLE,
            message,
            data: null,
        };
    }
}
