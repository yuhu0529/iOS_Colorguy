
console.log("inside the function");
var colorR;
var colorG;
var colorB;
var rgb1;
var RGBdiv1;
var RGBdiv2;
var RGBdiv3;
var RGBdiv4;
var RGBdiv5;
var thecolorMode;
var url = "js/index.js";
$.getScript(url,function(){
 //           console.log("load the index js");
console.log("NoteOb " + NoteOb);
            $("#choosecolorseditSubmit").unbind().click(function(e){
                                            e.preventDefault();
                                            var query7 = new Parse.Query(NoteOb);
                                            query7.get(selectOne,{
                                                       success: function(note){
                                                       $.mobile.loading("show");
                                                       if(RGBdiv1){
                                                       note.addUnique("colors",RGBdiv1);}
                                                       if(RGBdiv2){
                                                       note.addUnique("colors",RGBdiv2);}
                                                       if(RGBdiv3){
                                                       note.addUnique("colors",RGBdiv3);}
                                                       if(RGBdiv4){
                                                       note.addUnique("colors",RGBdiv4);}
                                                       if(RGBdiv5){
                                                       note.addUnique("colors",RGBdiv5);}
                                                       note.save();
                                                       //CleanUpRGBData();
                                                       
                                                       
                                                       },
                                                       error: function(e){
                                                       $.mobile.loading("hide");
                                                       }
                                                       });
                                            window.location.href = "#oneItem";
                                            function CleanUpRGBData(){
                                            $('#chooseOne').css("background-color","");
                                            $('#chooseTwo').css("background-color","");
                                            $('#chooseThree').css("background-color","");
                                            $('#chooseFour').css("background-color","");
                                            $('#chooseFive').css("background-color","");
                                            rgb1="";
                                            colorR="";
                                            colorG="";
                                            colorB="";
                                            thecolorMode="";
                                            $('#colorR').html("R:"+ colorR);
                                            
                                            $('#colorG').html("G:"+colorG);
                                            $('#colorB').html("B:"+colorB);
                                            
                                            $('#changingColorHere').css("background-color",rgb1);
                                            }
                                            CleanUpRGBData();
                                            });
            
            $("#chooseColorHa").unbind().click(function(e){
                                   e.preventDefault();
                                   window.location.href = "#itemEdit";
                                   function CleanUpRGBData(){
                                   $('#chooseOne').css("background-color","");
                                   $('#chooseTwo').css("background-color","");
                                   $('#chooseThree').css("background-color","");
                                   $('#chooseFour').css("background-color","");
                                   $('#chooseFive').css("background-color","");
                                   rgb1="";
                                   colorR="";
                                   colorG="";
                                   colorB="";
                                   thecolorMode="";
                                   $('#colorR').html("R:"+ colorR);
                                   
                                   $('#colorG').html("G:"+colorG);
                                   $('#colorB').html("B:"+colorB);
                                   
                                   $('#changingColorHere').css("background-color",rgb1);
                                   }
                                   CleanUpRGBData();
                                   });
            
            });



// Create a raster item using the image tag with id='mona'
var raster = new Raster('mona');

// Move the raster to the center of the view
//raster.source = $;
raster.position.x = 145;
raster.position.y = 200;
console.log(raster.position);
//    raster.scale(1);
//raster.position.y +=5;
//raster.rotate(180);

raster.on('load',function(){
          raster.size = new Size(290,400);
          });

var path = new Path.Rectangle({
                              center: [145, 5],
                              size:[290,10],
                              strokeColor:'white',
                              });

//    $("#s-colorMode").click(function(){
//
//             thecolorMode = $("#s-colorMode").val();
//             console.log(thecolorMode);
//             });
function onMouseDown(event) {
    
    //console.log('Hello I am here!!!');
    // Set the fill color of the path to the average color
    // of the raster at the position of the mouse:
    path.fillColor = raster.getAverageColor(event.point);
    rgb1 = 'rgb(' + Math.floor(path.fillColor._components[0] * 255) + ',' + Math.floor(path.fillColor._components[1] * 255) + ',' + Math.floor(path.fillColor._components[2] * 255) + ')';
    thecolorMode = $("#s-colorMode").val();
    if(thecolorMode === "RGB"){
        colorR = (path.fillColor._components[0] * 255).toFixed(0);
        colorG = (path.fillColor._components[1] * 255).toFixed(0);
        colorB = (path.fillColor._components[2] * 255).toFixed(0);
        
        //var contents = $('#colorR');
        $('#colorR').html("R:"+ colorR);
        $('#colorG').html("G:"+colorG);
        $('#colorB').html("B:"+colorB);
    }
    if(thecolorMode === "CMYK"){
        colorR = ((1-(((path.fillColor._components[0] * 255).toFixed(0))/255))*100).toFixed(0);
        colorG = ((1-(((path.fillColor._components[1] * 255).toFixed(0))/255))*100).toFixed(0);
        colorB = ((1-(((path.fillColor._components[2] * 255).toFixed(0))/255))*100).toFixed(0);
        
        $('#colorR').html("C:"+colorR+"%");
        $('#colorG').html("M:"+colorG+"%");
        $('#colorB').html("Y:"+colorB+"%");
    }
    if(thecolorMode === "HSL"){
        var _R = ((path.fillColor._components[0] * 255).toFixed(0))/255;
        var _G = ((path.fillColor._components[1] * 255).toFixed(0))/255;
        var _B = ((path.fillColor._components[2] * 255).toFixed(0))/255;
        var _Min = Math.min(_R,_G,_B);
        var _Max = Math.max(_R,_G,_B);
        var del_Max = _Max - _Min;
        
        colorB = (((_Max + _Min)/2)*100).toFixed(0);
        if(del_Max === 0){
            colorR = 0;
            colorG = 0;
        }else{
            if(colorB<0.5){
                colorG = ((del_Max/(_Max+_Min))*100).toFixed(0);
            }else{
                colorG = ((del_Max/(2 - _Max -_Min))*100).toFixed(0);
            }
            var del_R = ( ( ( _Max - _R ) / 6 ) + ( del_Max / 2 ) )/_Max;
            var del_G = ( ( ( _Max - _G ) / 6 ) + ( del_Max / 2 ) ) / del_Max;
            var del_B = ( ( ( _Max - _B ) / 6 ) + ( del_Max / 2 ) ) / del_Max;
            if(_R === _Max){
                colorR = del_B - del_G;
            }else if ( _G === _Max ){
                colorR = ( 1 / 3 ) + del_R - del_B;
            }else if ( _B === _Max ){
                colorR = ( 2 / 3 ) + del_G - del_R;
            }
            if ( colorR < 0 ) {colorR += 1;}
            if ( colorR > 1 ) {colorR -= 1;}
            
        }
        $('#colorR').html("H:"+(colorR*360).toFixed(0));
        $('#colorG').html("S:"+colorG + "%");
        $('#colorB').html("L:"+colorB + "%");
    }
    if(thecolorMode === "HSV"){
        var _R = ( ((path.fillColor._components[0] * 255).toFixed(0)) / 255 ) ;                    //RGB from 0 to 255
        var _G = ( ((path.fillColor._components[1] * 255).toFixed(0)) / 255 ) ;
        var _B = ( ((path.fillColor._components[2] * 255).toFixed(0)) / 255 ) ;
        
        var _Min = Math.min( _R, _G, _B );    //Min. value of RGB
        var _Max = Math.max( _R, _G, _B );    //Max. value of RGB
        var del_Max = _Max - _Min ;            //Delta RGB value
        
        colorB = (_Max*100).toFixed(0);
        
        if ( del_Max === 0 )                     //This is a gray, no chroma...
        {
            colorR = 0;                               //HSV results from 0 to 1
            colorG = 0;
        }
        else                                    //Chromatic data...
        {
            colorG = ((del_Max / _Max)*100).toFixed(0);
            
            var del_R = ( ( ( _Max - _R ) / 6 ) + ( del_Max / 2 ) ) / del_Max;
            var del_G = ( ( ( _Max - _G ) / 6 ) + ( del_Max / 2 ) ) / del_Max;
            var del_B = ( ( ( _Max - _B ) / 6 ) + ( del_Max / 2 ) ) / del_Max;
            
            if      ( _R === _Max ) {colorR = del_B - del_G;}
            else if ( _G === _Max ) {colorR = ( 1 / 3 ) + del_R - del_B;}
            else if ( _B === _Max ) {colorR = ( 2 / 3 ) + del_G - del_R;}
            
            if ( colorR < 0 ){ colorR += 1;}
            if ( colorR > 1 ){ colorR -= 1;}
        }
        $('#colorR').html("H:"+(colorR*360).toFixed(0));
        $('#colorG').html("S:"+colorG + "%");
        $('#colorB').html("V:"+colorB + "%");
    }
    if(thecolorMode === "Hex"){
        colorR = (path.fillColor._components[0] * 255).toFixed(0);
        colorG = (path.fillColor._components[1] * 255).toFixed(0);
        colorB = (path.fillColor._components[2] * 255).toFixed(0);
        
        var x = (Math.floor(colorR/16)).toString(16);
        var y = (colorR - (Math.floor(colorR/16))*16).toString(16);
        var _x =(Math.floor(colorG/16)).toString(16);
        var _y =(colorG - (Math.floor(colorG/16))*16).toString(16);
        var xx =(Math.floor(colorB/16)).toString(16);
        var yy =(colorB - (Math.floor(colorB/16))*16).toString(16);
        
        $('#colorR').html("<br/>");
        $('#colorG').html("#"+x+y+_x+_y+xx+yy);
        $('#colorB').html("");
    }
    
    $('#changingColorHere').css("background-color",rgb1);
    
}

$('#chooseOne').click(function(){
                      $(this).css("background-color",rgb1);
                      RGBdiv1 = rgb1;
                      console.log(RGBdiv1);
                      });
$('#chooseTwo').click(function(){
                      $(this).css("background-color",rgb1);
                      RGBdiv2 = rgb1;
                      console.log(RGBdiv2);
                      });
$('#chooseThree').click(function(){
                        $(this).css("background-color",rgb1);
                        RGBdiv3 = rgb1;
                        console.log(RGBdiv3);
                        });
$('#chooseFour').click(function(){
                       $(this).css("background-color",rgb1);
                       RGBdiv4 = rgb1;
                       console.log(RGBdiv4);
                       });
$('#chooseFive').click(function(){
                       $(this).css("background-color",rgb1);
                       RGBdiv5 = rgb1;
                       console.log(RGBdiv5);
                       });

