import requests
from bs4 import BeautifulSoup
import csv
with open("data/S26.csv", 'w') as f:
        page = requests.get("http://eciresults.nic.in/ConstituencywiseS2653.htm?ac=53")
        soup = BeautifulSoup(page.content, 'html.parser');
        div = soup.find('div');
        data=div.find('input',id="HdnCG" ,type="hidden").get('value').split(';');
        print(data)
        for i in range(0,len(data)-1):
            st=data[i].split(',')
            print(st)
            n = st[0]
            page = requests.get("http://eciresults.nic.in/ConstituencywiseS26" + n + ".htm?ac=" + n)
            soup = BeautifulSoup(page.content, 'html.parser');
            table = soup.find('table', border="1");
            t_rows = table.find_all('tr', style="font-size:12px;");
            for row in t_rows:
                result = row.findAll('td');
                print(result)
                data_writer = csv.writer(f, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL);
                data_writer.writerow(['%s' % (result[0].text.strip()), '%s' % (st[1].strip()), '%s' % (result[1].text.strip()),
                                  '%s' % (result[2].text.strip())]);


