var myObj = "";
var allTextLines="";
var cur_const = "";
var dict_colors = {
            'BharatiyaJanataParty':'#ff9933',
            'IndianNationalCongress':'#0F6796',
           'BahujanMuktiParty':'#ffa500',
           'BahujanSamajParty':'#000080',
           'VyavasthaParivartanParty':'#ffff00',
           'RealDemocracyParty':'#008000',
           'Shivsena':'#0000ff',
           'Independent':'#ff0000',
           'AamAadmiParty':'#000000',
           'SamajwadiParty':'#A52A2A',
           'YuvaSarkar':'#800000',
           'JanataDal(United)':'#B22222',
           'AllIndiaHindustanCongressParty':'#8B0000',
           'RashtriyaKrantikariSamajwadiParty':'#5E3A32',
           'NationalistCongressParty':'#B8978F',
           'GujaratJanChetnaParty':'#BEC8D2',
           'AapniSarkarParty':'#1E3C5C',
           'BhartiyaTribalParty':'#BB2FAF',
           'SwabhimanParty':'#60DC19',
           'RashtriyaSamajwadiParty(Secular)':'#DE1E6A',
           'LokVikasManch':'#7E295B',
           'NavinBharatNirmanManch':'#EF0790',
           'LokGathbandhanParty':'#1B9878',
           'RepublicanPartyofIndia':'#3574EC',
           'BharatiyaNationalJantaDal':'#1CEC2F',
           'BharatiyaRashtravadiPaksha':'#D0E81F',
           'CommunistPartyofIndia(Marxist)':'#A2E81F',
 }

$(document).ready(function () {
    document.getElementById("state1").options.length=0;
    var list =["--Select State--","chattisgarh","madhyapradesh","mizoram","rajasthan","telangana"]
        for(var i=0;i<list.length;i++)
        {
          var select = document.getElementById("state1");
          select.options[select.options.length] = new Option(list[i],list[i]);
        }
    });

    function updatetrend(){
     
		var list1 = document.getElementById('state1');
		if(list1.value=='--Select State--')
		{
		   alert("Select state")
			return false;
		}
        else
        {
            $.ajax({
        		type: "GET",
        		url: "data/trends/"+list1.value+".csv",
        		dataType: "text",
        		success: function(data) {processData(data,list1.value);}
		 });

        }
    }

   

function processData(allText,state) {
    //alert(allText)
    var lines = [];
    var sl_no = [];
    var pr_no = [];
    constituency = [];
    winner = [];
    winner_party = [];
    runner=[];
    runner_party = [];
    margin_ = [];
    col = [];
    prev_winner = [];
    prev_winner_party = [];
    prev_margin = [];
    p=0
    allTextLines = allText.split(/\r\n|\n/);
    for (var i=1; i<allTextLines.length-1;i++) {
        var data = allTextLines[i].split(',');
            var tarr = [];
            for (var j=0; j<data.length; j++) {
                  tarr.push(data[j]);   
              }
              console.log(tarr)
              p+=1
              sl_no.push(p);
              constituency.push(tarr[2]);
              winner.push(tarr[10]);
              winner_party.push(tarr[11]);
              tarr[4] = tarr[4].split(' ').join('');
              col.push(dict_colors[tarr[4]]);
              runner.push(tarr[3]);
              runner_party.push(tarr[4]);
              margin_.push(tarr[5]);
              lines.push(tarr);
              if(tarr[7]!='')
              {
                tarr[7] = tarr[7].split(' ').join(''); 
                prev_winner.push(tarr[7]);
                prev_margin.push(tarr[6]);
                tarr[8] = tarr[8].split(' ').join(''); 
                prev_winner_party.push(tarr[8]);
              }
             
    }
    var a = constituency;
    var b = margin_;
    var c = new Array();
    for(var i = 0; i < a.length; i++)
    {
        c.push('Const: '+a[i]+'<br>Winner: '+winner[i]+' Margin: '+b[i]+'  Party: '+winner_party[i]+'<br>Opponent: '+runner[i]+' Party: '+runner_party[i]);
    }
    
    
    //alert(c[0]);
    margin_ = margin_.map(function (x) { 
        return parseInt(x, 10); 
        });
    sl_no = sl_no.map(function (x) { 
        return parseInt(x, 10); 
        });
    
    prev_margin = prev_margin.map(function (x) { 
        return parseInt(x, 10); 
        });
    var d = constituency;
    var e = prev_margin;
    var f = new Array();
    for(var i = 0; i < a.length; i++)
    {
        f.push('Winner: '+prev_winner[i]+'  Party: '+prev_winner_party[i]+' Margin: '+e[i]);
    }
    var trace1 = {
          x: sl_no,
          y: margin_,
          name: '2018 Results',
          type: 'scatter',
          text:c,
          hoverinfo: 'text',
    };
        var trace2 = {
            x: sl_no,
            y: prev_margin,
            name: '2013 Results',
            type: 'scatter',
            text:f,
            hoverinfo: 'text',
      };
      var data = [trace1 , trace2];    
    layout = {
        title:'Trend wise report of '+state,
     };
    
    Plotly.newPlot('myDiv', data,layout);
   unique_Win =[];
   
    $.each(winner_party, function(i, el){
           if($.inArray(el, unique_Win) === -1) unique_Win.push(el);
    });
    var ks =0;
    var content = "<table><tr>"
    for(var i=0; i<unique_Win.length; i++){
        //alert(unique_Win[i]);
        content += '&nbsp<td> <div style="height:20px; border:1px solid black; width:20px; background-color:'+dict_colors[unique_Win[i].split('_').join('')]+'"> </div></td><td><b>' +  unique_Win[i].split('_').join(' ') + ' </b></td>';
        ks = ks+1;			
        if(ks%3==0){
            content += '</tr><tr>';
        }			
    }
    content += "</tr></table>"
        jQuery('#mySelector').html('');
    $('#mySelector').append(content);
}