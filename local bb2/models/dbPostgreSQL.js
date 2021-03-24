const con = require("../config/postgreSQL/postgreSQL");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const fs = require("fs");
var path = require("path");
const { result } = require("lodash");
const { CONNREFUSED } = require("dns");
var privateKeyFolder = path.join(path.resolve("./") + "/key/bbcv.key");
var privateKey = fs.readFileSync(privateKeyFolder);
function model() {}
model.prototype = {
 
register: async function (entity, callback) {
  let now = new Date()
  let queryTextUC = `insert into user_account(user_name,user_password,phone_numbers,email,create_at,role_name ) values($1,$2,$3,$4,$5, $6) RETURNING user_id `
  let user_id = await (await con.query(queryTextUC, [entity.username, entity.password, entity.phone_numbers, entity.email, now, 'user'])).rows[0].user_id
  let querySetRole = `insert into user_role(user_id, role_id ) values ($1, $2 )`
  let setRole = await con.query(querySetRole, [user_id, entity.role])
  callback(user_id,entity.role)
},
registerAdmin: async function (entity, callback) {
  let now = new Date()
  let queryTextUC = `insert into user_account(user_name,user_password,phone_numbers,email,create_at,role_name ) values($1,$2,$3,$4,$5, $6) RETURNING user_id `
  let user_id = await (await con.query(queryTextUC, [entity.username, entity.password, entity.phonenumbers, entity.email, now, 'admin'])).rows[0].user_id
  let querySetRole = `insert into user_role(user_id, role_id ) values ($1, $2 )`
  let setRole = await con.query(querySetRole, [user_id, entity.role])
  callback(user_id,entity.role)
},
checkExistForRegister: async function (entity, callback) {
  const queryText = `select user_id from user_account where email = $1  `;
  let result = await con.query(queryText, [entity.email]);
  if (result.rowCount>0) {
    callback(null);
  } else callback(true);
},
  checkLogin: async function (entity, callback) {
      let checkExistUN;
      if (entity.email) {
      
      let queryGetUserName = `select email from user_account where email= $1`;
      checkExistUN = await con.query(queryGetUserName, [entity.email]);
      if (checkExistUN.rowCount == 0) {
        callback(null);
      } else {
        let queryGetPassWordHash = `select user_password from user_account where email= $1 `;
        let passwordHash = await (
          await con.query(queryGetPassWordHash, [entity.email])
        ).rows[0].user_password;
        let checkPassWord = bcrypt.compareSync(entity.password, passwordHash);
        //return true or false
        if (checkPassWord) {
          let queryGetUserID = `select user_id from user_account where email = $1 `;
          let user_id = await (
            await con.query(queryGetUserID, [entity.email])
          ).rows[0].user_id;
          let queryGetRole = `select role_id from user_role where user_id = $1`;
          /* let role = await (await con.query(queryGetRole, [user_id])).rows[0].role_id; */
          let role = await (await con.query(queryGetRole, [user_id])).rows[0].role_id
          console.log(role)
          callback(user_id, role);
        } else {
          callback(null);
        }
      }
    }
  },
  checkLoginUser: async function (entity, callback) {
      let checkExistUN;
      if (entity.email) {
      
      let queryGetUserName = `select email from user_account where email= $1`;
      checkExistUN = await con.query(queryGetUserName, [entity.email]);
      if (checkExistUN.rowCount == 0) {
        callback(null);
      } else {
        let queryGetPassWordHash = `select user_password from user_account where email= $1 `;
        let passwordHash = await (
          await con.query(queryGetPassWordHash, [entity.email])
        ).rows[0].user_password;
        let checkPassWord = bcrypt.compareSync(entity.password, passwordHash);
        //return true or false
        if (checkPassWord) {
          let queryGetUserID = `select user_id from user_account where email = $1 `;
          let user_id = await (
            await con.query(queryGetUserID, [entity.email])
          ).rows[0].user_id;
          let queryGetRole = `select role_id from user_role where user_id = $1`;
          /* let role = await (await con.query(queryGetRole, [user_id])).rows[0].role_id; */
          let role = await con.query(queryGetRole, [user_id])
          callback(user_id, role);
        } else {
          callback(null);
        }
      }
    }
  },
  resetPassword: async function (entity, callback) {},
  checkExistByUserName: async function (entity, callback) {
    const queryText = `select user_id from user_account where user_name= '${entity.username}' `;

    let result = await con.query(queryText);
    if (result.rowCount == 1) {
      callback(null);
    } else callback(true);
  },
  checkExistByEmail: async function (entity, callback) {
    let queryText = `select user_id from user_account where user_name= '${entity.email}' `;

    let result = await con.query(queryText);
    if (result.rowCount == 0) {
      callback(null);
    } else callback(true);
  },
  admin: async function (callback) {
      let queryCountMem = `SELECT COUNT(*) FROM user_account `
      let users = await (await con.query(queryCountMem)).rows[0].count
      let queryCountCV =`SELECT COUNT(*) FROM cv`
      let countCV = await (await con.query(queryCountCV)).rows[0].count
      let queryCountDownloaded = `SELECT COUNT(*) FROM downloaded`
      let countDownloaded = await (await con.query(queryCountDownloaded)).rows[0].count
      let querySelectUserTable = `select * from user_account`
      let userTable = await con.query(querySelectUserTable)
      callback(users,countCV,countDownloaded,userTable.rows)
    },
    createdCV: async function(entity,callback){
      let now = new Date()
      let queryCreateCv = ` insert into cv(location, skill, product, link_img, user_id, created_at) values( $1, $2, $3, $4, $5, $6 ) RETURNING cv_id`
      let cvID =  await (await con.query(queryCreateCv,[entity.location, entity.skill, entity.product, entity.link_img,  entity.user_id, now])).rows[0].cv_id
     
      let queryExperience = `insert into experience(cv_id, old_company, join_date, out_date, created_at) values($1, $2, $3, $4, $5)`
      await con.query(queryExperience,[cvID, entity.old_ompany, entity.join_date, entity.out_date, now])
      callback(entity,cvID)
    },

    getName: async function(entity,callback){
      let queryGetName = ` select user_name from user_account where user_id = $1`
      let result = await (await con.query(queryGetName, [entity.id])).rows[0].user_name
      callback(result)
    },
    getCv: async function(entity, callback){
      
    },
    showListAccount: async function (entity, callback) {

      },
    download: async function(entity,callback){
      let queryDownLoaded = `insert into downloaded(user_id, cv_id, created_at) values( $1, $2, $3)`
      await con.query(queryDownLoaded, [entity.user_id, cvID, now])
    },
    delete : async function(id,callback){
      let queryCheckIdCv = `select cv_id from cv where cv_id = $1`
      let isExist = await (await con.query(queryCheckIdCv, [id] )).rowCount
      if(isExist){
         let queryDeleteById = ` delete from cv where cv_id = $1`
         await con.query(queryDeleteById, [id])
         callback(true)
      }else(
        callback(null)
      )
    },
    checkByDay: async function (entity,callback) {  
      let queryGetDate = `SELECT CURRENT_DATE`
      let date = await (await con.query(queryGetDate)).rows[0]
      let queryCheckByDay = `select * from cv where create_at = $1`;
      let result = await con.query(queryCheckByDay, [entity])
      console.log(result)
    }
};
module.exports = model;
