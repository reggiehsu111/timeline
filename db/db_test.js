const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = "";
const dbName = "health-db";
const colName = "forms-demo";
// Create a new MongoClient
const client = new MongoClient(url,{useNewUrlParser: true, useUnifiedTopology: true});

// Use connect method to connect to the Server
client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    const col = db.collection(colName);
    var query = { "id": "00000000" };
    col.find(query).toArray().then(function(result) {
        var dict = JSON.parse(JSON.stringify(result[0]));
        client.close();
        var time_info = get_time(dict);
        console.log(time_info);
    });

  });


// time_list: sorted array of time_obj
// time_obj: {"date": "YYYY-MM-DD", "event": [strings]}
function get_time(dict){
    var time_list = [];
    parse_information(time_list, dict);
    parse_health_condition(time_list, dict);
    parse_source(time_list, dict);
    parse_contactor(time_list, dict);
    time_list.sort(function(a, b){return a.date > b.date;});
    return time_list;
}

function parse_information (time_list, dict) {
    var time_obj;
    var info = dict.information;
    time_obj = {"date": info.report_date, "event": ["通報"]};
    check_and_insert(time_obj, time_list);
    time_obj = {"date": info.onset, "event": ["確診"]};
    check_and_insert(time_obj, time_list);
    
}

function parse_health_condition (time_list, dict) {
    var h_cond = dict.health_condition;
    var symptom = h_cond.symptoms;
    var see_doc = h_cond.seeing_doctor;
    var time_obj;
    for (idx = 0; idx < symptom.length; idx++) { 
        time_obj = {"date": symptom[idx].date, "event": [symptom[idx].name]};
        check_and_insert(time_obj, time_list);
    } 
    for (idx = 0; idx < see_doc.length; idx++) { 
        var department;
        switch (see_doc[idx].type) {
            case 0:
                department = "門診";
                break;
            case 1:
                department = "急診";
                break;
            case 2:
                department = "住院";
                break;
            default:
                break;
        }
        time_obj = {"date": see_doc[idx].date, "event": [see_doc[idx].name+department]};
        check_and_insert(time_obj, time_list);
    } 
}

function parse_source (time_list, dict) {
    
}

function parse_contactor (time_list, dict) {
    
}

function check_and_insert(time_obj, time_list) {
    var prev_obj = time_list.find(function check_date(obj){
        return obj.date == time_obj.date;
    });
    if (prev_obj != undefined) {
        time_list[time_list.indexOf(prev_obj)].event.push(time_obj.event[0]);
    }
    else {
        time_list.push(time_obj);
    }
}

