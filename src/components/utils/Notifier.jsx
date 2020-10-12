import React from "react";

import { NotificationManager } from "react-notifications";

// NotificationManager.success(message, title, timeOut, callback, priority);
// The parameters that follow the notification type are described below:

// message: the message we want to pass. It has to be a string.
// title: The title of the notification. Again, its type is string.
// timeOut: The popup timeout in milliseconds. This has to be an interger.
// callback: We can pass a function (type; function) through the notification. It executes after the popup is called.
// priority: This is a boolean parameter. We can push any notification to the top at any point by setting the priority to true.

export const createNotification = (type) => {
  return () => {
    switch (type) {
      case "info":
        NotificationManager.info("Info message");
        break;
      case "success":
        NotificationManager.success("Success message", "Title here");
        break;
      case "warning":
        NotificationManager.warning(
          "Warning message",
          "Close after 3000ms",
          3000
        );
        break;
      case "error":
        NotificationManager.error("Error message", "Click me!", 5000, () => {
          alert("callback");
        });
        break;
      default:
        break;
    }
  };
};
