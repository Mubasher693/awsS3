$(document).ready(function(){
	const timer = document.querySelector('#timer');
    const start_btn = document.querySelector('.ripple_btn');
    const pause_btn = document.querySelector('#pause_btn');
    const reset_btn = document.querySelector('#reset_btn');
	timer.innerHTML = '00:00:00';

    var slide = document.getElementById('brightnessRange');
    $(slide).on("input change", function() {
        // XMLHttpRequest
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // alert(xhr.responseText);
        }
        }
        xhr.open("POST", "/brightness_update");
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify({ brightness:  this.value}));
    });
    // var slide = document.getElementById('brightnessRange');
    // $(slide).on("input change", function() {
    //     var data = JSON.stringify({ brightness:  this.value})
    //     globalStreamer.postRequest('brightness_update', data, null);
    // });

	$('#recordingBtn').on('click', function(e){
        $runningStatus = $(this).data("runningStatus")

        if($runningStatus){
            stream.showTime();
        }else{
            if(!$(this).hasClass("green")){
                $(this).attr("class", "");
                $(this).attr("class", "capture ripple_btn unclickable green");
            }else{
                $(this).attr("class", "");
                $(this).attr("class", "capture ripple_btn unclickable red");
            }
            stream.pause();
        }

        var data = JSON.stringify({ status: "true" })
        globalStreamer.postRequest('record_status', data, null);

        setTimeout(function(){
            $('.ripple_btn').removeClass('unclickable');
        }, 6000);

	});

});

var stream = (function () {

    function toHHMMSS(time) {
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time - hours * 3600) / 60);
        let seconds = time - hours * 3600 - minutes * 60;

        hours = `${hours}`.padStart(2, '0');
        minutes = `${minutes}`.padStart(2, '0');
        seconds = `${seconds}`.padStart(2, '0');

        return hours + ':' + minutes + ':' + seconds;
    }

    function stream() {
        this.messageToShow = 'Failed message.';
    }

    let time = 0,interval;

    stream.prototype = {
        showTime: function() {
            time += 1;
            timer.innerHTML = toHHMMSS(time);
        },

        start: function() {
          interval = setInterval(this.showTime, 1000);

        },

        pause: function() {
          if (interval) {
            clearInterval(interval);
            interval = null;
            timer.innerHTML = '00:00:00';
            time = 0;

          } else {
            interval = setInterval(this.showTime, 1000);

          }
        },

        reset: function() {
          clearInterval(interval);
          interval = null;

          time = 0;
          timer.innerHTML = '00:00:00';

        },
    };

    return new stream();
})();




