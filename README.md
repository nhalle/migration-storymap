

# Migration-storymap

Migration-storymap is a web mapping application for visual story telling, created in the MERN stack.


## Installation

#### Step 1: Create a mongoDB collection
Install MongoDB to your server and create a collection, you can also create a MongoDB instance in the cloud at https://www.mongodb.com/cloud/atlas if you're cloning this locally.

#### Step 2: Clone
Clone the migration-storymap repository

#### Step 3: Install dependencies

Install dependencies for the backend:

``` shell
$ cd migration-storymap
$ npm install

```

Next install dependencies in the client directory:

``` shell
$ cd client
$ npm install
```

See dependencies section for more

#### Step 4: Connect database

Open migration-storymap/backend/models/db.js and initalize your db url:

``` JavaScript
//Initalize DB and models
const dbURI = INSERT_MONGO_DB_COLLECTION_URL; // Change this to whatever your DB url is
```

#### Step 5: Disable login to admin portal (temporarily)

In order to access the admin portal for the first time you'll have to disable the login.


In migration-storymap/backend/routes/admin.js you will see:

``` JavaScript
// Authenticator for AdminBro
const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: 'admin-bro',
  cookiePassword: 'admin-bro',
  authenticate: async (email, password) => {
    const admin = await Admin.findOne({ email })

    if (admin) {
      const matched = await bcrypt.compare(password, admin.encryptedPassword)
      if (matched) {
        return admin
      }
    }
    return false
    }
  },
  adminRouter,
  {
    resave: true,
    saveUninitialized: true
})
```

Override the authentication by returning true everytime:

``` JavaScript
// Authenticator for AdminBro
const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: 'admin-bro',
  cookiePassword: 'admin-bro',
  authenticate: async (email, password) => {
    const admin = await Admin.findOne({ email })

    if (admin) {
      const matched = await bcrypt.compare(password, admin.encryptedPassword)
      if (matched) {
        return admin
      }
    }
    return true // Now you will be able to login everytime
    }
  },
  adminRouter,
  {
    resave: true,
    saveUninitialized: true
})
```

Note: Change this back after you've created a new administrator in the pannel!

## Runtime

In the envmig root directory run:

``` shell
$ npm run dev
```

To just run the Admin portal run:

``` shell
$ npm run server
```

 

## Dependencies

#### Backend
The backend of this application resides in the envmig directory and runs on port 3001.


| Dependency      | Description | Documentation     |
| :---        |    :----:   |          ---: |
| Bcryptjs      | Used for Admin portal registration and login       | https://www.npmjs.com/package/bcryptjs   |
| Express   | backend API       | https://www.npmjs.com/package/express     |
| Admin Bro   | Admin portal generator      | https://www.npmjs.com/package/admin-bro     |
| Mongoose   | MongoDB object modeling tool designed to work in an asynchronous environment    | https://mongoosejs.com/|
| Concurrently   | runs node instance of backend and frontend at the same time (see package.json)   | https://www.npmjs.com/package/concurrently| 
| Nodaemon   | Daemonizes the node instance   |https://www.npmjs.com/package/nodaemon|

See migration-storymap/package.json for more backend dependencies

#### Frontend

The frontend of this application is in the  envmig/client directory and runs on port 3000.

The frontend was built upon Facebook's create react app: https://github.com/facebook/create-react-app, which is a boilerplate for creating react applications.   

Main dependencies:

| Dependency      | Description | Documentation     |
| :---        |    :----:   |          ---: |
| React      |  Javascript languange for building user interfaces      | https://reactjs.org/   |
| Axios   | HTTP Client      | https://github.com/axios/axios    |
| Redux | State manager for React| https://redux.js.org/api/api-reference|
| Leaflet.js | Leaflet is an opensource mapping client for create interactive maps and is used in envmig/client/scr/components/map/map.js| https://leafletjs.com/reference-1.6.0.html |
| Redux Thunk | Redux middleware for asynchronous data flow| https://github.com/reduxjs/redux-thunk |

See migration-storymap/client/package.json for more frontend dependencies

## Task Lisk

- [x] Create client
- [x] Integrate Leaflet.js 
- [x] Create database models
- [x] Create Express API
- [x] Integrate Redux into client
- [x] Connect Redux to Express API
- [x] Integrate AdminBro to create admin pannel
- [x] Add sound and image components to client

Future updates:
- [ ] Create a page to display region information
- [ ] Fix story CSS
- [ ] Fix popup CSS
- [ ] Fix rendering logic for map
- [ ] Scale images into backend
- [ ] Integrate GIS into map
- [ ] Upgrade Admin security

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)