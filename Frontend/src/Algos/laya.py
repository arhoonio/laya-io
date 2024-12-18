import sys
import pandas as pd

def parseFile(f):
      full = []
      stack = []
      for line in f:
            split_line = line.strip().split(' ')
            this_line = []
            for line_num, kanakku in enumerate(split_line):
                  if len(kanakku) == 0: continue
            # translate numbers and kaarvais
                  if kanakku.isnumeric() or '(' in kanakku: 
                        this_line+=(info["sollus"][kanakku][0].split(' '))
                        full+=info["sollus"][kanakku][0].split(' ')
                  # start repitition
                  elif '[' in kanakku:
                        # FULL LINE to repeat x times
                        if 'x' in kanakku: 
                              curr = this_line
                              full = full[:line_num]
                              for i in range(int(kanakku[2]) -1): 
                                    this_line+=curr
                                    full+=curr
                              continue
                        # start of phrase to be repeated
                        else: 
                              stack.append(len(full))
                              if len(kanakku) > 1: 
                                    without_bracket = kanakku[1:]
                                    if without_bracket.isnumeric() or '(' in without_bracket:
                                          this_line+=(info["sollus"][without_bracket][0].split(' '))
                                          full+=info["sollus"][without_bracket][0].split(' ')
                                    else:
                                          this_line.append(without_bracket)
                                          full.append(without_bracket)      
                  # end repitition
                  elif ']' in kanakku:
                        innermost = stack.pop()
                        to_repeat = full[innermost:len(full)].copy()
                        for i in range(int(kanakku[-2]) - 1): 
                              this_line+=to_repeat
                              full+=to_repeat
                  else: 
                        this_line.append(kanakku)
                        full.append(kanakku)
      return full
            
def korvai_placed(sollu, symbols, gathi):
    ret = ""
    last_symbol = -1
    for i in range(0, len(sollu), gathi):
        if last_symbol+3 > len(symbols):last_symbol=-1
        else: last_symbol+=1
        ret+=f"({symbols[last_symbol]})"+ ' ' + ' '.join(sollu[i:i+gathi])+'\n'
    return ret

def korvai_pd_export(sollu, symbols, gathi):
      df = pd.DataFrame(columns=symbols)
      for i in range(0, len(sollu), gathi*len(symbols)):
            df.loc[i] = [' '.join(sollu[i+gathi*j:i+gathi+gathi*j]) for j in range(len(symbols))]
      df.to_csv(f'{sys.argv[1][:-4]}-results.csv')
            
thalam = input("thalam: ")
jaathi = int(input("jaathi (# aksharams in laghu): "))
gathi = int(input("gathi (# subdivisions per aksharam): "))
laghu = ['|'] + [f'{i+2}' for i in range(jaathi-1)]
dhrutham = ['|', 'O']
anudhrutham = ['|']
mode = 'math'
info = {
    "thalam-symbols" : {
        "triputa" : laghu + dhrutham + dhrutham,
        "rupaka-long": dhrutham + laghu,
        "rupaka-short": anudhrutham + dhrutham,
        "eka" : laghu,
        "matya" : laghu + dhrutham + laghu,
        "jhampa": laghu + anudhrutham + dhrutham,
        "dhruva": laghu + dhrutham + laghu + laghu,
        "misra chapu": ['O', 'O', '*', '|', '*', '|', '*'],
        "sankeerna chapu": ['O', 'O', '*', '|', '*', '|', '*', '|', '*'],
        "kanda chapu": ['|', '*', 'O', 'O', '*']
    },
    "thalam-aks" : {
        "triputa" : gathi*(jaathi + 4),
        "rupaka-long": gathi*(2 + jaathi),
        "rupaka-short": gathi*3,
        "eka" : gathi*jaathi,
        "matya" : gathi*(2+jaathi),
        "jhampa": gathi*(jaathi + 3),
        "dhruva": gathi*(jaathi + 2 + jaathi),
        "misra chaapu": 7*gathi,
        "kanda chapu": 5*gathi,
        "sankeerna chapu": 9*gathi
    },
    "prefixes" : {
        1: "eka",
        2: "chaturasra", 
        3: "tisra",
        4: "chaturasra",
        5: "kanda",
        6: "tisra",
        7: "misra",
        8: "chaturasra",
        9: "sankeerna",
        10: "kanda",
        12: "tisra",
        14: "misra",
        16: "chaturasra",
        18: "sankeerna"
    },
    "sollus" : {
        '1': ["tha", "dhi", "thom", "nam"],
        '2': ["tha ka", "ki ta", "tho ka", "thom ka", "kita thaka", "thaka dhina"],
        '3': ["tha ki ta", "ku ku tha"],
        '4': ["tha ka dhi na", "ki ta tha ka", "tha ka dhi mi"],
        '5': ["tha dhin gi na thom", "tha ka tha ki ta", "tha dhin gi na thom", "thari kita kita thaka naka", "kita thaka thari kita thom-", "thari thari kita kita kum-"],
        '6':  ["tha dhin - gi na thom", "tham- kita thaka thari kita thaka", "tham- kita thaka thom- kita thom-",],
        '7':  ["tha - dhin - gi na thom", "tha ka dhi mi tha ki ta", "tham- kita thaka thaka thari kita thaka", "kita thaka thari kita kita thaka naka",],
        '8':  ["thi- - tham- kita thaka thari kita thaka", "tha dheem - tha dhin gi na thom", "tha ka dhi mi tha ka ja nu", "tham - ki ta tha ka ja nu"],
        '9':  ["tha ka dhi mi tha ka tha ki ta", "tha - dheem - tha dhin gi na thom", "thari thari kita thaka thari kita kita thaka naka", "thom - thom - thom - thom - tha"],
        '10':  ["tha ki ta dheem - tha dhin gi na thom", "tha - dhin - gi - na - thom -", "ki ta tha ka tha ri ki ta thom -",  "tha ri tha ri ki ta ki ta kum", "thari kita kita thaka naka", "tha- tha- thari thari kita thaka thaka thari kita thaka",],
        
        '-': ["-"],
        '(1)': ["-"],
        '(2)': ["tham -", "dheem -", "dhin -", "dhi -", "- -"],
        '(3)': ["thaan - gu", "dheen - gu", "tham - -", "- - -"],
        '(4)': ["tham - - -", "tham - tham -", "dheem - dheem -", "- - - -"],
        '(5)': ["dhin - thaan - gu", "dhin - dheen - gu", "- - - - -"],
        '(6)': ["dheen - - - gu -","thaan - gu thaan - gu", "dheen - gu dheen - gu", "tham - tham - tham -"],
        '(7)': ["dhin - dhin - thaan - gu", "dhin - dhin - dheen - gu"],
        '(8)': ["tham - - - tham - - -", "dheem - - - dheem - - -"],
    },
}

solluList = []
with open(sys.argv[1]) as f:
      solluList = parseFile(f)

print()
if 'chapu' not in thalam: print(f"{info['prefixes'][jaathi]} jaathi {thalam} thalam ({info['prefixes'][gathi]} gathi)")
else: print(f"{thalam} thalam ({info['prefixes'][gathi]} gathi)")
print("layout:", end=' ')
for symbol in info["thalam-symbols"][thalam]: print(symbol, end=' ')
print()
print("total aksharams in one avarthanam:", info["thalam-aks"][thalam])
print()
print(korvai_placed(sollu=solluList, symbols=info["thalam-symbols"][thalam], gathi=gathi))
print("total aksharams:",len(solluList))

korvai_pd_export(sollu=solluList, symbols=info["thalam-symbols"][thalam], gathi=gathi)