"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _child_process = require("child_process");

var _ = require(".");

/**
 * Copy text to the clipboard using a platform's native command.
 * @param  text  The text to copy.
 * @returns      A promise that resolves with the text to copy.
 */
var copyToClipboard = function copyToClipboard(text) {
  return new Promise(function (resolve, reject) {
    try {
      var platform = (0, _.getPlatform)();

      if ((0, _.isSupportedPlatform)(platform) === false) {
        throw new Error("Copy is not supported for ".concat(platform));
      }

      var command = "echo \"".concat(text, "\" | ").concat((0, _.getCopyCommand)(platform));
      (0, _child_process.exec)(command, function (error, stdout, stderr) {
        /* istanbul ignore if */
        if (error) {
          return reject(error);
        }

        if (stderr) {
          return reject(new Error(stderr));
        }

        return resolve(text);
      });
    } catch (error) {
      return reject(error);
    }
  });
};

var _default = copyToClipboard;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3B5VG9DbGlwYm9hcmQiLCJ0ZXh0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJwbGF0Zm9ybSIsImdldFBsYXRmb3JtIiwiaXNTdXBwb3J0ZWRQbGF0Zm9ybSIsIkVycm9yIiwiY29tbWFuZCIsImdldENvcHlDb21tYW5kIiwiZXhlYyIsImVycm9yIiwic3Rkb3V0Iiwic3RkZXJyIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2Jpbi91dGlsL2NvcHlUb0NsaXBib2FyZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleGVjIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCB7IGdldENvcHlDb21tYW5kLCBnZXRQbGF0Zm9ybSwgaXNTdXBwb3J0ZWRQbGF0Zm9ybSB9IGZyb20gXCIuXCI7XG5cbi8qKlxuICogQ29weSB0ZXh0IHRvIHRoZSBjbGlwYm9hcmQgdXNpbmcgYSBwbGF0Zm9ybSdzIG5hdGl2ZSBjb21tYW5kLlxuICogQHBhcmFtICB0ZXh0ICBUaGUgdGV4dCB0byBjb3B5LlxuICogQHJldHVybnMgICAgICBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSB0ZXh0IHRvIGNvcHkuXG4gKi9cbmNvbnN0IGNvcHlUb0NsaXBib2FyZCA9ICh0ZXh0OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgKHJlc29sdmU6ICh0ZXh0OiBzdHJpbmcpID0+IHZvaWQsIHJlamVjdDogKGVycm9yOiBFcnJvcikgPT4gdm9pZCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGxhdGZvcm0gPSBnZXRQbGF0Zm9ybSgpO1xuICAgICAgICBpZiAoaXNTdXBwb3J0ZWRQbGF0Zm9ybShwbGF0Zm9ybSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3B5IGlzIG5vdCBzdXBwb3J0ZWQgZm9yICR7cGxhdGZvcm19YCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29tbWFuZCA9IGBlY2hvIFwiJHt0ZXh0fVwiIHwgJHtnZXRDb3B5Q29tbWFuZChwbGF0Zm9ybSl9YDtcbiAgICAgICAgZXhlYyhjb21tYW5kLCAoZXJyb3IsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XG4gICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc3RkZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihzdGRlcnIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0ZXh0KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9yKTtcbiAgICAgIH1cbiAgICB9LFxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29weVRvQ2xpcGJvYXJkO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQU1BLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsQ0FBQ0MsSUFBRCxFQUFtQztFQUN6RCxPQUFPLElBQUlDLE9BQUosQ0FDTCxVQUFDQyxPQUFELEVBQWtDQyxNQUFsQyxFQUFxRTtJQUNuRSxJQUFJO01BQ0YsSUFBTUMsUUFBUSxHQUFHLElBQUFDLGFBQUEsR0FBakI7O01BQ0EsSUFBSSxJQUFBQyxxQkFBQSxFQUFvQkYsUUFBcEIsTUFBa0MsS0FBdEMsRUFBNkM7UUFDM0MsTUFBTSxJQUFJRyxLQUFKLHFDQUF1Q0gsUUFBdkMsRUFBTjtNQUNEOztNQUNELElBQU1JLE9BQU8sb0JBQVlSLElBQVosa0JBQXVCLElBQUFTLGdCQUFBLEVBQWVMLFFBQWYsQ0FBdkIsQ0FBYjtNQUNBLElBQUFNLG1CQUFBLEVBQUtGLE9BQUwsRUFBYyxVQUFDRyxLQUFELEVBQVFDLE1BQVIsRUFBZ0JDLE1BQWhCLEVBQTJCO1FBQ3ZDO1FBQ0EsSUFBSUYsS0FBSixFQUFXO1VBQ1QsT0FBT1IsTUFBTSxDQUFDUSxLQUFELENBQWI7UUFDRDs7UUFFRCxJQUFJRSxNQUFKLEVBQVk7VUFDVixPQUFPVixNQUFNLENBQUMsSUFBSUksS0FBSixDQUFVTSxNQUFWLENBQUQsQ0FBYjtRQUNEOztRQUVELE9BQU9YLE9BQU8sQ0FBQ0YsSUFBRCxDQUFkO01BQ0QsQ0FYRDtJQVlELENBbEJELENBa0JFLE9BQU9XLEtBQVAsRUFBYztNQUNkLE9BQU9SLE1BQU0sQ0FBQ1EsS0FBRCxDQUFiO0lBQ0Q7RUFDRixDQXZCSSxDQUFQO0FBeUJELENBMUJEOztlQTRCZVosZSJ9