var parseAPPID = "fXs9oo7uczK1tTpzt3UHul29zHun2WKI0SB8VsC4";
var parseJSID = "0cFkFVzhBTWLmjCop9vqS3SHioFB5GaH9oKeOHET";



//Initialize Parse
Parse.initialize(parseAPPID,parseJSID);

var NoteOb = Parse.Object.extend("Note");
//var NoteEditOb = Parse.Object.extend("NoteEdit");
var selectOne;
var itsName;
var itsText;
var itsImg;
var itsColors;


var askedColor;



$(document).on("pageshow", "#home", function(e, ui) {
               
               $.mobile.loading("show");
               
               var query = new Parse.Query(NoteOb);
               //query.limit(10);
               query.descending("createdAt");
               
               query.find({
                          success:function(results) {
                          $.mobile.loading("hide");
                          var s = "";
                          for(var i=0; i<results.length; i++) {
                          
                          results[i].set("name","Note"+(i+1));
                          results[i].save();
                          
                          //Lame - should be using a template
                          s += "<div class='allItems', id = '" + results[i].id + "'>";
                          s += "<h4>"+ results[i].get("name")+ " " + results[i].createdAt + "</h4>";
                          s += "<p>";
                          s +=  results[i].get("textNew").toString();
                          s += "</p>";
                          var pic = results[i].get("picture");
                          if(pic) {
                          s += "<img src='" + pic.url() + "'>";
                          }
                          var itsColors = results[i].get("colors");
                          if(itsColors){
                          s += "<br/><div id='"+results[i].id+"one-1', style='background-color:"+itsColors[0]+"' class='colorRect'></div>";
                          s += "<div id='"+results[i].id+"one-2', style='background-color:"+itsColors[1]+"' class='colorRect'></div>";
                          s += "<div id='"+results[i].id+"one-3', style='background-color:"+itsColors[2]+"' class='colorRect'></div>";
                          s += "<div id='"+results[i].id+"one-4', style='background-color:"+itsColors[3]+"' class='colorRect'></div>";
                          s += "<div id='"+results[i].id+"one-5', style='background-color:"+itsColors[4]+"' class='colorRect'></div>";}
                          
                          s += "</div>";
                          
                          }
                          $("#home div[data-role=content]").html(s);
                          
                          $(".allItems").unbind().click(function(e){
                                            e.preventDefault();
                                            selectOne = $(this).attr("id");
                                            console.log(selectOne + "clicked");
                                            $.mobile.changePage("#oneItem");
                                            //window.location.href = "#oneItem";
                                            console.log("let's go to the one item!!");
                                            //cleanUp();
                                            console.log("cleaned up");
                                            });
                          },error:function(e) {
                          $.mobile.loading("hide");
                          
                          }
                          });
               //////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
               $("#homeHa").unbind().click(function(e){
                               e.preventDefault();
                               $.mobile.changePage("#firstpage");
                               //window.location.href = "#firstpage";
                               console.log("home--firstpage function should run!!");
                               //cleanUp();
                               });
               //////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//               function cleanUp(){
//                $("#home div[data-role=content]").html("");
//               }
               });


$(document).on("pageshow", "#addNote", function(e, ui) {
               
               var imagedata = "";
               
               $("#saveNoteBtn").on("touchend", function(e) {
                                    e.preventDefault();
                                    $(this).attr("disabled","disabled").button("refresh");
                                    var noteText = $("#noteText").val();
                                    console.log("data" + imagedata);
                                    
                                    /*
                                     A bit complex - we have to handle an optional pic save
                                     */
                                    if(imagedata != "") {
                                    var parseFile = new Parse.File("mypic.jpg", {base64:imagedata});
                                    console.log(parseFile);
                                    parseFile.save().then(function() {
                                                          var note = new NoteOb();
                                                          note.addUnique("textNew",noteText);
                                                          note.set("picture",parseFile);
                                                          note.save(null, {
                                                                    success:function(ob) {
                                                                    $.mobile.changePage("#home");
                                                                    }, error:function(e) {
                                                                    console.log("Oh crap", e);
                                                                    }
                                                                    });
                                                          cleanUp();
                                                          }, function(error) {
                                                          console.log("Error");
                                                          console.log(error);
                                                          });
                                    
                                    } else {
                                    //alert("Take a picture please :)");
                                    var note = new NoteOb();
                                    note.addUnique("textNew",noteText);
                                    note.save(null, {
                                              success:function(ob) {
                                              $.mobile.changePage("#home");
                                              }, error:function(e) {
                                              console.log("Oh crap", e);
                                              }
                                              });
                                    cleanUp();
                                    
                                    }
                                    });
               
               $("#takePicBtn").unbind().click(function(e) {
                                   e.preventDefault();
                                   
                                   if (!navigator.camera) {
                                   alert("Camera API not supported", "Error");
                                   return;
                                   } else{
                                   navigator.camera.getPicture(gotPic, failHandler, {quality:50,
                                                               destinationType : Camera.DestinationType.DATA_URL,
                                                               sourceType : Camera.PictureSourceType.CAMERA,
                                                               saveToPhotoAlbum: false
                                                               });
                                   }
                                   });
               
               function gotPic(data) {
               // console.log('got here');
               imagedata = data;
               $("#takePicBtn").text("Picture Taken!").button("refresh");
               }
               
               function failHandler(e) {
               //               alert("ErrorFromC");
               //               alert(e);
               console.log(e.toString());
               }
               
               function cleanUp() {
               imagedata = "";
               $("#saveNoteBtn").removeAttr("disabled").button("refresh");
               $("#noteText").val("");
               $("#takePicBtn").text("Add Pic").button("refresh");
               }
               
               //////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
               $("#addNoteHa").unbind().click(function(e){
                                  cleanUp();
                                  e.preventDefault();
                                  window.location.href = "#firstpage";
                                  });
               //////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
               
               });



$(document).on("pageshow","#oneItem",function(e,ui){
               $.mobile.loading("show");
               console.log(selectOne);
               var c = "";
               var queryOne = new Parse.Query(NoteOb);
               queryOne.get(selectOne,{
                          success: function(note){
                          console.log(selectOne+"++");
                           itsName = note.get("name");
                           itsText = note.get("textNew").toString();
                           itsImg = note.get("picture");
                           itsColors = note.get("colors");
                            build();
                            $.mobile.loading("hide");
                          },
                          error: function(e){
                          $.mobile.loading("hide");
                          }
                          });
               function build(){
               
               $("#oneItemH").html(itsName);
               c += "<h1>Emotion</h1>";
               c += "<p>" + itsText + "</p>";
               if(itsImg){
               c += "<img src='" + itsImg.url() + "'>";
               }
               c += "<h1>Colors<h2>"
               if(itsColors){
               c += "<div id='one-1', style='background-color:"+itsColors[0]+"' class='colorRect'></div>";
               c += "<div id='one-2', style='background-color:"+itsColors[1]+"' class='colorRect'></div>";
               c += "<div id='one-3', style='background-color:"+itsColors[2]+"' class='colorRect'></div>";
               c += "<div id='one-4', style='background-color:"+itsColors[3]+"' class='colorRect'></div>";
               c += "<div id='one-5', style='background-color:"+itsColors[4]+"' class='colorRect'></div>";
               
               }else{
               c += "<div id='one-1', class='colorRect'></div>";
               c += "<div id='one-2', class='colorRect'></div>";
               c += "<div id='one-3', class='colorRect'></div>";
               c += "<div id='one-4', class='colorRect'></div>";
               c += "<div id='one-5', class='colorRect'></div>";
               }
               
               $("#content").html(c);
               
               }
               
               function clean(){
               c = "";
               selectOne = "";
               itsName = "";
               itsText = "";
               itsImg="";
               itsColors="";
               $("#content").html("");
               }
//               var oneItemTry = document.getElementById('oneItemHa');
//               oneItemTry.addEventListener('click',function(){
//                                           console.log("oneitem--back function should run!!");
//                                           $.mobile.changePage("#home");
//                                           clean();
//                                           },false);
               
               $("#oneItemHa").unbind().click(function(e){
                                  console.log("oneitem--back function should run!!");
                                  e.preventDefault();
                                  $.mobile.changePage("#home");
                                  //window.location.href = "#home";
                                  clean();
                                  });
               
               $("#goToEditing").unbind().click(function(e){
                                    console.log("oneitem--itemedit function should run!!");
                                    e.preventDefault();
                                    $.mobile.changePage("#itemEdit");
                                    //window.location.href = "#itemEdit";
                                    });
               $("#goBackToHome").unbind().click(function(e){
                                     console.log("oneitem-home function should run!!");
                                     e.preventDefault();
                                     $.mobile.changePage("#firstpage");
                                     //window.location.href = "#firstpage";
                                     clean();
                                     });

               
               });





$(document).on("pageshow","#itemEdit",function(e,ui){
               $.mobile.loading("show");
               var query2 = new Parse.Query(NoteOb);
               query2.get(selectOne,{
                          success: function(note){
                          var itsName = note.get("name");
                          var itsText = note.get("textNew").toString();
                          
                          $("#itemEditH").html(itsName+": Emotion");
                          $("#itemEditP").html("Results: " + itsText);
                          
                          

                          $("#saveTextsBtn").unbind().click(function(e){
                                                e.preventDefault();
                                                var noteText1;
                                                var allVals = [];
                                                //console.log("text update button clicked");
                                                
                                                
                                                var query4 = new Parse.Query(NoteOb);
                                                query4.get(selectOne,{
                                                           
                                                           success: function(noteUpdate){
                                                           //console.log("run updateTextArea");
                                                           $("#checkBoxEmo :checked").each(function(){
                                                                                           noteUpdate.addUnique("textNew",$(this).val());
                                                                                           allVals.push($(this).val());
                                                                                           noteUpdate.save();
                                                                                           });
                                                           
                                                           if($("#noteText1").val() != ""){
                                                           noteText1 = $("#noteText1").val();
                                                           noteUpdate.addUnique("textNew",noteText1);}
                                                           noteUpdate.save(null,{
                                                                           success:function(object){
                                                                           var itsTextUpdate;
                                                                           var query3 = new Parse.Query(NoteOb);
                                                                           query3.get(selectOne,{
                                                                                      success:function(noteNew){
                                                                                      itsTextUpdate = noteNew.get("textNew");
                                                                                      $("#itemEditP").html("Results: " + itsTextUpdate);
                                                                                      /////////////////////////////////////////////
                                                                                      $("#checkBoxEmo :checked").removeAttr("checked");
                                                                                      $(".checkBoxEmotions").attr("checked",false).checkboxradio("refresh");
                                                                                      $("#noteText1").val("");
                                                                                      /////////////////////////////////////////////
                                                                                      }
                                                                                      });
                                                                           
                                                                           //noteUpdate.save();
                                                                           },error:function(model,error){
                                                                           console.log("because of updating texts");
                                                                           }
                                                                           });
                                                           },error:function(model,error){
                                                           console.log("because of asking for updating texts");
                                                           }
                                                           
                                                           });
                                                });
                          /////////////////////////////////////////////////
                          $("#itemEditNextBtn").unbind().click(function(e){
                                                   console.log("itemedit-choosecolor function should run!!");
                                                   e.preventDefault();
                                                   window.location.href = "#chooseColors";
                                                   
                                                   
                                                   });
                          $("#itemEditH1A").unbind().click(function(e){
                                               console.log("itemedit--go back function should run!!");
                                               e.preventDefault();
                                               window.location.href = "#oneItem";
                                               });
                          
                          $.mobile.loading("hide");
                          },
                          error:function(e){
                          $.mobile.loading("hide");
                          },
                          
                          
                          });
               
               });


$(document).on("pageshow","#chooseColors",function(e,ui){
               $.mobile.loading("show");
               var query5 = new Parse.Query(NoteOb);
               query5.get(selectOne,{
                          success: function(note){
                          var itsName = note.get("name");
                          $("#chooseColorsH1").html(itsName + ": Colors");
                          var itsImg = note.get("picture");
                          var cn = "";
                          cn += "<script type='text/javascript' src='js/paper-full.js'></script>";
                          

                          cn += "<canvas id='Canvas' width=290  height=200></canvas>";
                          if(itsImg){
                          cn += "<img src='"+  itsImg.url()  +"' id='mona'  style='display:none'></img>";
                          cn  += "<script type='text/paperscript' canvas='Canvas' src='js/chooseColorPic.js'></script>";}
                          //
                          
                          //
                          $("#chooseColorsPicture").html(cn);
                          $.mobile.loading("hide");
                          },
                          error: function(e){
                          $.mobile.loading("hide");
                          }

                          });
               });


$(document).on("pageshow","#emotion",function(e,ui){
               CleanUpQuery8();
               $("#AskTextsBtn").unbind().click(function(e){
                                    e.preventDefault();
                                    $(this).attr("disabled","disabled").button("refresh");
                                    var askTextVal = $("#AsknoteText1").val();
                                    console.log($("#AsknoteText1").val());
                                    var query8 = new Parse.Query(NoteOb);
                                    query8.equalTo("textNew",askTextVal);
                                    query8.descending("createdAt");
                                    query8.find({
                                                success: function(results){
                                                $.mobile.loading("hide");
                                                var s = "";
                                                s += "<h4>" +askTextVal+"</h4>"
                                                if(results.length === 0){
                                                s += "<p> did not match any documents.</p>"
                                                }else{
                                                for(var i = 0; i<results.length;i++){
                                                s += "<div class='emotionPartItems', id = '" + results[i].id + "'>";
                                                s += "<h4>"+results[i].get("name")+" "+results[i].createdAt + "</h4>";
                                                s += "<p>";
                                                s +=  results[i].get("textNew").toString();
                                                s += "</p>";
                                                var pic = results[i].get("picture");
                                                if(pic) {
                                                s += "<img src='" + pic.url() + "'>";
                                                }
                                                var itsColors = results[i].get("colors");
                                                
                                                
                                                s += "<br/><div id='"+results[i].id+"-1', style='background-color:"+itsColors[0] +"' class='colorRect'></div>";
                                                
                                                s += "<div id='"+results[i].id+"-2', style='background-color:"+itsColors[1] +"' class='colorRect'></div>";
                                                
                                                s += "<div id='"+results[i].id+"-3', style='background-color:"+itsColors[2] +"' class='colorRect'></div>";
                                                
                                                s += "<div id='"+results[i].id+"-4', style='background-color:"+itsColors[3] +"' class='colorRect'></div>";
                                                
                                                s += "<div id='"+results[i].id+"-5', style='background-color:"+itsColors[4] +"' class='colorRect'></div>";
                                                s += "</div>";
                                                }
                                                }
                                                $("#emotion div[data-role=content]").html(s);

                                                $(".emotionPartItems").unbind().click(function(e){
                                                                          e.preventDefault();
                                                                          selectOne = $(this).attr("id");
                                                                          console.log(selectOne + "clicked");
                                                                          
                                                                          window.location.href = "#oneItem";
                                                                          //CleanUpQuery8();
                                                                          
                                                                          });
                                                
                                                },
                                                error: function(e){
                                                $.mobile.loading("hide");
                                                }
                                                
                                                });
                                    });
               $("#emotionSearchA").unbind().click(function(e){
                                       console.log("emotion search function should run!!");
                                       e.preventDefault();
                                       window.location.href = "#firstpage";
                                       CleanUpQuery8();
                                       });
               function CleanUpQuery8(){
               askTextVal="";
               $("#AskTextsBtn").removeAttr("disabled").button("refresh");
               selectOne = "";
               $("#AsknoteText1").val("");
               $("#emotion div[data-role=content]").html("");
               }
               });


$(document).on("pageshow","#color",function(e,ui){
               
               var RGBSlider2;
               var SLIDERR,
               SLIDERG,
               SLIDERB,
               rgb_color;
               
               //               $("#color_sliders").on("change",function(e){
               //                                      e.preventDefault();
               //                                      changeColorModeForSearch();
               //                                      $("#txt-hex-color-input").attr("disabled",ture);
               //                                      });
               
               
               //               $("#c-colorMode").change(function(){
               //                                                                       ColorSearchMode = $("#c-colorMode").val();
               //                                                                       //colorSearchselectBox = ColorSearchMode;
               //                                                                       console.log(ColorSearchMode);
               ////                                                                       if(ColorSearchMode === "RGB"){
               ////
               ////                                                                       }
               //                                                                       if(ColorSearchMode === "Hex"){
               //                                                                       var c = "";
               //                                        c += "<form>";
               //                                        c += "<b>Hex:#</b>";
               //                                        c += "<label for='text-1'>Search:</label>"
               //                                        c += "<input type='text' id='txt-hex-color-input' size='16' placeholder='ffffff'>";
               //                                        c += "<input type='submit' value='Search' id='btn-color' class='ui-btn ui-corner-all'>";
               //                                        c += "</form>";
               //                                                                       $("#color div[data-role=content]").html(c);
               //                                                                       }
               //                                                                       });
               changeColorModeForSearch();
               function changeColorModeForSearch(){
               $('#form-slider').change(function(){
                                        SLIDERR = document.getElementById('sliderR').value;
                                        SLIDERG = document.getElementById('sliderG').value;
                                        SLIDERB = document.getElementById('sliderB').value;
                                        RGBSlider2 = 'rgb(' + document.getElementById('sliderR').value + ',' + document.getElementById('sliderG').value + ',' + document.getElementById('sliderB').value + ')';
                                        
                                        var r_color = SLIDERR;
                                        var g_color = SLIDERG;
                                        var b_color = SLIDERB;
                                        rgb_color = RGBSlider2;
                                        
                                        $('#sliderR').change(function() {
                                                             $('#selectColor').css("background-color",rgb_color);
                                                             
                                                             });
                                        
                                        
                                        $('#sliderG').change(function() {
                                                             $('#selectColor').css("background-color",rgb_color);
                                                             });
                                        
                                        $('#sliderB').change(function() {
                                                             $('#selectColor').css("background-color",rgb_color);
                                                             });
                                        });
               }
               $("#btn-color").unbind().click(function(e){
                                  console.log("color search function should run!!");
                                  e.preventDefault();
                                  askedColor = rgb_color;
                                  console.log(askedColor);
                                  window.location.href = "#colorResults";
                                  });
               $("#colorAback").unbind().click(function(e){
                                   console.log("colorsearch--go back function should run!!");
                                   document.getElementById('sliderR').value = 0;
                                   document.getElementById('sliderG').value = 255;
                                   document.getElementById('sliderB').value = 0;
                                   var showcolor = "rgb(0,255,0)";
                                   $('#selectColor').css("background-color",showcolor);
                                   $('#sliderR').slider('refresh');
                                   $('#sliderG').slider('refresh');
                                   $('#sliderB').slider('refresh');
                                   
                                   });
               });



$(document).on("pageshow","#colorResults",function(e,ui){
               $.mobile.loading("show");
               var askedRGB = askedColor.substr(4);
               var splitaskZ = askedRGB.split(')');
               var splitask = splitaskZ[0].split(',');
               var R_A = parseInt(splitask[0],10);
               var G_A = parseInt(splitask[1],10);
               var B_A = parseInt(splitask[2],10);
               var x = parseInt(50,10);
               var stringOfId = [];
               console.log(R_A + " " + G_A + " " + B_A);
               
               
               var query10 = new Parse.Query(NoteOb);
               query10.find({
                            success:function(note) {
                            console.log("go into query");
                            for(var i = 0;i<note.length;i++){
                            if(note[i].get("colors")){
                            stringOfId.push(note[i].id);
                            }
                            }
                            console.log(stringOfId);
                            
                            for(var i = 0; i<stringOfId.length;i++){
                            var IDforQuery = stringOfId[i];
                            //var IDforQuery =  "8I6fTgRGt5";
                            var query11 = new Parse.Query(NoteOb);
                            query11.get(IDforQuery,{
                                        success:function(noteOne) {
                                        var stringofRight = [];
                                        var searchColorsFrom = noteOne.get("colors");
                                        for(var s = 0; s<searchColorsFrom.length;s++){
                                        var rgbValueWhole = searchColorsFrom[s];
                                        console.log("go into two for");
                                        console.log(rgbValueWhole);
                                        var rgbValue = rgbValueWhole.substr(4);
                                        var splitZ = rgbValue.split(')');
                                        console.log(splitZ);
                                        var split = splitZ[0].split(',');
                                        var R = parseInt(split[0],10);
                                        var G = parseInt(split[1],10);
                                        var B = parseInt(split[2],10);
                                        if(R<R_A+x && R>R_A-x){
                                        if(G<G_A+x && G>G_A-x){
                                        if(B<B_A+x && B>B_A-x){
                                        console.log(R+","+G+","+B+" && "+R_A+","+G_A+","+B_A);
                                        stringofRight.push(searchColorsFrom[s]);
                                        }
                                        }
                                        }
                                        }
                                        if(stringofRight){
                                        noteOne.set("matchcolor",stringofRight);
                                        noteOne.save();}
                                        
                                        
                                        var query12 = new Parse.Query(NoteOb);
                                        query12.descending("createdAt");
                                        query12.exists("matchcolor");
                                        query12.find({
                                                     success: function(results) {
                                                     var s="";
                                                     s += "<h4>" +askedColor+"</h4>";
                                                     s += "<div id='selectColor' style='background-color:"+ askedColor +"'></div>";
                                                     if(results.length === 0){
                                                     s += "<p> did not match any documents.</p>";
                                                     }else{
                                                     for(var i = 0;i<results.length;i++){
                                                     var colorarray = results[i].get("matchcolor");
                                                     if(colorarray[0]){
                                                     s += "<div class='colorPartItems', id = '" + results[i].id + "'>";
                                                     s += "<h4>"+results[i].get("name")+" "+results[i].createdAt + "</h4>";
                                                     s += "<p>";
                                                     s +=  results[i].get("textNew").toString();
                                                     s += "</p>";
                                                     var pic = results[i].get("picture");
                                                     if(pic) {
                                                     s += "<img src='" + pic.url() + "'>";
                                                     }
                                                     
                                                     
                                                     s += "<div class='selectColor' style='background-color:"+ colorarray[0] +"'></div>";
                                                     if(colorarray[1]){
                                                     s += "<div class='selectColor' style='background-color:"+ colorarray[1] +"'></div>";
                                                     }
                                                     if(colorarray[2]){
                                                     s += "<div class='selectColor' style='background-color:"+ colorarray[2] +"'></div>";
                                                     }
                                                     if(colorarray[3]){
                                                     s += "<div class='selectColor' style='background-color:"+ colorarray[3] +"'></div>";
                                                     }
                                                     if(colorarray[4]){
                                                     s += "<div class='selectColor' style='background-color:"+ colorarray[4] +"'></div>";
                                                     }
                                                     
                                                     var itsColors = results[i].get("colors");
                                                     if(itsColors){
                                                     
                                                     s += "<div id='"+results[i].id+"-11', style='background-color:"+itsColors[0] +"' class='colorRect'></div>";
                                                     s += "<div id='"+results[i].id+"-22', style='background-color:"+itsColors[1] +"' class='colorRect'></div>";
                                                     s += "<div id='"+results[i].id+"-33', style='background-color:"+itsColors[2] +"' class='colorRect'></div>";
                                                     s += "<div id='"+results[i].id+"-44', style='background-color:"+itsColors[3] +"' class='colorRect'></div>";
                                                     s += "<div id='"+results[i].id+"-55', style='background-color:"+itsColors[4] +"' class='colorRect'></div>";
                                                     }
                                                     s += "</div>"
                                                     }
                                                     }
                                                     
                                                     }
                                                     $("#colorResults div[data-role=content]").html(s);
                                                     $.mobile.loading("hide");
                                                     },error:function(e){
                                                     
                                                     }
                                                     
                                                     
                                                     });
                                        
                                        
                                        },error:function(e){
                                        console.log("noteOne query mistakes");
                                        }
                                        });
                            
                            }
                            },error:function(e) {
                            $.mobile.loading("hide");
                            
                            }
                            });

               });


