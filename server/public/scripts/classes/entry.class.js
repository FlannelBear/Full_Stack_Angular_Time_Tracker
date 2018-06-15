class Entry{
   constructor(description, date, startTime, endTime, project_id){
      this.description = description;
      this.date = date;
      this.startTime = startTime;
      this.endTime = endTime;
      this.project_id = project_id;
      this.hours;
   }

   // Method for handling time conversion into hours
   getHours(){
      // let start = ((this.startTime.getHours()*60) + this.startTime.getMinutes());
      // let end = ((this.endTime.getHours()*60) + this.endTime.getMinutes());
      let diffMins = ((this.endTime.getHours()*60) + this.endTime.getMinutes()) - ((this.startTime.getHours()*60) + this.startTime.getMinutes());
      let hours = (diffMins/60).toFixed(2);
      return hours;
   }

   // Method for handling date conversion into mm/dd/yyyy
   formatDate(){
      let month = '' + (this.date.getMonth() + 1);
      let day = '' + this.date.getDate();
      let year = '' + this.date.getFullYear();

      month.length < 2 ? '0' + month : month;
      day.length < 2 ? '0' + day : day;

      return [month, day, year].join('/');
   }
}