$(document).ready(function(){
	var addScore = document.getElementById('addScoreOne');
    var addScoreTwo = document.getElementById('addScoreTwo');
    var addValueOneInput = document.getElementById('addValueOneInput');
    var addValueTwoInput = document.getElementById('addValueTwoInput');

    $(addValueOneInput).on('change',function(){
        let addVal = parseInt($(this).val()) || 0;
        $('#addValueOne').val(addVal);
    });
    $(addValueTwoInput).on("change", function() {
        let subVal = parseInt($(this).val()) || 0;
        $('#addValueTwo').val(subVal);
    });

    $(addScore).on("click", function() {
        console.log('a');
        let addVal = parseInt($('#addValueOne').val()) || 0;
        addVal = addVal+1;
        $('#addValueOneInput').val(addVal);
        $('#addValueOne').val(addVal);
    });
    $(addScoreTwo).on("click", function() {
        console.log('b');
        let subVal = parseInt($('#addValueTwo').val()) || 0;
        subVal = subVal+1;
        $('#addValueTwo').val(subVal);
        $('#addValueTwoInput').val(subVal);
    });
});

var editDetail = (function () {
    function editDetail() {
        this.messageToShow = 'Failed message.';
    }
    editDetail.prototype = {
    };
    return new editDetail();
})();




