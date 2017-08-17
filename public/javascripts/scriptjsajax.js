function updateSingle(studentInput){
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
}
function editStudent(studentDetails){
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
