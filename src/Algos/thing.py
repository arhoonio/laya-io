import sys

def parseLine(line, section):
    ret = []
    for kanakku in line:
        ret.append(info["sollus"][kanakku][section][0])
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
    },
}

korvai = {}
sollu = {}
with open(sys.argv[1]) as f:
    section = "P"
    for line in f:
        if "P" in line:
            section = "P"
            korvai[section] = []
            sollu[section] = []
        elif "U" in line:
            section = "U"
            korvai[section] = []
            sollu[section] = []
        elif "M" in line:
            section = "M"
            korvai[section] = []
            sollu[section] = []
        else:
            formatted_line = line.strip().split(' ')
            korvai[section] += line.strip().split(' ')
            sollu[section] += parseLine(formatted_line, section)

print(info["thalam-symbols"][thalam])
print(info["thalam-aks"][thalam])
print("---POORVANGAM---")
for bol in sollu['P']: print(bol)
print("---UTTARANGAM---")
for bol in sollu['U']: print(bol)