function updateSingle(item){
  var url=window.location.href;
  var urlDecoded= new URL(url);
  var limit=urlDecoded.searchParams.get('limit')?urlDecoded.searchParams.get('limit'):"";
  var page=urlDecoded.searchParams.get('page')?urlDecoded.searchParams.get('page'):"";
  var studentId=item.getAttribute("studentId");
  item.setAttribute("form","submitForm");
  var studentDetails=document.getElementsByClassName(studentId);
  for ( i=0, len=studentDetails.length;i<len;i++) {
    studentDetails[i].setAttribute("form","submitForm");
  }
  var submitForm=document.getElementById("submitForm");
  var location=window.location='updatestudent'+window.location.search;
  submitForm.setAttribute("action",location);
  console.log(location);
  submitForm.submit(console.log(window.location='updatestudent'+window.location.search));
  console.log(window.location);
}
function editStudent(studentDetails){
  var y=document.getElementsByClassName(studentDetails.id);
  console.log(y);
    for (var i = 0, len = y.length; i < len; i++) {
        y[i].readOnly = "";
        y[i].onchange="";
      }
    var tickSymbol=document.createElement('i');
    tickSymbol.setAttribute("class","fa fa-check");
    tickSymbol.setAttribute("aria-hidden","true");
    tickSymbol.setAttribute("onclick","updateSingle(this)");
    tickSymbol.setAttribute("studentId",studentDetails.id);
    var symbols=studentDetails.parentNode.chidNodes;
    studentDetails.style.display="none";
    var z=studentDetails.nextElementSibling;
    console.log(z);
    z.setAttribute("onclick","window.location.reload()");
    studentDetails.parentNode.insertBefore(tickSymbol,studentDetails.parentNode.childNodes[0]);
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

}
