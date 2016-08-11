var g_rate_cuts = ['21%','21%','21%','21%','21%','21%','21%','21%','21%','21%','21%','21%','21%','22%','22%','22%','22%','22%','23%','23%','23%','23%','23%','23%','24%','24%','24%','24%','24%','24%','25%','25%','25%','25%','25%','25%','25%','25%','25%','25%','26%','26%','26%','26%','26%','26%','26%','26%','26%','26%','27%','27%','27%','27%'];
var g_benefit_cuts = ['$99,838','$101,057','$102,761','$104,011','$105,770','$107,373','$108,968','$110,686','$112,549','$114,936','$117,325','$119,353','$122,027','$124,298','$127,300','$129,865','$133,139','$135,929','$139,448','$142,748','$146,138','$149,542','$152,979','$156,385','$159,804','$163,165','$166,499','$169,838','$173,479','$176,830','$180,181','$183,594','$187,053','$190,505','$193,595','$197,518','$200,565','$204,472','$207,527','$211,497','$214,592','$218,652','$221,823','$225,558','$229,324','$233,214','$237,179','$241,261','$245,448','$250,206','$254,050','$259,013','$262,994','$267,555'];
var g_show_embed = false;

$(function() {
    $('#year_in').change(function() {
	$(this).blur();
    });
    $('#year_in').focusout(function() {
	displayResults();
    });
    $('#bad_input, .result, #embed_wrapper').hide();

    $('#facebook_link').on('click',function() {
	var h=400;
	var w=680;
	var y = window.outerHeight / 2 + window.screenY - (h / 2);
	var x = window.outerWidth / 2 + window.screenX - (w / 2);
	window.open(
	    'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent('http://crfb.org/blogs/interactive-how-old-will-you-be-when-social-security-goes-bust'),
	    'facebook-share-dialog','width='+w+',height='+h+',top='+y+',left='+x)
    });

    $('#embed_link').on('click',function() {
	if (g_show_embed) {
	    $('#embed_code').blur();
	    $('#embed_wrapper').fadeOut( 100 );
	    
	    g_show_embed = false;
	} else {
	    $('#embed_code').val('<iframe src="http://crfb.org/tools/ss-bust/" style="width: 100%; height: 635px; border: 0px"></iframe>');
	    $('#embed_wrapper').fadeIn( 100 );
	    $('#embed_code').select();
	    g_show_embed = true;
	}
    });
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
    	    prepareTweet(val);
	    $('#top_res_num').html(' ' + (2034-val) + ' years old');
	    if (val < 1967) {
		$('#mid_res_text').html('Unless the law is changed, your retirement benefits will be ');
		$('#mid_res_num').html('cut by 21% in 2034');
		$('#mid_res_end').html('');
		$('.ret-result').fadeIn();
	    } else {
		$('#mid_res_text').html('Under current law, your retirement benefits will be ');
		$('#mid_res_num').html('cut ' + g_rate_cuts[val - 1967]);
		$('#mid_res_end').html(' below what is scheduled.');
		$('#bot_res_num').html(g_benefit_cuts[val - 1967]+ ' cut');
		$('.result').fadeIn();
	    }
	}
    } catch(ex) {
	console.log(ex);
    }
}

function prepareTweet(val) {
    var text = encodeURI('Social Security will go bust when I turn '+(2034-val));
    if (val < 1967) {
	text += '%3B '+encodeURI('my benefits will be cut 21%. Find out your cut here:');
    } else {
	text += ' %26 '+encodeURI('I may lose ' + g_benefit_cuts[val-1967]+ '. See what you stand to lose here:');
    }
    var tweetlink = 'https://twitter.com/intent/tweet';
    tweetlink += '?text='+text;
    tweetlink += '&url='+encodeURI('http://crfb.org/blogs/interactive-how-old-will-you-be-when-social-security-goes-bust');
    tweetlink += '&via=BudgetHawks'
    $('#twitter_link').attr('href',tweetlink);
}
