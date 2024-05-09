import sys

def parseLine(line, section):
    ret = []
    for kanakku in line:
        ret.append(info["sollus"][kanakku][section][0])
    return ret

def flatten_sollu(sollu):
    ret_raw = []
    for i in range(len(sollu["P"].keys())):
        if "P" in sollu.keys():
            for phrase in sollu["P"][i]: ret_raw.extend(phrase.split(' '))
        if "M" in sollu.keys():
            for phrase in sollu["M"][i]: ret_raw.extend(phrase.split(' '))
        if "U" in sollu.keys():
            for phrase in sollu["U"][i]: ret_raw.extend(phrase.split(' '))
    return ret_raw

def korvai_placed(sollu, symbols, gathi):
    ret = ""
    last_symbol = -1
    flattened = flatten_sollu(sollu)
    for i in range(0, len(flattened), gathi):
        if last_symbol+3 > len(symbols):last_symbol=-1
        else: last_symbol+=1
        ret+=f"({symbols[last_symbol]})"+ ' ' + ' '.join(flattened[i:i+gathi])+'\n'
    return ret

thalam = input("thalam: ")
jaathi = int(input("jaathi (# aksharams in laghu): "))
gathi = int(input("gathi (# subdivisions per aksharam): "))
laghu = ['|'] + [f'{i+2}' for i in range(jaathi-1)]
dhrutham = ['|', 'O']
anudhrutham = ['|']
info = {
    "thalam-symbols" : {
        "triputa" : laghu + dhrutham + dhrutham,
        "rupaka-long": dhrutham + laghu,
        "rupaka-short": anudhrutham + dhrutham,
        "eka" : laghu,
        "matya" : laghu + dhrutham + laghu,
        "jhampa": laghu + anudhrutham + dhrutham,
        "dhruva": laghu + dhrutham + laghu + laghu
    },
    "thalam-aks" : {
        "triputa" : gathi*(jaathi + 4),
        "rupaka-long": gathi*(2 + jaathi),
        "rupaka-short": gathi*3,
        "eka" : gathi*jaathi,
        "matya" : gathi*(2+jaathi),
        "jhampa": gathi*(jaathi + 3),
        "dhruva": gathi*(jaathi + 2 + jaathi)
    },
    "prefixes" : {
        1: "eka",
        3: "tisra",
        4: "chaturasra",
        5: "kanda",
        6: "tisra",
        7: "misra",
        8: "chaturasra",
        9: "sankeerna",
        10: "kanda"
    },
    "sollus" : {
        '1': {"P": ["tha", "dhi", "thom", "nam"],
              "M":["tha", "dhi", "thom", "nam"],
              "U": ["tha", "dhi", "thom", "nam"]},
        '2': {"P": ["tha ka", "ki ta", "tho ka", "thom ka", "kita thaka", "thaka dhina"],
              "M": ["tha ka", "ki ta", "tho ka", "thom ka", "kita thaka", "thaka dhina"],
              "U": ["tha ka", "ki ta", "tho ka", "thom ka", "kita thaka", "thaka dhina"]},
        '3': {"P": ["tha ki ta", "ku ku tha"],
              "M": ["tha ki ta", "ku ku tha"],
              "U": ["tha ki ta", "ku ku tha"]},
        '4':  {"P": ["tha ka dhi na", "ki ta tha ka", "tha ka dhi mi"],
              "M": ["tha ka dhi na", "ki ta tha ka", "tha ka dhi mi"],
              "U": ["tha ka dhi na", "ki ta tha ka", "tha ka dhi mi"]},
        '5':  {"P": ["tha ka tha ki ta", "tha dhin gi na thom", "thari kita kita thaka naka", "kita thaka thari kita thom-", "thari thari kita kita kum-"],
              "M": ["tha ka tha ki ta", "tha dhin gi na thom", "thari kita kita thaka naka", "kita thaka thari kita thom-", "thari thari kita kita kum-"],
              "U": ["tha dhin gi na thom", "tha ka tha ki ta", "thari kita kita thaka naka", "kita thaka thari kita thom-", "thari thari kita kita kum-"]},  
        '6':  {"P": ["tham- kita thaka thari kita thaka", "tha dhin - gi na thom", "tham- kita thaka thom- kita thom-",],
              "M": ["tha dhin - gi na thom", "tham- kita thaka thari kita thaka", "tham- kita thaka thom- kita thom-",],
              "U": ["tha dhin - gi na thom", "tham- kita thaka thari kita thaka", "tham- kita thaka thom- kita thom-",]},
        '7':  {"P": ["tha ka dhi mi tha ki ta", "tha - dhin - gi na thom", "tham- kita thaka thaka thari kita thaka", "kita thaka thari kita kita thaka naka",],
              "M": ["tha ka dhi mi tha ki ta", "tha - dhin - gi na thom", "tham- kita thaka thaka thari kita thaka", "kita thaka thari kita kita thaka naka",],
              "U": ["tha - dhin - gi na thom", "tha ka dhi mi tha ki ta", "tham- kita thaka thaka thari kita thaka", "kita thaka thari kita kita thaka naka",]},
        '8':  {"P": ["thi- - tham- kita thaka thari kita thaka", "tha dheem - tha dhin gi na thom", "tha ka dhi mi tha ka ja nu", "tham - ki ta tha ka ja nu"],
              "M": ["tham - ki ta tha ka ja nu", "tha dheem - tha dhin gi na thom", "tha ka dhi mi tha ka ja nu", "thi- - tham- kita thaka thari kita thaka"],
              "U": ["tha dheem - tha dhin gi na thom", "tha ka dhi mi tha ka ja nu", "tham - ki ta tha ka ja nu", "thi- - tham- kita thaka thari kita thaka"]},
        '9':  {"P": ["tha ka dhi mi tha ka tha ki ta", "tha - dheem - tha dhin gi na thom", "thari thari kita thaka thari kita kita thaka naka", "thom - thom - thom - thom - tha"],
              "M": ["tha ka dhi mi tha ka tha ki ta", "tha - dheem - tha dhin gi na thom", "thari thari kita thaka thari kita kita thaka naka", "thom - thom - thom - thom - tha"],
              "U": ["tha - dheem - tha dhin gi na thom", "tha ka dhi mi tha ka tha ki ta", "thari thari kita thaka thari kita kita thaka naka", "thom - thom - thom - thom - tha"]},
        '10':  {"P": ["tha- tha- thari thari kita thaka thaka thari kita thaka", "ki ta tha ka tha ri ki ta thom -", "tha ri tha ri ki ta ki ta kum", "thari kita kita thaka naka"],
              "M": ["ki ta tha ka tha ri ki ta thom -", "tha - dhi - thari thari kita thaka thaka thari kita thaka", "tha ri tha ri ki ta ki ta kum", "thari kita kita thaka naka"],
              "U": ["tha ki ta dheem - tha dhin gi na thom", "ki ta tha ka tha ri ki ta thom -", "tha - dhi - thari thari kita thaka thaka thari kita thaka", "tha ri tha ri ki ta ki ta kum", "thari kita kita thaka naka"]},
        
        '-': {"P": ["-"],
              "M":["-"],
              "U": ["-"]},
        '(1)': {"P": ["-"],
              "M":["-"],
              "U": ["-"]},
        '(2)': {"P": ["dhi -", "tham -", "dheem -", "dhin -", "- -"],
              "M":["dhi -","tham -", "dheem -", "dhin -", "- -"],
              "U": ["tham -", "dheem -", "dhin -", "dhi -", "- -"]},
        '(3)': {"P": ["thaan - gu", "dheen - gu", "tham - -", "- - -"],
              "M":["thaan - gu", "dheen - gu", "tham - -", "- - -"],
              "U": ["thaan - gu", "dheen - gu", "tham - -", "- - -"]},
        '(4)': {"P": ["tham - tham -", "dheem - dheem -", "- - - -"],
              "M":["tham - tham -", "dheem - dheem -", "- - - -"],
              "U": ["tham - tham -", "dheem - dheem -", "- - - -"]},
        '(5)': {"P": ["dhin - thaan - gu", "dhin - dheen - gu", "- - - - -"],
              "M":["dhin - thaan - gu", "dhin - dheen - gu", "- - - - -"],
              "U": ["dhin - thaan - gu", "dhin - dheen - gu", "- - - - -"]},
        '(6)': {"P": ["thaan - gu thaan - gu", "dheen - gu dheen - gu", "tham - tham - tham -"],
              "M":["thaan - gu thaan - gu", "dheen - gu dheen - gu", "tham - tham - tham -"],
              "U": ["thaan - gu thaan - gu", "dheen - gu dheen - gu", "tham - tham - tham -"]},
        '(7)': {"P": ["dhin - dhin - thaan - gu", "dhin - dhin - dheen - gu"],
              "M":["dhin - dhin - thaan - gu", "dhin - dhin - dheen - gu"],
              "U": ["dhin - dhin - thaan - gu", "dhin - dhin - dheen - gu"]},
        '(8)': {"P": ["tham - - - tham - - -", "dheem - - - dheem - - -"],
              "M":["tham - - - tham - - -", "dheem - - - dheem - - -"],
              "U": ["tham - - - tham - - -", "dheem - - - dheem - - -"]},
    },
}

korvai = {'total':0}
sollu = {}
with open(sys.argv[1]) as f:
    section = "P"
    count = {
        "P": -1,
        "M":-1,
        "U":-1
    }
    for line in f:
        if "P" in line:
            section = "P"
            count[section]+=1
            if section not in korvai.keys(): korvai[section] = {}
            if section not in sollu.keys(): sollu[section] = {}
            if count[section] not in korvai[section].keys(): korvai[section][count[section]] = []
            if count[section] not in sollu[section].keys(): sollu[section][count[section]] = []
        elif "U" in line:
            section = "U"
            count[section]+=1
            if section not in korvai.keys(): korvai[section] = {count[section]:[]}
            if section not in sollu.keys(): sollu[section] = {count[section]:[]}            
            if count[section] not in korvai[section].keys(): korvai[section][count[section]] = []
            if count[section] not in sollu[section].keys(): sollu[section][count[section]] = []
        elif "M" in line:
            section = "M"
            count[section]+=1
            if section not in korvai.keys(): korvai[section] = {count[section]:[]}
            if section not in sollu.keys(): sollu[section] = {count[section]:[]}            
            if count[section] not in korvai[section].keys(): korvai[section][count[section]] = []
            if count[section] not in sollu[section].keys(): sollu[section][count[section]] = []
        else:
            formatted_line = line.strip().split(' ')
            valueList = [int(string) for string in line.replace('(','').replace(')','').strip().split(' ')]
            korvai[section][count[section]] += valueList
            korvai["total"] += sum(valueList)
            sollu[section][count[section]] += parseLine(formatted_line, section)
print()
print("---THALAM INFO---")
print(f"{info['prefixes'][jaathi]} jaathi {thalam} thalam ({info['prefixes'][gathi]} gathi)")
print("layout:", end=' ')
for symbol in info["thalam-symbols"][thalam]: print(symbol, end=' ')
print()
print("total aksharams in one avarthanam:", info["thalam-aks"][thalam])
print()
print("---KORVAI INFO---")
print("total aksharams:", korvai["total"])
print()
print(korvai_placed(sollu=sollu, symbols=info["thalam-symbols"][thalam], gathi=gathi))