import csv
import requests
from bs4 import BeautifulSoup
url = 'https://finance.yahoo.com/trending-tickers'
page = requests.get(url)
if page.status_code == 200:
    soup = BeautifulSoup(page.text,'html.parser')
    soup1 = BeautifulSoup(str(soup.find_all(class_="yfinlist-table W(100%) BdB Bdc($tableBorderGray)")), 'html.parser')
    soup2 = BeautifulSoup(str(soup.find_all(class_="data-col0 Ta(start) Pstart(6px) Pend(15px)")), 'html.parser')
    symbol = soup2.find_all('a')
    for i in symbol:
        print(i.get_text())
    soup3 = BeautifulSoup(str(soup.find_all(class_="data-col1 Ta(start) Pstart(10px) Miw(180px)")), 'html.parser')
    name = soup3.find_all()
    for j in name:
        print(j.get_text())
    for i, j in zip(symbol, name):
        print(i.get_text(), j.get_text())

    with open('triggers.csv', 'w') as newFile:
        newFileWriter = csv.writer(newFile)
        for i, j in zip(symbol, name):
            newFileWriter.writerow([i.get_text(), j.get_text()])