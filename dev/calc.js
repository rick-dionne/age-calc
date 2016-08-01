var g_rate_cuts = ['21%','21%','21%','21%','21%','21%','21%','21%','21%','21%','21%','21%','21%','22%','22%','22%','22%','22%','23%','23%','23%','23%','23%','23%','24%','24%','24%','24%','24%','24%','25%','25%','25%','25%','25%','25%','25%','25%','25%','25%','26%','26%','26%','26%','26%','26%','26%','26%','26%','26%','27%','27%','27%','27%'];
var g_benefit_cuts = ['$96,826','$98,477','$100,151','$101,850','$103,338','$105,157','$106,973','$108,664','$110,754','$112,680','$114,993','$117,485','$120,111','$122,321','$125,872','$128,991','$131,950','$135,322','$138,519','$142,115','$145,492','$149,211','$152,642','$156,042','$159,804','$163,522','$166,499','$170,506','$174,233','$177,598','$180,961','$184,784','$188,262','$191,734','$195,261','$199,210','$202,712','$206,216','$210,182','$214,191','$217,325','$221,426','$224,637','$229,352','$233,658','$237,120','$241,641','$245,785','$250,036','$254,376','$259,343','$263,849','$268,450','$273,094'];

$(function() {
    $('#year_in').change(function() {
	$(this).blur();
    });
    $('#year_in').focusout(function() {
	displayResults();
    });
    $('#bad_input, .result').hide();
});

function displayResults() {
    try {
	$('.result, #bad_input').hide();
	var val = parseInt($('#year_in').val());
	if(isNaN(val) || val > 2020 || val < 1900)
	    val = '';
	$('#year_in').val(val);
	if (val === '') {
	    $('#bad_input').fadeIn();
	} else {
	    $('#top_res_num').html(' ' + (2034-val) + ' years old');
	    if (val < 1967) {
		$('#mid_res_text').html('Under current law, in 2034 your retirement benefits will be ');
		$('#mid_res_num').html(' cut by 21%');
		$('#top_result, #mid_result, #reform_ad').fadeIn();
	    } else {
		$('#mid_res_text').html('Under current law, your retirement benefits will be ');
		$('#mid_res_num').html(' ' + g_rate_cuts[val - 1967] + ' lower than scheduled.');
		$('#bot_res_num').html(' ' + g_benefit_cuts[val - 1967] + ' cut');
		$('.result').fadeIn();
	    }
	}
    } catch(ex) {
	console.log(ex);
    }
}
