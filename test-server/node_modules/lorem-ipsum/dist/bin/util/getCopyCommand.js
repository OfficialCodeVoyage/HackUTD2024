"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _platforms = require("../../constants/platforms");

var _commands = require("../constants/commands");

/**
 * @param platform  The process platform.
 * @returns         The copy command for the process platform.
 */
var getCopyCommand = function getCopyCommand() {
  var platform = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

  switch (platform.toLowerCase()) {
    case _platforms.SUPPORTED_PLATFORMS.DARWIN:
      return _commands.COPY.DARWIN;

    case _platforms.SUPPORTED_PLATFORMS.WIN32:
      return _commands.COPY.WIN32;

    case _platforms.SUPPORTED_PLATFORMS.LINUX:
    default:
      return _commands.COPY.LINUX;
  }
};

var _default = getCopyCommand;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJnZXRDb3B5Q29tbWFuZCIsInBsYXRmb3JtIiwidG9Mb3dlckNhc2UiLCJTVVBQT1JURURfUExBVEZPUk1TIiwiREFSV0lOIiwiQ09QWSIsIldJTjMyIiwiTElOVVgiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmluL3V0aWwvZ2V0Q29weUNvbW1hbmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU1VQUE9SVEVEX1BMQVRGT1JNUyB9IGZyb20gXCIuLi8uLi9jb25zdGFudHMvcGxhdGZvcm1zXCI7XG5pbXBvcnQgeyBDT1BZIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9jb21tYW5kc1wiO1xuXG4vKipcbiAqIEBwYXJhbSBwbGF0Zm9ybSAgVGhlIHByb2Nlc3MgcGxhdGZvcm0uXG4gKiBAcmV0dXJucyAgICAgICAgIFRoZSBjb3B5IGNvbW1hbmQgZm9yIHRoZSBwcm9jZXNzIHBsYXRmb3JtLlxuICovXG5jb25zdCBnZXRDb3B5Q29tbWFuZCA9IChwbGF0Zm9ybTogc3RyaW5nID0gXCJcIik6IHN0cmluZyA9PiB7XG4gIHN3aXRjaCAocGxhdGZvcm0udG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgU1VQUE9SVEVEX1BMQVRGT1JNUy5EQVJXSU46XG4gICAgICByZXR1cm4gQ09QWS5EQVJXSU47XG4gICAgY2FzZSBTVVBQT1JURURfUExBVEZPUk1TLldJTjMyOlxuICAgICAgcmV0dXJuIENPUFkuV0lOMzI7XG4gICAgY2FzZSBTVVBQT1JURURfUExBVEZPUk1TLkxJTlVYOlxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gQ09QWS5MSU5VWDtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2V0Q29weUNvbW1hbmQ7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQU1BLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsR0FBbUM7RUFBQSxJQUFsQ0MsUUFBa0MsdUVBQWYsRUFBZTs7RUFDeEQsUUFBUUEsUUFBUSxDQUFDQyxXQUFULEVBQVI7SUFDRSxLQUFLQyw4QkFBQSxDQUFvQkMsTUFBekI7TUFDRSxPQUFPQyxjQUFBLENBQUtELE1BQVo7O0lBQ0YsS0FBS0QsOEJBQUEsQ0FBb0JHLEtBQXpCO01BQ0UsT0FBT0QsY0FBQSxDQUFLQyxLQUFaOztJQUNGLEtBQUtILDhCQUFBLENBQW9CSSxLQUF6QjtJQUNBO01BQ0UsT0FBT0YsY0FBQSxDQUFLRSxLQUFaO0VBUEo7QUFTRCxDQVZEOztlQVllUCxjIn0=