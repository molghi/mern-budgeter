const signUp = require("./userFunctions/signUp");

const logIn = require("./userFunctions/logIn");

const logOut = require("./userFunctions/logOut");

const updateCurrentBalance = require("./userFunctions/updateCurrentBalance");

const fetchCurrentBalance = require("./userFunctions/fetchCurrentBalance");

const changeUsername = require("./userFunctions/changeUsername");

const getUsername = require("./userFunctions/getUsername");

module.exports = { signUp, logIn, logOut, updateCurrentBalance, fetchCurrentBalance, changeUsername, getUsername };
