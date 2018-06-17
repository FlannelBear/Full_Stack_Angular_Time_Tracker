app.controller('ReportController', ['TrackerService', function(TrackerService){
   const vm = this;
   console.log('In Report');

   let chartLabels = [];
   let chartData = [];

   vm.getLabels = function(){
      chartLabels = [];
      TrackerService.get('report/label').then(function(){
            for(let object of TrackerService.data){
               chartLabels.push(object.name);
            }
         });
         vm.getData();
         console.log(chartLabels);
   }

   vm.getData = function(){
      chartData = [];
      TrackerService.get('report/data').then(function(){
         for(let object of TrackerService.data){
            chartData.push(object.hours);
         }
         vm.getChart();
         });
         console.log(chartData);
   }

   vm.getChart = function(){
      let barChart = document.getElementById('barChart').getContext('2d');
      console.log(chartLabels);
      console.log(chartData);

      Chart.defaults.global.defaultFontSize = 8;
      Chart.defaults.global.defaultFontFamily = "monospace";
      Chart.defaults.global.defaultFontColor = "#000";

      let timeChart = new Chart(barChart, {
         type: 'bar',
         data: {
            labels: chartLabels,
            datasets: [
               {
                  label: 'Hours Per Project',
                  backgroundColor: [
                     "#092F86",
                     "#C82600",
                     "#1DA700",
                     "#5C0485",
                     "#C89C00",
                     "#990067",
                     "#007D6C",
                     "#C8BA00"
                  ],
                  borderColor: "rgba(50,50,50,1)",
                  borderWidth: 1,
                  hoverBorderColor: "#000",
                  hoverBorderWidth: 3,
                  data: chartData
               }
            ]
         },
         options: {
            title: {
               display: true,
               text: "Total Hours Per Project",
               fontsize: 25
            },
            scales: {
               yAxes: [{
                  scaleLabel: {
                     display: true,
                     labelString: 'Hours',
                     fontSize: 12
                  },
                  ticks: {
                     beginAtZero: true
                  }
               }]
            }
         }
      });
   }

   vm.getLabels();

}]);