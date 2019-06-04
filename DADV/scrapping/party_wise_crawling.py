import csv
from urllib.request import urlopen
from bs4 import BeautifulSoup

html = urlopen('http://eciresults.nic.in/PartyWiseResultS29.htm?st=S29')
bsobj = BeautifulSoup(html,"lxml")
table = bsobj.findAll("table",border='1')[0]
rows = table.findAll("tr")
csvFile = open("Telangana.csv",'wt',newline='')
writer = csv.writer(csvFile)
try:
    for row in rows:
        csvRow=[]
        for cell in row.findAll(['td','th']):
            csvRow.append(cell.get_text())
        writer.writerow(csvRow)
finally:
    csvFile.close()
print("Telangana CSV file created successfully")


html = urlopen('http://eciresults.nic.in/PartyWiseResultS26.htm?st=S26')
bsobj = BeautifulSoup(html,"lxml")
table = bsobj.findAll("table",border='1')[0]
rows = table.findAll("tr")
csvFile = open("Chattisgarh.csv",'wt',newline='')
writer = csv.writer(csvFile)
try:
    for row in rows:
        csvRow=[]
        for cell in row.findAll(['td','th']):
            csvRow.append(cell.get_text())
        writer.writerow(csvRow)
finally:
    csvFile.close()
print("Chattisgarh CSV file created successfully")

html = urlopen('http://eciresults.nic.in/PartyWiseResultS12.htm?st=S12')
bsobj = BeautifulSoup(html,"lxml")
table = bsobj.findAll("table",border='1')[0]
rows = table.findAll("tr")
csvFile = open("Madhyapradesh.csv",'wt',newline='')
writer = csv.writer(csvFile)
try:
    for row in rows:
        csvRow=[]
        for cell in row.findAll(['td','th']):
            csvRow.append(cell.get_text())
        writer.writerow(csvRow)
finally:
    csvFile.close()
print("Madhyapradesh CSV file created successfully")


html = urlopen('http://eciresults.nic.in/PartyWiseResultS16.htm?st=S16')
bsobj = BeautifulSoup(html,"lxml")
table = bsobj.findAll("table",border='1')[0]
rows = table.findAll("tr")
csvFile = open("Mizoram.csv",'wt',newline='')
writer = csv.writer(csvFile)
try:
    for row in rows:
        csvRow=[]
        for cell in row.findAll(['td','th']):
            csvRow.append(cell.get_text())
        writer.writerow(csvRow)
finally:
    csvFile.close()

print("Mizoram CSV file created successfully")


html = urlopen('http://eciresults.nic.in/PartyWiseResultS20.htm?st=S20')
bsobj = BeautifulSoup(html,"lxml")
table = bsobj.findAll("table",border='1')[0]
rows = table.findAll("tr")
csvFile = open("Rajasthan.csv",'wt',newline='')
writer = csv.writer(csvFile)
try:
    for row in rows:
        csvRow=[]
        for cell in row.findAll(['td','th']):
            csvRow.append(cell.get_text())
        writer.writerow(csvRow)
finally:
    csvFile.close()

print("Rajasthan CSV file created successfully")
