# ![Progress](./publicAssets/ProgressBanner.png)

# API Information and Documentation 📃

## Table of Contents

- [HTTP Request Methods](#http-request-methods)
- [HTTP Response Status Codes](#http-response-status-codes)
- [Our API](#our-api)
  - [API Status Codes](#api-status-codes)
  - [Endpoint List](#endpoint-list)
  - [Endpoint Details](#endpoint-details)

### HTTP Request methods

| Method   | Description                                                              |
| -------- | ------------------------------------------------------------------------ |
| `GET`    | Used to retrieve a single item or a collection of items.                 |
| `POST`   | Used when creating new items e.g. a new user, post, comment, etc.        |
| `PATCH`  | Used to update one or more fields on an item e.g. update e-mail of user. |
| `PUT`    | Used to replace a whole item (all fields) with new data.                 |
| `DELETE` | Used to delete an item.                                                  |

### HTTP Response Status Codes

| Code  | Title                   | Description                                                                                                                                                       |
| ----- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `200` | `OK`                    | When a request was successfully processed (e.g. when using `GET`, `PATCH`, `PUT` or `DELETE`).                                                                    |
| `201` | `Created`               | Every time a record has been added to the database (e.g. when creating a new user or post).                                                                       |
| `304` | `Not modified`          | When returning a cached response.                                                                                                                                 |
| `400` | `Bad request`           | When the request could not be understood (e.g. invalid syntax).                                                                                                   |
| `401` | `Unauthorized`          | When authentication failed.                                                                                                                                       |
| `403` | `Forbidden`             | When an authenticated user is trying to perform an action, which he/she does not have permission to.                                                              |
| `404` | `Not found`             | When URL or entity is not found.                                                                                                                                  |
| `440` | `No accept header`      | When the required "Accept" header is missing from the request.                                                                                                    |
| `422` | `Unprocessable entity`  | Whenever there is something wrong with the request (e.g. missing parameters, validation errors) even though the syntax is correct (i.e., `400` is not warranted). |
| `500` | `Internal server error` | When an internal error has happened (e.g. when trying to add/update records in the database fails).                                                               |
| `502` | `Bad Gateway`           | When a necessary third-party service is down.                                                                                                                     |

# Our API

## API Status Codes

- ![Working](https://img.shields.io/badge/Status-Working-success): The endpoint is currently working.
- ![Not Working](https://img.shields.io/badge/Status-Not%20Working-red): The endpoint is experiencing issues or is not available.
- ![Under Maintenance](https://img.shields.io/badge/Status-Under%20Maintenance-yellow): The endpoint is currently under maintenance.
- ![Testing](https://img.shields.io/badge/Status-Testing-blue): The endpoint is in testing and may not be stable.
- ![Experimental](https://img.shields.io/badge/Status-Experimental-lightblue): The endpoint is in an experimental phase and subject to change.

## Endpoint List

| Method | URL          | Description         | Status                                                          | Navigation                  |
| ------ | ------------ | ------------------- | --------------------------------------------------------------- | --------------------------- |
| `GET`  | `/api/posts` | Retrieve all posts. | ![Working](https://img.shields.io/badge/Status-Working-success) | [Get me there!](#retrieve-all-posts) |

## Endpoint Details

- #### Retrieve All Posts

  - **Method:** `GET`
  - **URL:** `/api/posts`
  - **Description:** Retrieve all posts.

  #### Response

  ```json
  {
    "id": 123,
    "title": "Sample Post",
    "content": "This is the content of the post.",
    "author": {
      "id": 456,
      "name": "John Doe"
    },
    "created_at": "2023-01-01T12:34:56Z",
    "updated_at": "2023-01-02T08:45:12Z"
  }
  ```