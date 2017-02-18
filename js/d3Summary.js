var d3Summary = d3Summary || {};

d3Summary = {
    init: function (options) {

      options = options || {};
      var csv_path =  options.csv_path || "";
      var el =        options.element || "function-container";
      var columns =   options.columns || [];
      var headers =   options.headers || [];

      var table = d3.select("#" + el)
            .append('table')
            .attr(),  //#d3container is the <div id="d3container"> above
          thead = table.append('thead'),
          tbody = table.append('tbody');
          // Debug only
          // console.log(csv_path + " , " + el + " , " + columns[0] + " , " + columns[1]);

$.when($.get(csv_path)).then(

      d3.csv(csv_path, function(error, csv_data) {
       var data = d3.nest()
          .key(function(d) {
              return d[columns[0]];
            }
          )
          .rollup(function(d) {
              // g[columns[1] bellow specifies the second column from the called .csv]
              return d3.sum(d, function(g) {return g[columns[1]]; });
            }
          )
          .entries(csv_data);
        // For each value returned from the d3.csv(csv_path), return a table entry...
        //append the Header row
        thead.append('tr')
             .selectAll('th')
             .data(headers)
             .enter()
             .append('th')
             .text(function(column) {return column; });

          data.forEach(function(d) {
              var rows = tbody.selectAll('tr')
                .data(data)
                .enter()
                .append('tr');

                var cells = rows.selectAll('td')
                  .data(function (d) {
                    return Object.values(d);
                  })
                  .enter()
                  .append('td')
                  .text(function (d) { return d; });

                  var cells = rows.selectAll('td')
                  .data(function(d) {
                      var arr = [];
                      for (var i in d) {
                          arr.push(d[i])
                      }
                      return arr;
                  })
                  .enter()
                  .append('td')
                  .text(function(d) { return d;});

                  d.Date = d.key;
                  d.Reward = d.values;
                  // console.log("Date: " + d.Date +" , "+ headers[1] +" , "+ d.Reward);
            })

          }))
}
}
