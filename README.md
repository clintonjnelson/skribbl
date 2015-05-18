#One Piece At A Time
An app where users add their part to growing stories.

**TO DO:**
- [x] Setup Github Repo
- [ ] Setup Basic App Skeleton of Backend
- [ ] Decide End Goal of App
- [ ] App Layout
  - [ ] Front End
    - [ ] Screen Layout
    - [ ] What Users Can Do - Scope
    - [ ] How Users Will Interact
  - [ ] Backend
    - [ ] What Routes Need To Be Available
    - [ ] DB Resources
      - [ ] Fields for Each Resource
      - [ ] Resource Structure
- [ ] App Communication
  - [ ] JSON FROM Frontend to Backend
  - [ ] JSON FROM Backend to Frontend

## Mock JSON
===================
Examples of expected input and output for API

### User Resource
#### POST -> '/api/user'
This endpoint will create a new user and return booleans upon success for each variable.
Accepts:
`{ "username": $username, "email": $email, "password": $password }`
Returns:
`{ "success": T/F, "username": T/F, "email": T/F, "password": T/F }`

#### GET -> '/api/login'
Will use basic http authorization to log user in and return an EAT. Authorization is not session based.
Accepts: Authorization header with Base64 encoded username & password.
On Success: `{ "success": TRUE, token: $token }`
On Fail: `{ "success": FALSE, token: null }`

### Skribbl Resource
#### POST -> 'api/skribbl/'
Creates a new skribbl post.
Accepts: field: [ data-type ]
`{
  "content": STRING,
  "author": OBJECT_ID,
  "story_id": INTEGER,
  "story_name": STRING,
  "parent_skribbl": STRING,
  "genre": STRING
  }`
Returns:
`{ "success": TRUE/FALSE }`

#### GET -> 'api/skribbl/:id'
This will be the most useful endpoint returning the meat of the API.
Accepts: unique ID number for individual skribbl item.
Returns:
```
{
  "id": 0,
  "created_at": "time",
  "content": "It was the best of times, it was the worst of times.",
  "author": "1",
  "story_id": "1",
  "genre": "fantasy",
  "story_path": "0/",
  "story_name": "Tale of Two Cities",
  "parent_skribbl": null,
  "children": [
    {
      "id": 1,
      ...
      "storypath": "0/1",
      "children": [
        {
          "id": 4,
          "story_path": "0/1/4"
          ...
          "children": null
        },
        {
          "id": 5,
          ...
        },
        {
          "id": 6,
          ...
        }
      ]
    },
    {
      "id": 2,
      "children": [
        {
          "id": 7,
          ...
        },
        {
          "id": 8,
          ...
        },
        {
          "id": 9,
          ...
        }
      ]
    },
    {
      "id": 3,
      "children": [
        {
          "id": 10,
          ...
        },
        {
          "id": 11,
          ...
        },
        {
          "id": 12,
          ...
        }
      ]
    }
  ]
}

```
