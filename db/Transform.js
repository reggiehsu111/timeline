const transform = {
    "information": {
        "report_date": "通報日期",
        "name": "姓名",
        "gender": "生理性別",
        "birth_date": "出生日期",
        "nationality": "國籍",
        "address": "居住地",
        "address_city": "居住縣市",
        "address_area": "居住鄉鎮市區",
        "address_detail": "居住地址",
        "contact": "聯絡方式",
        "occupation": "職業",
        "med_title": "是否為醫療人員",
        "onset": "發病日期",
        "married": "婚姻狀況",
        "inv_date": "調查日期",
        "inv_person": "調查人"   
    },
    "health_condition": {
        "symptoms": {
            "name": "症狀",
            "date": "時間"
        },
        "seeing_doctor": {
            "type": "類型",
            "name": "醫療院所名稱",
            "date": "就醫日期"
        }
    },
    "source": {
        "nation_and_location": {
            "nation": "國名",
            "start_date": "開始日期",
            "end_date": "結束日期",
            "type": "旅遊型態或目的",
            "companion_num": "同行旅客",
            "companion_symptoms": "同型者健康狀況",
            "transport_and_flight_code": "交通工具或航班編號"
        },
        "contact_fever": {
            "name": "接觸場所",
            "start_date": "開始日期",
            "end_date": "結束日期"
        },
        "contact_patient": {
            "name": "接觸場所",
            "start_date": "開始日期",
            "end_date": "結束日期"
        },
        "contact_secretion": {
            "name": "接觸場所",
            "start_date": "開始日期",
            "end_date": "結束日期"
        },
        "infect": "是否曾至公告疫區",
        "market": "是否曾至野味市場",
        "hospital": "是否曾至醫療院所",
        "pet": "是否曾至飼養任何動物",
        "bird": "是否曾接觸禽鳥",
        "farm": "是否曾接觸畜牧場",
        "shamble": "是否曾接觸屠宰場",
        "wild": "是否曾接觸或食用野生動物",
        "other": "是否有其他動物接觸史"
    },
    "contactor": {
        "public_area": {
            "start_date": "開始日期",
            "end_date": "結束日期",
            "city": "城市",
            "location": "地點",
            "transportation": "交通工具"
        },
        "close_contactor": {
            "type": "類別",
            "number": "總數",
            "symptom_count": "有症狀人數",
            "fever_count": "發燒人數",
            "note": "備註"
        }
    }
};

module.exports = {
    transform
}