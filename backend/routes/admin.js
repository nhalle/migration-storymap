const AdminBro = require('admin-bro');
const AdminBroExpress = require('admin-bro-expressjs');
const AdminBroMongoose = require('admin-bro-mongoose');
const express = require("express")
const adminRouter = express.Router();
const bcrypt = require("bcryptjs")

AdminBro.registerAdapter(AdminBroMongoose)

const Admin = require("../models/Admin");
const Story = require("../models/Region");
const Region = require("../models/Story");
//databases: [mongoose],
// const canModifyUsers = ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin'
const {
  after: passwordAfterHook,
  before: passwordBeforeHook,
} = require('../controllers/admin');

const adminBro = new AdminBro({
  resources: [{
    resource: Admin,
    options: {
      properties: {
        encryptedPassword: {
          isVisible: false,
        },
        password: {
          type: 'password',
          isVisible: {
            list:false, edit: true, filter: false, show: false,
          }
        }
      },
      actions: {
        new: {
          after: passwordAfterHook,
          before: passwordBeforeHook,
        },
        edit: {
          after: passwordAfterHook,
          before: passwordBeforeHook,
        },
      },
  }
},Region,Story],
  rootPath: '/admin',
  logoutPath: "/admin/logout",
  loginPath: "/admin/login",
  branding: {
    companyName: "Environmental Migration Lab",
    softwareBrothers: false
  },
  dashboard: {
    handler: async () => {},
    component: AdminBro.require("../views/index")
  }
})

const ADMIN = {
    email : 'admin@gmail.com',
    password: 'admin'
}

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


module.exports=router;


// console.log(request.payload)
//             let admin = await Admin.findOne({ email: request.payload.email })
//             if (admin) return console.log("admin already created");
//             if(request.payload.password) {
//               console.log(salt)
//               request.payload = {
//                 ...request.payload,
//                 encryptedPassword: await bcrypt.hash(request.payload.password, 10),
//                 password: undefined
//             }
//             console.log(request.password.encryptedPassword)
//             return request