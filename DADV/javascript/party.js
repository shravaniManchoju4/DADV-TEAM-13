$(document).ready(function () {
    document.getElementById("state1").options.length=0;
    var list =["--Select State--","Chattisgarh","Madhyapradesh","Mizoram","Rajasthan","Telangana"]
        for(var i=0;i<list.length;i++)
        {
          var select = document.getElementById("state1");
          select.options[select.options.length] = new Option(list[i],list[i]);
        }
    });
lines=[]
var allTextLines="";
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
    
        function update(){
         
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
                    url:"data/party/"+list1.value+".csv",
                    dataType: "text",
                    success: function(data) {processData(data,list1.value);}
             });
    
            }
        }

        function processData(allText,state) {
            lines=[]
            allTextLines = allText.split(/\r\n|\n/);
            for (var i=3; i<allTextLines.length-1; i++) {
                var data = allTextLines[i].split(',');
                    var tarr = [];
                    for (var j=0; j<data.length; j++) {
                          tarr.push(data[j]);
                      }
                      lines.push(tarr);
                    }
                    plot(state);
            }

            function plot(state){
                var x="";
                var won = new Array();
                var party = new Array();
                var col = new Array();
                var loss=new Array();
                count=0
                for(x in lines)
                {
                    var c=lines[x]
                    count=count+Number(c[1])
                }
                for (x in lines) {
                    var c=lines[x]
                    party.push(c[0])
                    won.push(c[1])
                    k=count-Number(c[1])
                    loss.push(k)
                    c[0] = c[0].split(' ').join('');
                col.push(dict_colors[c[0]]);
                }
                var v = won.map(function (x) { 
                    return parseInt(x,10); 
                });
 
                var d = party;
                var b = won;
                var a = loss;
                var c = new Array();
               
                for(var i = 0; i < d.length; i++)
                {
                    c.push('Party: '+d[i]+'<br>Won: '+b[i]+'<br>Loss: '+a[i]);
                }
                
                var data = [{
                    x: party,
                    y: v,
                    type: 'bar',
                    text:c,
                    hoverinfo: 'text',
                 mode: 'markers',
                     marker: {color: col,opacity:1,}
                  }];
                  layout = {
                hovermode:'closest',
                title:'Party wise report of '+state,
                xaxis:{zeroline:false, hoverformat: '.2r'},
                yaxis:{zeroline:false, hoverformat: '.2r'}
             };
                  //$('#myDiv').empty();
               Plotly.newPlot('myDiv', data,layout);
                
               jQuery('#mySelector').html('');
                unique_Win =[];
               
                $.each(party, function(i, el){
                       if($.inArray(el, unique_Win) === -1) unique_Win.push(el);
                });
                
                var ks = 0;
                var content = "<table><tr>"
                for(var i=0; i<unique_Win.length; i++){
                    //alert(unique_Win[i]);
                    content += '&nbsp<td> <div style="height:20px; border:1px solid black; width:20px; background-color:'+dict_colors[unique_Win[i].split('_').join('')]+'"> </div></td><td><b>' +  unique_Win[i].split('_').join(' ') + '</b></td>';
                    ks = ks+1;			
                    if(ks%3==0){
                        content += '</tr><tr>';
                    }		
                }
                content += "</tr></table>"
        
            $('#mySelector').append(content);
            }