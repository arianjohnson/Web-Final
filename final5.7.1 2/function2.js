

    var seconds = 00; 
    var tens = 00; 
    var Interval ;
    var duration;
    var sec= 0.0;
    var appendTens = document.getElementById("tens")
    var appendSeconds = document.getElementById("seconds")
    var buttonStart = document.getElementById('button-start');
    var buttonStop = document.getElementById('button-stop');
    var buttonReset = document.getElementById('button-reset');


    function convertToTime(tens, seconds){
        console.log('Tens',tens);
        console.log('Seconds',seconds);
        sec = (tens * 0.01);
        console.log("Sec has : ",sec);
        duration = seconds + sec;
        alert(' Congratulations! You won! Your game finished within '+ duration)
    }

    buttonReset.onclick = function() {
       
    console.log(tens);
    console.log(seconds);

     clearInterval(Interval);  
      tens = "00";
        seconds = "00";
      appendTens.innerHTML = tens;
        appendSeconds.innerHTML = seconds;
        location.reload();
    }

window.onload = function () {

    clearInterval(Interval);
    Interval = setInterval(startTimer, 1000);
    // buttonStart.onclick = function() {
    //     clearInterval(Interval);
    //     Interval = setInterval(startTimer, 500);
       
    // }
    
    //   buttonStop.onclick = function() {
    //      clearInterval(Interval);
    // }
    
     
    
    function startTimer () {
      tens++; 
      
      if(tens < 9){
        appendTens.innerHTML = "0" + tens;
      }
      
      if (tens > 9){
        appendTens.innerHTML = tens;
        
      } 
      
      if (tens > 59) {
        console.log("seconds");
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
      }
      
      if (seconds > 9){
        appendSeconds.innerHTML = seconds;
      }
    
    }
    
  
  }


  

  $(document).ready(function() {
    var offsetValues = [];
    var id = 0;
    var ids;
    var currentList;
    var indexLength = [];
    var gridSize = 4;
    // change from 4 to 3 to change the number of columns
    // but still need to change the size of board at the same time


    $.fn.extend({

        startPuzzle: function(image, squareSize) {


            console.log("Square size is :->>", squareSize);
            console.log("image  is :->>", image);
            var gameObjectElement = '#' + $(this).attr('id');
            console.log("gameObjectElement", gameObjectElement);
            var sqSize = squareSize + 'px';
            console.log("sqSize:->>", sqSize);
            // var boardSize = (squareSize * 4) + 'px';
            // console.log("boardSize:->>", boardSize);

            $(gameObjectElement).html('<div id="board"></div>');

            $('#board').css({
                position: 'absolute',
                width: '76%',
                height: '38em',
                border: '1px solid red',
                left: '1em',
                top: '1em',
                bottom: '10em'




            });


            var gridSize = 4;
            var percentage = 100 / (gridSize - 1);
            $('#board ').append("<img id='image' src='images/taj-mahal.jpg' style='width:100%;height:100%'/>");

            setTimeout(function() {

                $('#board #image').css({

                    opacity: 0.4
                });

            }, 1000);
            for (var i = 0; i < gridSize * gridSize; i++) {

                // A dirty way to create an arbitrary DIV and append it into HTML dynamically
                // Notice each square uses the same image. It just uses a different x/y offset for each square
                $('#board').append("<li style='left: " + ((i % 4) * squareSize) + "%; top: " + Math.floor(i / 4) * squareSize + "%; width: " + squareSize + "%; height: " + squareSize + "%; background-position: " + (-(i % 4) * squareSize) + "% " + -Math.floor(i / 4) * squareSize + "% '></li>");


                // var offsetValues = $('#board li').offset();


            }

            setTimeout(function() {

                $('#board li').each(function() {
                    var position = $(this).position();
                    console.log("position", position);
                }); // console.log("offset value ", offsetValues);

                for (var i = 0; i < gridSize * gridSize; i++) {
                    var xpos = (percentage * (i % gridSize)) + '%';
                    console.log("xpos is", xpos);
                    console.log("ypos is ", ypos);
                    var ypos = (percentage * Math.floor(i / gridSize)) + '%';
                    var li = $('<li class="item" id="' + (i + 1) + '"data-value="' + (i) + '"></li>').css({
                        'background-image': 'url(' + image.src + ')',
                        'background-size': (gridSize * 100) + '%',
                        'background-position': xpos + ' ' + ypos,
                        'border': '1px solid red',
                        'width': 580 / gridSize,
                        'height': 580 / gridSize
                    });
                    if (i > 4) {
                        $('#pieceElement2').append(li);
                    } else {
                        $('#pieceElement').append(li)
                    }
                    // $('#pieceElement').append(li);

                }
                var piecElementSuffle = document.querySelector('#pieceElement');
                for (var i = piecElementSuffle.children.length; i >= 0; i--) {
                    piecElementSuffle.appendChild(piecElementSuffle.children[Math.random() * i | 0]);
                }
                var piecElementSuffle = document.querySelector('#pieceElement2');
                for (var i = piecElementSuffle.children.length; i >= 0; i--) {
                    piecElementSuffle.appendChild(piecElementSuffle.children[Math.random() * i | 0]);
                }




                $('#pieceElement').enableDrag('#pieceElement li');
                $('#pieceElement2').enableDrag('#pieceElement2 li');

            }, 1100);



        },

        enableDrag: function(element) {

            console.log("passed element in enable drag is  :-", element);
            $(element).draggable({

                helper: 'clone',
                revert: 'invalid',
                appendTo: 'body',
                opacity: 0.90



            });



            $('#board li').droppable({


                drop: function(event, ui) {


                    var dropid = $(ui.draggable).attr("id")
                    var currentId = $(event.target).index();
                    // indexLength.push($(event.target).index()) ;
                    console.log("indexlenght is:-", indexLength);

                    console.log("drop id", dropid);



                    console.log("$(event.target).index()", currentId);
                    console.log("$(element).get(0)+1", dropid);
                    if (currentId == dropid) {
                        $(ui.draggable).draggable('option', 'revert', false);
                        indexLength.push($(event.target).index());
                        console.log(indexLength.length, "==", gridSize * gridSize);
                        if (indexLength.length == gridSize * gridSize) {
                            console.log("puzzle completed");
                            convertToTime(tens, seconds);

                            setTimeout(function() {
                                $('#board li').hide();
                                $('#board img').fadeTo('slow', 0.5).fadeTo('slow', 1.0)
                            }, 500);


                        }

                        // if($('#pieceElement'))

                        $(ui.draggable).remove();
                        console.log("image droped on right place");
                        $(this).fadeTo('slow', 0.5).fadeTo('slow', 1.0);
                        $(ui.draggable).draggable({
                            disabled: true
                        });
                        $(this).append(ui.draggable);





                    } else {
                        $(ui.draggable).draggable('option', 'revert', true);

                    }



                    // if (isSorted(currentList)) {}


                }




            });

        }



    })


    //var image = 'img/tomBig.jpg';//document.getElementById('sourceImage');
    //var originalImage = image.getAttribute('src');
    var image = document.getElementById('sourceImage');









    $('#game_object').startPuzzle(image, 25);
    // if the columns are 4, then here should be 25
    // if the columns are 3, then here should be 33.333


});