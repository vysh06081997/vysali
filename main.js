console.log("this file has loaded");
$.ajax({
  type:"GET",
  url:"https://api.myjson.com/bins/tls49",
  datatype:"json",
  success:function(response){
    //console.log("data from server",response);
    var data=formobject(response);
    constructDOM(data);
},
error:function(err){
  console.log("error in GET method",err);
  }
});
function formobject(response){
  var flag=[],categoryObject=[];
  var length=response.length;

  for(var i=0;i<length;i++){
    var movie=response[i];
    var index=flag.indexOf(movie.language);
    if(index>=0){
      categoryObject[index].movies.push(movie);
      continue;
    }
    else{
      flag.push(movie.language);
    }

    var objectSchema={
      "category":movie.language,
      "movies":[]
    }
    objectSchema.movies.push(movie);
    categoryObject.push(objectSchema);
    console.log("categoryObject",categoryObject);

  }
  console.log(flag);
  return categoryObject;

  //console.log("formobject response",response);
}
function constructDOM(data){
  var categoryContent=[];
  for(var i=0;i<data.length;i++){
    var objectSchema=data[i];

    console.log("constructDOM data",objectSchema);
    var categoryTitle=$('<h3 class="categoryName">'+objectSchema.category+'</h3>');
    categoryContent.push(categoryTitle);

}
    $('section.content').html(categoryContent);

}
