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
  var studentElements = document.getElementsByClassName(studentDetails.id);
  for (var i = 0, len = studentElements.length; i < len; i++) {
    studentElements[i].readOnly = "";
    studentElements[i].onchange="";
  }

  // asdasd
  studentDetails.style.display="none";
  studentDetails.nextElementSibling.setAttribute("onclick", "window.location.reload()");

  var tickSymbol = document.createElement('i');
  tickSymbol.setAttribute("class", "fa fa-check");
  tickSymbol.setAttribute("aria-hidden", "true");
  tickSymbol.setAttribute("onclick", "updateSingle(this)");
  tickSymbol.setAttribute("studentId", studentDetails.id);
  studentDetails.parentNode.insertBefore(tickSymbol, studentDetails.parentNode.chidNodes[0]);
}
function deleteStudent(studentDetails){
  var url=window.location.href;
  var urlDecoded= new URL(url);
  var limit=urlDecoded.searchParams.get('limit')?urlDecoded.searchParams.get('limit'):"";
  var page=urlDecoded.searchParams.get('page')?urlDecoded.searchParams.get('page'):"";
  var studentId=studentDetails.getAttribute("studentid");
  window.location.href="/deleteStudent?limit"+limit+"&page="+page+"&studentId="+studentId;
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
