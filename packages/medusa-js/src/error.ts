"use strict"
/**
 * NinjaError is the base error for every other NinjaError
 */
export default class NinjaError extends Error {
  constructor() {
    super()
  }

  public static factory(type: ErrorType): NinjaError {
    switch (type) {
      case ErrorType.INVALID_REQUEST:
        return new NinjaInvalidRequestError()
      case ErrorType.AUTHENTICATION:
        return new NinjaAuthenticationError()
      case ErrorType.API:
        return new NinjaAPIError()
      case ErrorType.PERMISSION:
        return new NinjaPermissionError()
      case ErrorType.CONNECTION:
        return new NinjaConnectionError()
    }
  }
}

enum ErrorType {
  "INVALID_REQUEST",
  "API",
  "AUTHENTICATION",
  "PERMISSION",
  "CONNECTION",
}

/**
 * NinjaInvalidRequestError is raised when a request as invalid parameters.
 */
export class NinjaInvalidRequestError extends NinjaError {}

/**
 * NinjaAPIError is raised in case no other type cover the problem
 */
export class NinjaAPIError extends NinjaError {}

/**
 * NinjaAuthenticationError is raised when invalid credentials is used to connect to Ninja
 */
export class NinjaAuthenticationError extends NinjaError {}

/**
 * NinjaPermissionError is raised when attempting to access a resource without permissions
 */
export class NinjaPermissionError extends NinjaError {}

/**
 * NinjaConnectionError is raised when the Ninja servers can't be reached.
 */
export class NinjaConnectionError extends NinjaError {}
