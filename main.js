img="";
status="";
objects=[];

function preload(){
    img = loadImage("dog_cat.jpg");

}

function setup(){

    canvas = createCanvas(380,380);
    canvas.center();

    objectDetector= ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML  ="Status: Detecting Objects";
    
}

function draw(){

    image(img,0,0,600,400);
    /*

    fill('red');
    textSize(30);
    text('Dog',45,75);
    stroke('red');
    noFill();
    rect(30,50,350,300);


    fill('red');
    textSize(30);
    text('Cat',325,55);
    stroke('blue');
    noFill();
    rect(280,70,250,317);
*/
if(status!=""){
    for(i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML = "Status : Objects Detected";
        

        obj_x = objects[i].x;
        obj_y = objects[i].y;
        obj_width = objects[i].width;
        obj_height = objects[i].height;
        obj_label = objects[i].label;
        obj_confidence = objects[i].confidence;

        obj_percent = floor(obj_confidence*100);
        fill('red')
        textSize(26);
        text(obj_label+" : "+obj_percent+" % ",obj_x+15,obj_y+35);
        noFill();
        stroke('blue');
        rect(obj_x,obj_y,obj_width,obj_height);

    }
}
    }


   function modelLoaded(){
    console.log('modelLoaded');
    status = true;

    objectDetector.detect(img,gotResult);
   }

   function gotResult(error,results){

    if(error){
        console.log(error);
    }

    else{
        console.log(results);
        objects = results;
    }

   }