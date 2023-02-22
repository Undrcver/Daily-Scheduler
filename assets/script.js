$(function () {
    //variable declarations
    let curDateEl = $("#currentDay");
    let saveBtnEl = $(".saveBtn");
    let container = $(".container-lg");
    let now = dayjs();
    
    saveBtnEl.click(save);
    
    load();
    
    //loads all elements needed on page on refresh, starts interval
    function load(){
      applyClasses();
      displayTime();  
  
      setInterval(function(){ 
          now = dayjs(); 
          applyClasses();
          displayTime();
        }, 1000);
        
   
      Object.keys(localStorage).forEach((key) => {
          let keyStr = "#" + key;
          let item = localStorage.getItem(key);
          $(keyStr).children("textarea").val(item);
      })
  
    }
  
    //function that displays time on page
    function displayTime() {
      let nowText = now.format('MMM DD, YYYY [at] hh:mm:ss a');
      curDateEl.text(nowText);
    }
    function save(){
      let input = $(this).siblings("textarea").val();
      let id = $(this).parent().attr("id");
      localStorage.setItem(id, input);
    }
  
    function applyClasses(){
      let offset = 9;
      let hour = now.hour();
  
      container.children().each(function(){
        if(offset < hour){
          $(this).removeClass("present");
          $(this).removeClass("future");
          $(this).addClass("past")
        }else if(offset == hour){
          $(this).removeClass("past");
          $(this).removeClass("future");
          $(this).addClass("present")
        }else{
          $(this).removeClass("past");
          $(this).removeClass("present");
          $(this).addClass("future")
        }
        offset++;
      });
    }
  
  });