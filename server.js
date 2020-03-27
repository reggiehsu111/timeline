const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const { client_env } = require('./environment/environment.js');
// const {query, client} = require('./db/query_template');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');



// Create a new MongoClient
// const client = new MongoClient(client_env.url,{useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/ping', function (req, res) {
 query("00000000");
 return res.send('pong');
});

const options = {
    headers:{
        'Cache-Control' : 'no-cache'
    }
};
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'), options);
});

app.post('/form-submit-url', function (req, res) {
    MongoClient.connect(client_env.url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        const db = client.db(client_env.dbName);
        const col = db.collection(client_env.colName);
        var query = { "id": req.body.id };
        col.find(query).toArray().then(function(result) {
            console.log(result[0]);
            if(result[0]===undefined){
                res.send(null);
            }else{
                var dict = JSON.parse(JSON.stringify(result[0]));
                client.close();
                var time_info = get_time(dict);
                time_info.forEach(function (val, idx) {
                    console.log(idx, val);
                });
                var summary_part1 = get_summary1(dict);
                var summary_part2 = get_summary2(time_info);
                var summary_part3 = get_summary3(dict);
                console.log(summary_part1);
                console.log(summary_part2);
                console.log(summary_part3);
                const response = {
                    dict: dict,
                    time_info: time_info,
                    summary: {
                        summary_part1: summary_part1,
                        summary_part2: summary_part2,
                        summary_part3: summary_part3
                    }
                }
                res.send(response);
            }
        });
      });
});

app.listen(process.env.PORT || 8080);
// time_list: sorted array of time_obj
// time_obj: {"date": "YYYY-MM-DD", "event": [strings]}
function get_time(dict){
    var time_list = [];
    parse_information(time_list, dict);
    parse_health_condition(time_list, dict);
    parse_source(time_list, dict);
    parse_contactor(time_list, dict);
    time_list.sort(function(a, b){ 
        switch (a.date > b.date) {
            case true:
                return 1;
            default:
                return -1;
        }
    });
    return time_list;
}

function get_summary1(dict) {
    var id = dict.id;
    var gender = dict.information.gender;
    var nationality = dict.information.nationality;
    var occupation = dict.information.occupation;
    var pregnant = dict.information.pregnant_week;
    var married = dict.information.married;
    var chronic = dict.health_condition.chronic_disease;

    switch(gender) {
        case 'f':
            gender = "女性";
            break;
        case 'm':
            gender = "男性";
            break;
        default:
            gender = "";
            break;
    }

    if (pregnant > 0) {
        pregnant = `懷胎${pregnant}月`;
    } else {
        pregnant = "";
    }

    if (married) {
        married = "已婚";
    } else {
        married = "未婚";
    }

    var para = `案例${id}，${gender}，${nationality}籍，現職為${occupation}，${married}${pregnant}。`;

    if (chronic.length != 0) {
        para += `該案患有${chronic[0].name}`;
        for (idx = 1; idx < chronic.length; idx++) { 
            para += `、${chronic[idx].name}`;
        } 
        para += "。";
    }
    return para;
}

function get_summary2(time_list) {
    var para = "本案例近況如下所述：";
    for (idx = 0; idx < time_list.length; idx++) { 
        para += `${time_list[idx].date}，`;
        var event = time_list[idx].event;
        para += `${event[0]}`;
        for(j = 1; j< event.length; j++) {
            para += `、${event[j]}`;
        }
        para += '。';
    } 
    return para;
}

function get_summary3(dict) {
    var close_contact = dict.contactor.close_contactor;
    var para = ";"
    if (close_contact.length != 0) {
        para = "本案例近期接觸過：";
        for (idx = 0; idx < close_contact.length; idx++) {
            group = close_contact[idx];
            para += `${group.type}${group.number}名，其中${group.symptom_count}人有不適症狀、${group.fever_count}人發燒。`;
        }
    }
    return para;
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
    var source = dict.source;
    var nation_location = source.abroad.nation_and_location;
    var contact = source.contact;
    var time_obj;
    for (idx = 0; idx < nation_location.length; idx++) {
        var country = nation_location[idx];
        var event_string = "在" + country.name + country.type + "至" + country.end_time;
        time_obj = {"date": country.start_time, "event": [event_string]};
        check_and_insert(time_obj, time_list);
    } 
    if (contact.patient_time_start != "" && contact.patient_time_start != null) {
        var event_string = "在" + contact.patient_location + "接觸病患";
        time_obj = {"date": contact.patient_time_start, "event": [event_string]};
        check_and_insert(time_obj, time_list);
    }

}

function parse_contactor (time_list, dict) {
    var public_area = dict.contactor.public_area;
    for (idx = 0; idx < public_area.length; idx++) {
        var area = public_area[idx];
        var event_string = "經由" + area.transportation + "至" + area.city + area.location;
        var time_obj = {"date": area.time, "event": [event_string]};
        check_and_insert(time_obj, time_list);
    } 
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

