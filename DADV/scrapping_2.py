import requests
from bs4 import BeautifulSoup
import csv



# value = "S26" > Chhattisgarh
#
# value = "S12" > Madhya Pradesh
#
# value = "S16" > Mizoram
#
# value = "S20" > Rajasthan
#
# value = "S29" > Telangana

# function to get the Constituency

def get_constituencies(html, stateID):

    mainpage = BeautifulSoup(html,features="lxml")

    parse_constituency = mainpage.find('input', attrs={'id': stateID})

    all_constituency_info = str(parse_constituency['value'].encode("ascii"))

    all_constituency_info_list = all_constituency_info.split(";")

    return(all_constituency_info_list)


def get_constituency_result_info(writer, constituency_url, constituency_name, state):


    getinfo = BeautifulSoup(requests.get(constituency_url).content,features="lxml")

    parse_table = getinfo.find('table', attrs={'border': 1})
    all_candidates = []

    if (parse_table != None):

        for row in parse_table.findAll('tr', attrs={'style': 'font-size:12px;'}):
            candidate = [state, constituency_name]
            for cell in row.findAll('td'):
                candidate.append(cell.text.encode("utf8"))
            all_candidates.append(candidate)
        writer.writerows(all_candidates)

def main():

    base_url = "http://eciresults.nic.in/Constituencywise"

    url = "http://eciresults.nic.in/ConstituencywiseS2653.htm?ac=53"

    html = requests.get(url).content

    states = {'MP': 'S12', 'MZ': 'S16', 'RJ': 'S20', 'CG': 'S26', 'TG': 'S29'}

    datafile = open("./aggregated_election_results_data.csv", "w")

    writer = csv.writer(datafile)

    writer.writerow(['State', 'Constituency', 'Candidate', 'Party', 'Votes'])


    for each_state, code in states.items():

        all_constituency_info_list = get_constituencies(html,'Hdn'+each_state)

        print(all_constituency_info_list)

        print("LOG: Starting with state --" + each_state)


        for constituency_data in all_constituency_info_list:
            if constituency_data is not '':
                constituency_data_split = constituency_data.split(',')
                if(len(constituency_data_split)>1):
                    get_constituency_result_info(writer, base_url + code + constituency_data_split[0] + ".htm?ac=" +constituency_data_split[0], constituency_data_split[1], each_state)


if __name__ == "__main__":
    main()
