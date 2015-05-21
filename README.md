
#One Piece At A Time  [![Build Status](https://travis-ci.org/clintonjnelson/skribbl.svg?branch=master)](https://travis-ci.org/clintonjnelson/skribbl)
An app where users add their part to growing stories.
**TO DO:**
[![Build Status](https://travis-ci.org/clintonjnelson/skribbl.svg?branch=master)](https://travis-ci.org/clintonjnelson/skribbl)
- [x] Setup Github Repo
- [x] Setup Basic App Skeleton of Backend
- [x] Decide End Goal of App
- [ ] App Layout
  - [ ] Front End
    - [ ] Screen Layout
    - [ ] What Users Can Do - Scope
    - [ ] How Users Will Interact
  - [x] Backend
    - [x] What Routes Need To Be Available
    - [ ] DB Resources
      - [ ] Fields for Each Resource
      - [ ] Resource Structure
- [ ] App Communication
  - [ ] JSON FROM Frontend to Backend
  - [ ] JSON FROM Backend to Frontend

## Mock JSON
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
On Success: `{ "success": true, token: $token }`   *(status: 500)*
On Fail: `{}`

### Skribbl Resource
#### POST -> 'api/skribbl/'
Creates a new skribbl post.
Accepts: field: [ data-type ]
`{
  "content": STRING,
  "author": STRING,
  "story_id": OBJECT_ID,
  "story_name": STRING,
  "parent_skribbl": STRING,
  "genre": STRING
  }`
Returns:
`{ "success": true/false }`

#### GET -> 'api/skribbl/:id'
This will be the most useful endpoint returning the meat of the API.
Accepts: unique ID number for individual skribbl item.
On Failure Returns: `[]`  *(status: 500)*
On Success Returns:
```
{
  "id": 0,
  "created_at": "time",
  "content": "It was the best of times, it was the worst of times.",
  "author": "1",
  "story_id": "1",
  "genre": "fantasy",
  "story_name": "Tale of Two Cities",
  "parent_skribbl": null,
  "children": [
    {
      "id": 1,
      ...
      "children": [
        {
          "id": 4,
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

### Timeline Resources
#### GET->'/api/timeline/:username'
A view of all posts created by a certain user.
Returns: An array of singular skribbl objects.

### Story
```
[ { _id: '555cf2291d0df88cd17430ae',
    content: 'Calabunga icky sickly pinky raddical dippy sickly tuff trippy. Calabunga ritious magical sickly calabunga pinky dippy. Goat ritious gnar holy metal. Icky tuff epic turnt goat magical apple raddical apple.',
    created_at: '2015-05-20T20:44:25.121Z',
    story_name: 'dank tight',
    genre: 'silly',
    author: 'IamAuser',
    parent_skribbl: null,
    __v: 0 },
  { _id: '555cf2291d0df88cd17430af',
    content: 'Magical ritious turnt tuff dippy. Epic goat epic pinky turnt epic trippy tuff turnt. Throad metal apple ritious holy ritious sickly dank epic gnar throad turnt pinky epic. Trippy apple dank slimy trippy splicky apple goat icky epic goat goat.',
    created_at: '2015-05-20T20:44:25.401Z',
    story_name: 'apple dank',
    genre: 'silly',
    author: 'IamAuser',
    parent_skribbl: null,
    __v: 0 },
  { _id: '555cf2291d0df88cd17430b0',
    content: 'Turnt slimy throad apple sickly holy calabunga turnt pinky raddical epic slimy. Epic magical raddical metal tight tight calabunga splicky turnt. Wild goat ritious tight pinky turnt icky. Tight dank dank turnt calabunga gnar splicky throad magical turnt gnar holy.',
    created_at: '2015-05-20T20:44:25.403Z',
    story_name: 'holy icky',
    genre: 'silly',
    author: 'IamAuser',
    parent_skribbl: null,
    __v: 0 },
  { _id: '555cf2291d0df88cd17430b1',
    content: 'Tight metal tuff wild epic slimy epic tuff dippy. Tuff pinky calabunga magical turnt. Gnar tight icky turnt goat trippy apple magical calabunga throad. Tight goat throad turnt magical sickly metal icky ritious tuff goat dippy tight gnar magical.',
    created_at: '2015-05-20T20:44:25.404Z',
    story_name: 'throad metal',
    genre: 'silly',
    author: 'IamAuser',
    parent_skribbl: null,
    __v: 0 },
  { _id: '555cf2291d0df88cd17430b2',
    content: 'Tight wild wild sickly holy dank metal ritious. Magical splicky pinky raddical metal icky apple holy wild pinky dippy. Holy wild holy dippy slimy slimy ritious. Icky metal ritious sickly dank throad gnar splicky slimy pinky.',
    created_at: '2015-05-20T20:44:25.405Z',
    story_name: 'epic trippy',
    genre: 'silly',
    author: 'IamAuser',
    parent_skribbl: null,
    __v: 0 },
  { _id: '555cf2291d0df88cd17430b3',
    content: 'Tight epic sickly trippy pinky calabunga tuff calabunga goat icky throad icky. Trippy sickly tuff slimy icky throad. Magical metal slimy wild magical dank tuff calabunga raddical. Throad raddical gnar ritious icky pinky icky holy tight gnar metal ritious tight.',
    created_at: '2015-05-20T20:44:25.406Z',
    story_name: 'epic trippy',
    genre: 'silly',
    author: 'IamAuser',
    parent_skribbl: '555cf2291d0df88cd17430ae',
    __v: 0 },
  { _id: '555cf2291d0df88cd17430b4',
    content: 'Pinky sickly ritious wild magical raddical magical apple turnt. Epic icky wild gnar throad. Dippy gnar calabunga dippy calabunga magical splicky holy throad ritious gnar metal tight. Gnar wild raddical icky sickly magical ritious splicky icky tight trippy.',
    created_at: '2015-05-20T20:44:25.407Z',
    story_name: 'epic trippy',
    genre: 'silly',
    author: 'IamAuser',
    parent_skribbl: '555cf2291d0df88cd17430ae',
    __v: 0 },
  { _id: '555cf2291d0df88cd17430b5',
    content: 'Trippy trippy calabunga calabunga sickly apple magical throad sickly. Dippy ritious throad tight splicky tight turnt wild throad wild calabunga trippy slimy. Dank turnt sickly ritious metal sickly icky ritious wild splicky metal wild. Throad calabunga dank dippy dippy turnt ritious raddical metal metal holy epic tuff epic dippy.',
    created_at: '2015-05-20T20:44:25.408Z',
    story_name: 'epic trippy',
    genre: 'silly',
    author: 'IamAuser',
    parent_skribbl: '555cf2291d0df88cd17430ae',
    __v: 0 },
  { _id: '555cf2291d0df88cd17430b6',
    content: 'Metal throad epic splicky gnar calabunga throad throad raddical gnar splicky. Trippy apple turnt trippy gnar epic turnt raddical wild ritious wild calabunga slimy. Pinky epic trippy dank icky holy splicky wild slimy trippy splicky apple sickly. Pinky dippy dank wild splicky calabunga sickly apple turnt holy goat.',
    created_at: '2015-05-20T20:44:25.409Z',
    story_name: 'epic trippy',
    genre: 'silly',
    author: 'IamAuser',
    parent_skribbl: '555cf2291d0df88cd17430ae',
    __v: 0 },
  { _id: '555cf2291d0df88cd17430b7',
    content: 'Sickly tuff calabunga ritious metal metal. Turnt dippy tuff pinky magical pinky trippy dippy raddical tight wild magical. Epic calabunga throad trippy pinky raddical raddical trippy. Dippy apple calabunga slimy dank.',
    created_at: '2015-05-20T20:44:25.410Z',
    story_name: 'epic trippy',
    genre: 'silly',
    author: 'IamAuser',
    parent_skribbl: '555cf2291d0df88cd17430ae',
    __v: 0 },
  { _id: '555cf2291d0df88cd17430b8',
    content: 'Magical gnar throad calabunga epic holy raddical magical tuff metal ritious magical trippy. Pinky dank apple icky throad metal throad metal splicky magical. Icky splicky tight raddical dippy raddical icky metal metal. Sickly magical gnar raddical calabunga wild.',
    created_at: '2015-05-20T20:44:25.411Z',
    story_name: 'epic trippy',
    genre: 'silly',
    author: 'IamAuser',
    parent_skribbl: '555cf2291d0df88cd17430ae',
    __v: 0 },
  { _id: '555cf2291d0df88cd17430b9',
    content: 'Tuff trippy calabunga raddical dank holy ritious magical dippy holy magical splicky ritious pinky. Holy raddical turnt raddical goat trippy goat throad trippy trippy wild throad epic. Calabunga epic dank apple slimy raddical. Goat calabunga slimy dippy apple wild metal turnt icky tight magical raddical pinky dippy icky.',
    created_at: '2015-05-20T20:44:25.414Z',
    story_name: 'epic trippy',
    genre: 'silly',
    author: 'IamAuser',
    parent_skribbl: '555cf2291d0df88cd17430ae',
    __v: 0 },
  { _id: '555cf2291d0df88cd17430ba',
    content: 'Apple magical raddical gnar splicky dippy apple tuff tight wild gnar pinky holy. Tight pinky dippy magical dank pinky apple apple trippy raddical turnt pinky icky splicky turnt. Trippy raddical dippy magical wild epic dippy sickly goat pinky dippy. Splicky epic pinky pinky epic splicky raddical slimy dank turnt splicky.',
    created_at: '2015-05-20T20:44:25.415Z',
    story_name: 'epic trippy',
    genre: 'silly',
    author: 'IamAuser',
    parent_skribbl: '555cf2291d0df88cd17430ae',
    __v: 0 },
  { _id: '555cf2291d0df88cd17430bb',
    content: 'Magical ritious sickly ritious ritious magical tight metal. Icky dank magical calabunga pinky goat metal. Epic holy epic holy raddical apple dank ritious magical magical tight apple dippy. Trippy dank icky gnar dank turnt slimy turnt sickly turnt tuff dippy holy raddical.',
    created_at: '2015-05-20T20:44:25.415Z',
    story_name: 'epic trippy',
    genre: 'silly',
    author: 'IamAuser',
    parent_skribbl: '555cf2291d0df88cd17430ae',
    __v: 0 },
  { _id: '555cf2291d0df88cd17430bc',
    content: 'Tuff metal throad sickly apple ritious dippy gnar dippy sickly. Epic calabunga gnar calabunga goat slimy dank magical icky turnt goat gnar raddical splicky. Slimy epic calabunga goat calabunga wild ritious. Holy goat metal ritious magical holy dippy splicky slimy dank goat pinky trippy dippy.',
    created_at: '2015-05-20T20:44:25.416Z',
    story_name: 'epic trippy',
    genre: 'silly',
    author: 'IamAuser',
    parent_skribbl: '555cf2291d0df88cd17430ae',
    __v: 0 },
  { _id: '555cf2291d0df88cd17430bd',
    content: 'Holy magical splicky pinky apple magical gnar tight turnt holy apple slimy. Dank pinky dank goat slimy slimy turnt dank gnar. Tuff metal dippy calabunga turnt slimy throad pinky icky sickly apple calabunga trippy ritious sickly. Pinky slimy pinky epic sickly wild dippy magical splicky raddical.',
    created_at: '2015-05-20T20:44:25.417Z',
    story_name: 'epic trippy',
    genre: 'silly',
    author: 'IamAuser',
    parent_skribbl: '555cf2291d0df88cd17430ae',
    __v: 0 },
  { _id: '555cf2291d0df88cd17430be',
    content: 'Trippy pinky magical metal pinky magical wild ritious throad dippy ritious calabunga tuff. Apple holy apple raddical trippy icky tight tuff turnt sickly throad throad tight holy gnar. Calabunga splicky ritious turnt magical turnt slimy splicky pinky pinky raddical dank ritious tight. Slimy gnar metal pinky tight dank pinky.',
    created_at: '2015-05-20T20:44:25.420Z',
    story_name: 'epic trippy',
    genre: 'silly',
    author: 'IamAuser',
    parent_skribbl: '555cf2291d0df88cd17430ae',
    __v: 0 },
  { _id: '555cf2291d0df88cd17430bf',
    content: 'Pinky gnar throad turnt raddical. Gnar pinky wild holy metal metal throad raddical pinky holy holy raddical tuff epic dank. Gnar calabunga pinky throad throad metal metal epic dank magical wild epic wild calabunga. Holy splicky dank gnar ritious goat gnar.',
    created_at: '2015-05-20T20:44:25.422Z',
    story_name: 'epic trippy',
    genre: 'silly',
    author: 'IamAuser',
    parent_skribbl: '555cf2291d0df88cd17430ae',
    __v: 0 },
  { _id: '555cf2291d0df88cd17430c0',
    content: 'Turnt apple calabunga dank goat epic dank tight magical. Icky tuff tight splicky splicky holy tuff apple sickly magical wild calabunga. Splicky tight magical epic throad turnt epic tight tuff sickly dippy apple sickly. Calabunga ritious raddical throad apple icky sickly calabunga throad tight raddical.',
    created_at: '2015-05-20T20:44:25.423Z',
    story_name: 'epic trippy',
    genre: 'silly',
    author: 'IamAuser',
    parent_skribbl: '555cf2291d0df88cd17430ae',
    __v: 0 },
  { _id: '555cf2291d0df88cd17430c1',
    content: 'Wild magical metal holy trippy epic ritious ritious tight gnar trippy splicky tight gnar wild. Slimy icky tight sickly raddical turnt throad calabunga pinky pinky magical holy metal gnar metal. Metal tuff gnar wild tight goat raddical trippy slimy slimy trippy slimy tuff gnar. Slimy tuff gnar calabunga holy goat magical.',
    created_at: '2015-05-20T20:44:25.425Z',
    story_name: 'epic trippy',
    genre: 'silly',
    author: 'IamAuser',
    parent_skribbl: '555cf2291d0df88cd17430ae',
    __v: 0 } ]

```
