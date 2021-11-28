$(document).ready(function(){
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

	$('.action_btn').on('click',function(){
	    let folderName = $(this).data('folder');
	    switch($(this).data('action')) {
	        case ALL_ACTIONS.DELETE:
                var data = JSON.stringify({ folderName: folderName, actionStatus: ALL_ACTIONS.DELETE})
                globalStreamer.postRequest('updateStatus', data, null);
                location.reload();
            break;
            case ALL_ACTIONS.UPDATE:
                console.log(ALL_ACTIONS.UPDATE);
            break;
            default:
                // code block
        }
	});

    $('.ready_upload h4 a').click(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).siblings('.editlist').slideUp();
        }
        else{
        $('.ready_upload h4 a').removeClass('active');
        $(this).addClass('active');
        $('.editlist').slideUp();
        $(this).siblings('.editlist').slideDown();
        }
    })

    $('.navi').click(function(){
        $('.sidenav').css('left','0%');
    });
    $('.closenav').click(function(){
        $('.sidenav').css('left','-100%');
    });

    $('.proBtn').click(function(){
        var folderName = $(this).data('folder');
        console.log(folderName);
        if(typeof folderName !== 'undefined' || folderName !== null){
            console.log(folderName);
            window.location.href = URLS.NETWORK+'?folder='+folderName;
        }else{
            alert('Folder you are trying to access doesn\'t exists.')
        }
        $(this).parent('.upload_btn').find('.progressBar').addClass('progress-row');
    });
});

var globalStreamer = (function () {

    function globalStreamer() {
        this.messageToShow = 'Failed message.';
    }

    globalStreamer.prototype = {
        postRequest: function(url, param, action){
            $.ajax({
                type : 'POST',
                url : url,
                contentType: 'application/json;charset=UTF-8',
                data : param,
                success: function(data){
                    console.log(data)
                    if(action != null){
                        if(data.status == ALL_RESPONSE_CODE.SUCCESS){
                            window.location.href = URLS.CALIBRATE+'?folder='+data.folder;
                        }
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("Status: " + textStatus); alert("Error: " + errorThrown);
                }
            });
        },
    };

    return new globalStreamer();
})();




