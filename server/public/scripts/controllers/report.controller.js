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
      let timeChart = new Chart(barChart, {
         type: 'bar',
         data: {
            labels: chartLabels,
            datasets: [
               {
                  label: 'Hours Per Project',
                  backgroundColor: "rgba(50,200,200,0.2)",
                  borderColor: "rgba(50,200,200,1)",
                  borderWidth: 2,
                  hoverBackgroundColor: "rgba(50,50,50,0.4)",
                  data: chartData
               }
            ]
         },
         options: {
            scales: {
               yAxes: [{
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