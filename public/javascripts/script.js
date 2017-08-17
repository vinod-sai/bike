/*function updateSingle(studentInput){
  var studentId=studentInput.getAttribute("studentId");
  studentInput.setAttribute("form","submitForm");
  var studentDetails=document.getElementsByClassName(studentId);
  for ( i=0, len=studentDetails.length;i<len;i++) {
    studentDetails[i].setAttribute("form","submitForm");
  }
  var submitForm=document.getElementById("submitForm");
  var location=window.location='updatestudent';
  submitForm.setAttribute("action",location);
  submitForm.submit();
}*/
/*
function editStudent(studentDetails){
//  UpdateSingleJqueryAjax();
  var studentElements=document.getElementsByClassName(studentDetails.id);
  console.log(studentElements);
    for (var i = 0, len = studentElements.length; i < len; i++) {
        studentElements[i].readOnly = "";
        studentElements[i].onchange="";
      }
    var tickSymbol=document.createElement('i');
    tickSymbol.setAttribute("class","fa fa-check");
    tickSymbol.setAttribute("aria-hidden","true");
  //  tickSymbol.setAttribute("onclick","updateSingle(this)");
    tickSymbol.setAttribute("onclick","updateSingleAjax(this)");
    tickSymbol.setAttribute("studentId",studentDetails.id);
    var symbols=studentDetails.parentNode.chidNodes;
    studentDetails.style.display="none";
    var noChangeSymbol=studentDetails.nextElementSibling;
    console.log(noChangeSymbol);
    noChangeSymbol.setAttribute("onclick","window.location.reload()");
    studentDetails.parentNode.insertBefore(tickSymbol,studentDetails.parentNode.childNodes[0]);
}
*/
/*
function deleteStudent(studentDetails){
  var url=window.location.href;
  var urlDecoded= new URL(url);
  var limit=urlDecoded.searchParams.get('limit')?urlDecoded.searchParams.get('limit'):"";
  var page=urlDecoded.searchParams.get('page')?urlDecoded.searchParams.get('page'):"";
  var studentId=studentDetails.getAttribute("studentid");
  window.location.href="/deleteStudent?limit"+limit+"&page="+page+"&studentId="+studentId;
//  ajaxQuery("/deleteStudent?limit"+limit+"&page="+page+"&studentId="+studentId,deleteStudentAjax)
}
function searchQuery(){
  var urlDecoded= new URL(window.location.href);
  var limit=document.getElementById('limit');
  limit.value=urlDecoded.searchParams.get('limit')?urlDecoded.searchParams.get('limit'):"";
  var page=document.getElementById('page');
  page.value=urlDecoded.searchParams.get('page')?urlDecoded.searchParams.get('page'):"";
  var sortBy=document.getElementById('sortBy');
  sortBy.value=urlDecoded.searchParams.get('sortBy')?urlDecoded.searchParams.get('sortBy'):"Name";
}
function ajaxQuery(url, responseFunction){
  var xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange=function(){
    if(this.readyState==4 && this.status==200){
    responseFunction(this);
    }
  };
  xhttp.open("GET",url,true);
  xhttp.send();
}
function updateSingleAjax(studentInput){
  console.log("updating");
  var field = "",value = "", url = "";
  var studentId = studentInput.getAttribute("studentId");
  console.log(studentId);
  var studentDetails = document.getElementsByClassName(studentId);
  console.log(studentDetails);
  for ( i = 0, len = studentDetails.length; i<len; i++) {
    field = studentDetails[i].getAttribute("Name");
    value = studentDetails[i].value;
    url = url +"&"+ field + "=" + value;
  }
  console.log(url);
//ajax query
  ajaxQuery("updatestudent?"+url,responseSingle);

}
function responseSingle(xhttp){
  console.log(xhttp.responseText);
  var responseText = JSON.parse(xhttp.responseText);

  var studentDetails =document.getElementsByClassName(responseText[0].ID);
  console.log(studentDetails);
  for (var i = 0, len = studentDetails.length; i < len; i++) {
      studentDetails[i].readOnly = "true";
      studentDetails[i].onchange="updateSingleAjax(this)";
      if(studentDetails[i].getAttribute("name")== "Name"){
        studentDetails[i].value=responseText[0].Name;
        console.log("name");}
      else if(studentDetails[i].getAttribute("name")== "Address"){
          studentDetails[i].value=responseText[0].Address;
          console.log("Address");}
      else if(studentDetails[i].getAttribute("name")=="RollNo"){
          studentDetails[i].value=responseText[0].RollNo;
          console.log("roll");
        }
    }
}
function deleteStudentAjax(xhttp){

}

*/
/*function UpdateSingleJqueryAjax(studentInput){
  $("i").hide();
  var studentElements=$("."studentDetails.id);
console.log(studentdetails)


}*/



$(document).ready(function(){
  $("ul.pagination li.active a").trigger("click");
/*$("body").on("click", "i.fa.fa-pencil" ,function(){
  $("i").hide();

  var tickSymbol = $("<i></i>").attr({
                      "class":"fa fa-check",
                      "onclick":"updateStudentAjax(this)",
                      "id":"updateSingleTickSymbol",
                      "studentId":$(this).attr("studentId")
                    });
//  console.log(tickSymbol);
  $(this).before(tickSymbol);
  var crossSymbol= $("<i></i>").attr({
                      "class":"fa fa-times",
                      "onclick":"noChanges()",
                      "id":"noChangeCrossSymbol"
                    });
  $(this).after(crossSymbol);


  var studentId=$(this).attr("studentId");
  //console.log(studentId);
  $("."+studentId).each(function(){
    console.log($(this));
    //change readonly to false if not using modals
    $(this).attr({
      "readonly" : true,
      "onchange" : ""
    });
  });

});*/

});
/*
function noChanges(){
  $("i").show();
  $("#updateSingleTickSymbol").remove();
  $("#noChangeCrossSymbol").remove();
  $("table input").attr({"readonly":true});
}
*/
function updateStudentAjax(student){
  var field = "",value = "", url = "";

  var studentId = $(student).attr("studentId");
  console.log(studentId);
  var studentDetails = $("input.updateForm");
  console.log(studentDetails);
  $(studentDetails).each(function(){
    field = $(this).attr("Name");
    value = $(this).val();
    url = url +"&"+ field + "=" + value;
  });
  //ajax call
  $.get("updatestudent?"+url,function(data,status){
    console.log(data);
    console.log(status);
    var responseText=data[0];
    //var responseText=JSON.parse(data);
    console.log(responseText);

    var tickSymbol = '<i class=" fa fa-pencil " aria-hidden="true" id="'+responseText.ID+'" studentId="'+responseText.ID+'" onClick="editStudent(this)"></i>';
    var crossSymbol='<i class="fa fa-times" aria-hidden="true" studentId="'+responseText.ID+'" onClick="deleteStudentAjax(this)"></i>';
    studentDetails=$("#studentTableBody tr."+studentId);
    console.log(studentDetails);
    studentDetails.children().remove();
    studentDetails.append('<td>'+responseText.Name+
                              '</td><td>'+responseText.RollNo+
                              '</td><td>'+responseText.Address+
                              '</td><td>'+tickSymbol+crossSymbol+
                              '</td>');

  /*  studentDetails=$("input."+studentId);
    console.log(studentDetails);
    $(studentDetails).each(function(){
      if("Name" ==  $(this).attr("Name"))
        $(this).val(responseText.Name);
      if($(this).attr("Name") == "Address")
        $(this).val(responseText.Address);
      if($(this).attr("Name") ==  "RollNo")
        $(this).val(responseText.RollNo);
    noChanges();
      url = url +"&"+ field + "=" + value;
    });*/
  });
  $("#editStudentModal").modal("hide");
  }


function pagination(index){
  //$(".ajaxTable").remove();
  $.get(index, function(data,status){
    console.log(data);
    $("#studentTableBody").children().remove();
    for (i=0; i< data.studentsData.length; i++)
    {
      var tickSymbol = '<i class=" fa fa-pencil " aria-hidden="true" id="'+data.studentsData[i].ID+'" studentId="'+data.studentsData[i].ID+'" onClick="editStudent(this)"></i>';
      var crossSymbol='<i class="fa fa-times" aria-hidden="true" studentId="'+data.studentsData[i].ID+'" onClick="deleteStudentAjax(this)"></i>';

    $("#studentTableBody").append('<tr class='+data.studentsData[i].ID+'><td>'+data.studentsData[i].Name+
                              '</td><td>'+data.studentsData[i].RollNo+
                              '</td><td>'+data.studentsData[i].Address+
                              '</td><td>'+tickSymbol+crossSymbol+
                              '</td><tr>');

    console.log("v");
    }
    getPagination(data);
    //$("")
  });
}

function addStudent(id){
  //$("#addStudentForm").valid();
  console.log($("#addStudentForm"));
  var formId = $(id).attr("form");
  var url="",field="",url="";
  $("#addStudentForm input").each(function(){
    field = $(this).attr("Name");
    value = $(this).val();
    $(this).val('');
    url = url +"&"+ field + "=" + value;
  });
  $.get("addNewStudent?"+url,function(data,status){
    console.log(data);
    console.log(status);

  });
  $("#addStudent").modal("hide");
  pagination('/pagination?page=1&limit=5&sortBy=Name');

}
function editStudentold(id){
  console.log("input."+$(id).attr("studentId"));
console.log($("input."+$(id).attr("studentId")));
  var studentDetails = $("input."+$(id).attr("studentId"));
  var formElements = $("form#editStudentForm input[name='Name']");
  console.log(studentDetails.siblings('input[name="Address"]'));
  $("form#editStudentForm input[name='Name']").val("hie");
formElements.val("hi");
  var i=0;
  console.log(formElements);
  studentDetails.each(function(){
    //$(this).val(formElements[i].val());
    i++;
  });
  $("#editStudentModal").modal();

}
function editStudent(id){
  var studentId = $(id).attr("studentId");
  $.get("/getStudentDetails?studentId="+studentId,function(data, status){
    var studentDetails=data[0];
    console.log(studentDetails);
    $("form#editStudentForm input[name='Name']").val(studentDetails.Name);
    $("form#editStudentForm input[name='Address']").val(studentDetails.Address);
    $("form#editStudentForm input[name='RollNo']").val(studentDetails.RollNo);
    $("form#editStudentForm input[name='studentId']").val(studentId);

    $(":button#update").attr("studentId",studentId);
    console.log($(":button#update"));
  });
  $("#editStudentModal").modal();
}
function deleteStudentAjax(studentDetails){
  var url=window.location.href;
  var urlDecoded= new URL(url);
  var limit=urlDecoded.searchParams.get('limit')?urlDecoded.searchParams.get('limit'):"";
  var page=urlDecoded.searchParams.get('page')?urlDecoded.searchParams.get('page'):"";
  var studentId=studentDetails.getAttribute("studentid");
  $.get("/deleteStudent?limit"+limit+"&page="+page+"&studentId="+studentId, function(data, status){

  });
  $("ul.pagination li.active a").trigger('click');
//  window.location.href="/deleteStudent?limit"+limit+"&page="+page+"&studentId="+studentId;
}
function getPagination(data){
  $("ul.pagination").children().remove();
  if (data.currentPage-1 > 0){
    $("ul.pagination").append('<li><a href="javasript:void(0)" onclick="pagination(\' /pagination?page='+ (data.currentPage-1) +'&limit='+data.limit+'&sortBy='+data.sortBy+'\')">prev</a></li>');
  }
  var active="";
  for( i =( data.currentPage- 2);(i< (data.currentPage - - 3)) ; i++ ){
    if( i==data.currentPage ){
    active="active";
    }
    else active="";
    if(i>0 && i<=data.totalPages)
      $("ul.pagination").append('<li class='+active+'><a href="javasript:void(0)" onclick="pagination(\' /pagination?page='+ i +'&limit='+data.limit+'&sortBy='+data.sortBy+'\')">'+i+'</a></li>');
  }
  if( (data.currentPage - - 1) <= data.totalPages){
    $("ul.pagination").append('<li><a href="javasript:void(0)" onclick="pagination(\' /pagination?page='+ (data.currentPage - - 1) +'&limit='+data.limit+'&sortBy='+data.sortBy+'\')">next</a></li>');
  }

}
