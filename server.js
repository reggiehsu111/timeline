const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const { client_env } = require('./environment/environment.js');
// const {query, client} = require('./db/query_template');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { transform } = require("./db/Transform");



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
        var search_type = req.body.search_type;
        var search_value = req.body.search_value;
        var query = {};
        if (search_type === "id") {
            query[search_type] = search_value;
            col.find(query).toArray().then(function(result) {
                if(result[0]===undefined){
                    res.send(null);
                }else{
                    var dict = JSON.parse(JSON.stringify(result[0]));
                    client.close();
                    var [time_info, sick_history_info, activity_info] = get_time(dict);
                    // time_info.forEach(function (val, idx) {
                    //     console.log(idx, val);
                    // });
                    var summary_part1 = get_summary1(dict);
                    var summary_part2 = {   
                                            sick_history_info: sick_history_info, 
                                            activity_info: activity_info
                                        };
                    var summary_part3 = get_summary3(dict);
                    // console.log(summary_part1);
                    // console.log(summary_part2);
                    // console.log(summary_part3);
                    var chinese_dict = to_chinese(dict);
                    console.log(chinese_dict);
                    const response = {
                        dict: chinese_dict,
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
        }
        else {
            var key = `information.${search_type}`;
            query[key] = search_value;
            col.find(query).project({ "id": 1, "information.name": 1, "_id": 0 }).toArray().then(function(result) {
                // all key-value in information can be queried.
                // e.g. search_type = "gender", search_type = "address_city" ...
                // result.length is how many objects fit the query.
                // result[x].id = "00000000"
                // result[x].information.name = "name"
                // if db doesn't contain any object fits the query, result = []
                const response = {
                    id_names: result,
                }
                res.send(response);
            });
        }
      });
});

app.listen(process.env.PORT || 8080);
// time_list: sorted array of time_obj
// time_obj: {"date": "YYYY-MM-DD", "event": [strings]}
function get_time(dict){
    var sick_history_list = [];
    var activity_list = [];
    parse_information(sick_history_list, dict);
    parse_health_condition(sick_history_list, dict);
    parse_source(activity_list, dict);
    parse_contactor(activity_list, dict);
    sick_history_list.sort(function(a, b){ 
        return list_compare(a,b);
    });
    activity_list.sort(function(a,b){
        return list_compare(a,b);
    });
    var time_list = [];
    for (var i = 0; i < sick_history_list.length; i++) {
        check_and_insert(sick_history_list[i], time_list);
    }
    for (var i = 0; i < activity_list.length; i++) {
        check_and_insert(activity_list[i], time_list);
    }
    time_list.sort(function(a,b){
        return list_compare(a,b);
    });
    return [time_list, sick_history_list, activity_list];
}

function to_chinese(dict) {

    var chines_dict = {
        "id": dict.id, 
        "information": {}, 
        "health_condition": {"症狀紀錄": [], "發病期間就醫紀錄": [], "慢性疾病紀錄": []}, 
        "source": {"出國史": [], "接觸發燒或呼吸道人士": [], "接觸武漢肺炎可能或確診病例": [], "接觸武漢肺炎可能或確診病例分泌物": []}, 
        "contactor": {"發病起至隔離前是否曾至國內公眾場所或搭乘大眾運輸工具": [], "近距離接觸者": []}};
    var tmp;
    
    for (var key in dict.information) {
        chines_dict.information[transform.information[key]] = dict.information[key];
    }
    tmp = {"symptoms": "症狀紀錄", "seeing_doctor": "發病期間就醫紀錄"}
    for(var key in dict.health_condition) {
        if (key === "chronic_disease") {
            chines_dict.health_condition["慢性疾病紀錄"] = dict.health_condition[key];
        } else {
            for(var i = 0; i < dict.health_condition[key].length; i++) {
                var origin_obj = dict.health_condition[key][i];
                var trans_obj = {};
                for(var obj_key in origin_obj) {
                    trans_obj[transform["health_condition"][key][obj_key]] = origin_obj[obj_key];
                }
                chines_dict.health_condition[tmp[key]].push(trans_obj);
            }
        }
    }
    tmp = {"nation_and_location": "出國史", "contact_fever": "接觸發燒或呼吸道人士", "contact_patient": "接觸武漢肺炎可能或確診病例", "contact_secretion": "接觸武漢肺炎可能或確診病例分泌物"};
    for(var key in dict.source) {
        if (!(key in tmp)) {
            chines_dict.source[transform.source[key]] = dict.source[key];
        } else {
            for(var i = 0; i < dict.source[key].length; i++) {
                var origin_obj = dict.source[key][i];
                var trans_obj = {};
                for(var obj_key in origin_obj) {
                    trans_obj[transform["source"][key][obj_key]] = origin_obj[obj_key];
                }
                chines_dict.source[tmp[key]].push(trans_obj);
            }
        }
    }

    tmp = {"close_contactor": "近距離接觸者", "public_area": "發病起至隔離前是否曾至國內公眾場所或搭乘大眾運輸工具"};
    for(var key in dict.contactor) {
        for(var i = 0; i < dict.contactor[key].length; i++) {
            var origin_obj = dict.contactor[key][i];
            var trans_obj = {};
            for(var obj_key in origin_obj) {
                trans_obj[transform["contactor"][key][obj_key]] = origin_obj[obj_key];
            }
            chines_dict.contactor[tmp[key]].push(trans_obj);
        }
    }

    return chines_dict;
}

function get_summary1(dict) {
    var id = dict.id;
    var gender = dict.information.gender;
    var nationality = dict.information.nationality.replace("其他，國籍：", "");
    var occupation = dict.information.occupation;
    var pregnant = dict.information.pregnant_week;
    var married = dict.information.married;
    var chronic = dict.health_condition.chronic_disease;

    if (nationality.endsWith("籍")) {
        nationality += "籍";
    }

    if (pregnant > 0) {
        pregnant = `懷胎${pregnant}月`;
    } else {
        pregnant = "";
    }

    var para = `案例${id}，${gender}，${nationality}，現職為${occupation}，${married}${pregnant}。`;

    if (chronic.length != 0) {
        para += `該案患有${chronic[0].replace("其他，說明：", "")}`;
        for (var i = 1; i < chronic.length; i++) { 
            para += `、${chronic[i].replace("其他，說明：", "")}`;
        } 
        para += "。";
    }
    return para;
}

function get_summary2(sick_list, activity_list) {
    var para = "============== 病程史 ==============\n";
    for (var i = 0; i < sick_list.length; i++) { 
        para += `${sick_list[i].date}： `;
        var event = sick_list[i].event;
        para += `${event[0]}`;
        for(var j = 1; j< event.length; j++) {
            para += `、${event[j]}`;
        }
        para += '。\n';
    } 
    para += "\n============== 活動史 ==============\n";
    for (var i = 0; i < activity_list.length; i++) { 
        para += `${activity_list[i].date}： `;
        var event = activity_list[i].event;
        para += `${event[0]}`;
        for(var j = 1; j< event.length; j++) {
            para += `、${event[j]}`;
        }
        para += '。\n';
    } 
    return para;
}

function get_summary3(dict) {
    var close_contact = dict.contactor.close_contactor;
    var para = ";"
    if (close_contact.length != 0) {
        para = "本案例近期接觸過：";
        for (var i = 0; i < close_contact.length; i++) {
            var group = close_contact[i];
            para += `${group.type}`
            if ("number" in group) {
                para += `${group.number}名`
            }
            if ("symptom_count" in group) {
                para += `，其中${group.symptom_count}人有不適症狀`
            }
            if ("fever_count" in group) {
                para += `、${group.fever_count}人發燒`;
            }
            if ("note" in group) {
                para += `，備註：「${group.note}」`;
            }
            para += "。";
            
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
    for (var i = 0; i < symptom.length; i++) { 
        time_obj = {"date": symptom[i].date, "event": [symptom[i].name.replace("其他：", "")]};
        check_and_insert(time_obj, time_list);
    } 
    for (var i = 0; i < see_doc.length; i++) { 
        time_obj = {"date": see_doc[i].date, "event": [see_doc[i].name.replace("其他：", "")+see_doc[i].type]};
        check_and_insert(time_obj, time_list);
    } 
}

function parse_source (time_list, dict) {
    var source = dict.source;
    var nation_location = source.nation_and_location;
    var contact_fever = source.contact_fever;
    var contact_patient = source.contact_patient;
    var contact_secretion = source.contact_secretion;
    var time_obj;
    for (var i = 0; i < nation_location.length; i++) {
        var country = nation_location[i];
        var event_string = "在" + country.nation + country.type + "至" + country.end_date;
        time_obj = {"date": country.start_date, "event": [event_string]};
        check_and_insert(time_obj, time_list);
    }
    for (var i = 0; i < contact_fever.length; i++) {
        var contact = contact_fever[i];
        var place = contact.name;
        if (place.startsWith("其他：")) {
            place = "在" + place.substr(3) + "接觸";
        }
        var event_string = "與發燒者" + place;
        if (contact.end_date != "") {
            event_string += "至" + contact.end_date;
        }
        time_obj = {"date": contact.start_date, "event": [event_string]};
        check_and_insert(time_obj, time_list);
    }
    for (var i = 0; i < contact_patient.length; i++) {
        var contact = contact_patient[i];
        var place = contact.name;
        if (place.startsWith("其他：")) {
            place = "在" + place.substr(3) + "接觸";
        }
        var event_string = "與確診病患" + place;
        if (contact.end_date != "") {
            event_string += "至" + contact.end_date;
        }
        time_obj = {"date": contact.start_date, "event": [event_string]};
        check_and_insert(time_obj, time_list);
    }
    for (var i = 0; i < contact_secretion.length; i++) {
        var contact = contact_secretion[i];
        var place = contact.name;
        if (place.startsWith("其他：")) {
            place = "在" + place.substr(3);
        }
        var event_string = place + "時接觸確診病患之分泌物";
        if (contact.end_date != "") {
            event_string += "至" + contact.end_date;
        }
        time_obj = {"date": contact.start_date, "event": [event_string]};
        check_and_insert(time_obj, time_list);
    }

}

function parse_contactor (time_list, dict) {
    var public_area = dict.contactor.public_area;
    for (var i = 0; i < public_area.length; i++) {
        var area = public_area[i];
        var event_string = "經由" + area.transportation + "至" + area.city + area.location;
        var t = new Date(area.start_date);
        var t2 = new Date(area.end_date);
        do {
            var dateString = new Date(t.getTime() - (t.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
            var time_obj = {"date": dateString, "event": [event_string]};
            check_and_insert(time_obj, time_list);
            t.setDate(t.getDate()+1);
        } while (area.end_date !== "" && t.getDate() < t2.getDate());
    } 
}

function check_and_insert(time_obj, time_list) {
    var prev_obj = time_list.find(function check_date(obj){
        return obj.date === time_obj.date;
    });
    if (prev_obj !== undefined) {
        for (var i = 0; i < time_obj.event.length; i++) {
            time_list[time_list.indexOf(prev_obj)].event.push(time_obj.event[i]);
        }
    }
    else {
        time_list.push({"date": time_obj.date, "event": time_obj.event.slice()});
    }
}

function list_compare(a, b) {
    switch (a.date > b.date) {
        case true:
            return 1;
        default:
            return -1;
    }
}