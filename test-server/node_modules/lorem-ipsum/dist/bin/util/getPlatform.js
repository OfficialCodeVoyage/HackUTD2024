"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _errors = require("../constants/errors");

/**
 * @returns  The process platform.
 * @throws
 */
var getPlatform = function getPlatform() {
  if (!process || typeof process.platform !== "string") {
    throw new Error(_errors.CANNOT_DETERMINE_PLATFORM);
  }

  return process.platform;
};

var _default = getPlatform;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJnZXRQbGF0Zm9ybSIsInByb2Nlc3MiLCJwbGF0Zm9ybSIsIkVycm9yIiwiQ0FOTk9UX0RFVEVSTUlORV9QTEFURk9STSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW4vdXRpbC9nZXRQbGF0Zm9ybS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDQU5OT1RfREVURVJNSU5FX1BMQVRGT1JNIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9lcnJvcnNcIjtcblxuLyoqXG4gKiBAcmV0dXJucyAgVGhlIHByb2Nlc3MgcGxhdGZvcm0uXG4gKiBAdGhyb3dzXG4gKi9cbmNvbnN0IGdldFBsYXRmb3JtID0gKCk6IHN0cmluZyA9PiB7XG4gIGlmICghcHJvY2VzcyB8fCB0eXBlb2YgcHJvY2Vzcy5wbGF0Zm9ybSAhPT0gXCJzdHJpbmdcIikge1xuICAgIHRocm93IG5ldyBFcnJvcihDQU5OT1RfREVURVJNSU5FX1BMQVRGT1JNKTtcbiAgfVxuICByZXR1cm4gcHJvY2Vzcy5wbGF0Zm9ybTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdldFBsYXRmb3JtO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFNQSxXQUFXLEdBQUcsU0FBZEEsV0FBYyxHQUFjO0VBQ2hDLElBQUksQ0FBQ0MsT0FBRCxJQUFZLE9BQU9BLE9BQU8sQ0FBQ0MsUUFBZixLQUE0QixRQUE1QyxFQUFzRDtJQUNwRCxNQUFNLElBQUlDLEtBQUosQ0FBVUMsaUNBQVYsQ0FBTjtFQUNEOztFQUNELE9BQU9ILE9BQU8sQ0FBQ0MsUUFBZjtBQUNELENBTEQ7O2VBT2VGLFcifQ==