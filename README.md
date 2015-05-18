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
  "author": INTEGER,
  "storyid": INTEGER,
  "storypath": STRING,
  "storyname": STRING,
  "genre": STRING,
  "eat": TOKEN
  }`
Returns:
`{ "success": TRUE/FALSE }`

#### GET -> 'api/skribbl/:id'
This will be the most useful endpoint returning the meat of the API.
Accepts: unique ID number for individual skribbl item.
Returns:
```
{
  {
    // BASIC SKRIBBLE OBJECT. 1ST IN RESPONSE IS PARENT OF ALL WITHIN FOLLOWING NESTED ARRAYS
    "id": 1, // This is the same ID as requested in API path
    "created_at": "time",
    "content": "It was the best of times, it was the worst of times.", // The text content of post
    "author": "1", // User ID
    "storyid": "1", // Pointer to
    "genre": "fantasy", // To be used later for filtering
    "storypath": "1/", // Path of all ancestors with '/' delimiter
    "storyname": "Tale of Two Cities", // Basically the title of the seed story carried through every descendant
    "parent": "null", // The immediate parent of this post, also the penultimate item in 'storypath'
    "eat": token
  },
  {
    {
      // SKRIBBL OBJECT
      "id": 2
    },
    {
      { // SKRIBBLE OBJECT "id": 5 },
      { // SKRIBBLE OBJECT "id": 6 },
      { // SKRIBBLE OBJECT "id": 7 }
    }
  },
  {
    {
      // SKRIBBL OBJECT
      "id": 3
    },
    {
      { // SKRIBBLE OBJECT "id": 8 },
      { // SKRIBBLE OBJECT "id": 9 },
      { // SKRIBBLE OBJECT "id": 10 }
    }
  },
  {
    {
      // SKRIBBL OBJECT
      "id": 4
    },
    {
      { // SKRIBBLE OBJECT "id": 11 },
      { // SKRIBBLE OBJECT "id": 12 },
      { // SKRIBBLE OBJECT "id": 13 }
    }
  },
}
```
