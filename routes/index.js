var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bikestore'
});
connection.connect();


router.get('/login', function (req, res, next) {
    console.log(req.query);
    var userName = req.query.username ? req.query.username : "notSpecified";
    var userPassword = req.query.password ? req.query.password : "notSpecified";
    console.log(userName);
    console.log(userPassword);
    if (userName == "notSpecified" || userPassword == "notSpecified") {
        var response = {"response": "false", "error": "Invalid Username or Password"};
        res.json(response);
    }
    var query = "Select * from user where email_id= ?";
    connection.query(query, [userName], function (error, data) {
        console.log(data);
        if (error) {
            var response = {"response": false, "error": "server down"};
            res.json(response);
            return false;
        }
        if (data == "") {
            var response = {"response": "false", "error": "Invalid User"};
            res.json(response);
            return false;
        }
        var userPasswordFromDB = data[0].password;
        if (userPassword != userPasswordFromDB) {
            res.json({"data": data, "userEnteredPassword": userPassword, "userEnteredName": userName});
            return false;
        }
        var response = {"response": "true",
            "res": "user connected",
            "data": {"name": data[0].name,
                "email_id": data[0].email_id,
                "id": data[0].id,
                "mobile_no": data[0].mobile_no}};
        res.json(response);
        return true;
    });

});

router.get('/store', function (req, res, next) {

    var query = "SELECT * FROM store";

    connection.query(query, function (error, data) {
        if (error) {
            var response = {"response": false, "error": "server down"};
            res.json(response);
            return false;
        }
        console.log(data);
        var response = {"response": "true", "data": data};
        res.json(response);
    });

});

router.get('/bike', function (req, res, next) {
    if (!req.query.id) {
        res.json({"response": false, "error": "no store id"});
        return false;
    }
    var query = "SELECT * FROM bike WHERE status != 'booked' AND store_id_fk=?";
    var storeId = req.query.id ? req.query.id : 0;
    connection.query(query, [storeId], function (error, data) {
        if (error) {
            var response = {"response": false, "error": "server down"};
            res.json(response);
            return false;
        }
        console.log(data);
        var response = {"response": "true", "data": data};
        res.json(response);
    });

});


router.get('/order', function (req, res, next) {
    if (!req.query.bike_id || !req.query.user_id) {
        res.json({"response": false, "error": "no User Id or no Bike Id"});
        return false;
    }
    var query = "SELECT * FROM orders WHERE bike_id_fk=? AND status = 'booked' ";
    var bikeId = req.query.bike_id ? req.query.bike_id : 0;
    var userId = req.query.user_id ? req.query.user_id : 0;
    var noOfHours = req.query.no_of_hours ? req.query.no_of_hours : 0;
    var startTime = req.query.start_time ? req.query.start_time :0;
    var endTime = req.query.end_time ? req.query.end_time :0; 
    connection.query(query, [bikeId], function (error, data) {
        if (error) {
            var response = {"response": false, "error": "server down"};
            res.json(response);
            return false;
        }
        console.log(data);
        if (data == "") {
            var query = "UPDATE  `bikestore`.`bike` SET  `status` =  'booked' WHERE  `bike`.`id` =?";
            connection.query(query, [bikeId], function (error, data) {
                if (error) {
                    var response = {"response": false, "error": "server down"};
                    res.json(response);
                    return false;
                }
            });
            console.log(1);
            query = "INSERT INTO orders ( bike_id_fk, start_time_date,"
                    + "end_time_date, no_of_kms, fare, status, user_id_fk) VALUES "
                    + "('" + bikeId + "','"+startTime+"','" + endTime + "','0','0','booked','" + userId + "')";
            console.log(query);
            //connection.query(query, [bikeId], [noOfHours], [noOfHours], [userId], function (error, data) {
            connection.query(query, function (error, data) {
                if (error) {
                    console.log("error: "+error);
                    var response = {"response": "false", "error": error};
                    res.json(response);
                    return false;
                }
                console.log(data);
                var response = {"response": "true", "data": {"order_id":data.insertId}};
                res.json(response);
                return true;
            });
        }
        else {
            var response = {"response": "false", "error": "Already Booked"};
            res.json(response);
            return false;
        }
    });
});

router.get('/previousorders', function (req, res, next) {
    if (!req.query.user_id) {
        res.json({"response": false, "error": "no user id"});
        return false;
    }
    var query = "SELECT orders.* , bike.name , bike.km_cost , bike.hour_cost_week_day , bike.hour_cost_week_end , bike.bike_image_id , bike.id AS bikeid FROM orders LEFT JOIN bike ON orders.bike_id_fk = bike.id WHERE orders.user_id_fk = ? ORDER BY id DESC";
    console.log(query);
    var userId = req.query.user_id ? req.query.user_id : 0;
    connection.query(query, [userId], function (error, data) {
        if (error) {
            console.log(error);
            var response = {"response": false, "error": "server down"};
            res.json(response);
            return false;
        }
        console.log(data);
        var response = {"response": "true", "data": data};
        res.json(response);
    });

});




//connection.end();
module.exports = router;
