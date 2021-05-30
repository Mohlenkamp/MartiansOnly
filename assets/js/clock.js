// This code was directly imported from the terrific work by James Tauber
// on his GitHub pages site: http://jtauber.github.io/mars-clock/
// who in turn got most/all of his calculations from the  Formulae from
//  Allison, M., and M. McEwen 2000. "http://pubs.giss.nasa.gov/abs/al05000n.html"
// and the Mars24 project on NASA GISS page. BTW, his clock is still running 
// at the Air and Space Musuem in Washington DC


function cos(deg) {
    return Math.cos(deg * Math.PI / 180);
}
function sin(deg) {
    return Math.sin(deg * Math.PI / 180);
}
function h_to_hms(h) {
    var x = h * 3600;
    var hh = Math.floor(x / 3600);
    if (hh < 10) hh = "0" + hh;
    var y = x % 3600;
    var mm = Math.floor(y / 60);
    if (mm < 10) mm = "0" + mm;
    var ss = Math.round(y % 60);
    if (ss < 10) ss = "0" + ss;
    return hh + ":" + mm + ":" + ss;
}
function add_commas(n) {
    n += "";
    var x = n.split(".");
    var x1 = x[0];
    var x2 = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + "," + "$2");
    }
    return x1 + x2;
}
function within_24(n) {
    if (n < 0) {
        n += 24;
    } else if (n >= 24) {
        n -= 24;
    }
    return n;
}
function update() {
    var input_date = $(".custom-datetime").val();
    if (input_date) {
        // Slightly evil but mostly functional date parsing from human input.
        // Works reasonably well in most browsers :)
        var d = new Date(input_date);
    } else {
        var d = new Date();
    }

    if (d.getTime()) {
        $(".manual-input-invalid").hide();
        $(".date-conversion-results").show();
    } else {
        $(".manual-input-invalid").show();
        $(".date-conversion-results").hide();
    }

    $(".utc-time").text(d.toUTCString());
    var millis = d.getTime();
    var jd_ut = 2440587.5 + (millis / 8.64E7);
    var jd_tt = jd_ut + (tai_offset + 32.184) / 86400;
    var j2000 = jd_tt - 2451545.0;
    var m = (19.3870 + 0.52402075 * j2000) % 360;
    var alpha_fms = (270.3863 + 0.52403840 * j2000) % 360;
    var e = (0.09340 + 2.477E-9 * j2000);
    var pbs =
        0.0071 * cos((0.985626 * j2000 /  2.2353) +  49.409) +
        0.0057 * cos((0.985626 * j2000 /  2.7543) + 168.173) +
        0.0039 * cos((0.985626 * j2000 /  1.1177) + 191.837) +
        0.0037 * cos((0.985626 * j2000 / 15.7866) +  21.736) +
        0.0021 * cos((0.985626 * j2000 /  2.1354) +  15.704) +
        0.0020 * cos((0.985626 * j2000 /  2.4694) +  95.528) +
        0.0018 * cos((0.985626 * j2000 / 32.8493) +  49.095);
    var nu_m = (10.691 + 3.0E-7 * j2000) * sin(m) +
        0.623 * sin(2 * m) +
        0.050 * sin(3 * m) +
        0.005 * sin(4 * m) +
        0.0005 * sin(5 * m) +
        pbs;
    var nu = nu_m + m;
    var l_s = (alpha_fms + nu_m) % 360;
    var eot = 2.861 * sin(2 * l_s) - 0.071 * sin(4 * l_s) + 0.002 * sin(6 * l_s) - nu_m;
    var eot_h = eot * 24 / 360;
    var msd = (((j2000 - 4.5) / 1.027491252) + 44796.0 - 0.00096);
    var mtc = (24 * msd) % 24;

    var curiosity_lambda = 360 - 137.4;
    var curiosity_sol = Math.floor(msd - curiosity_lambda / 360) - 49268;
    var curiosity_lmst = within_24(mtc - curiosity_lambda * 24 / 360);
    var curiosity_ltst = within_24(curiosity_lmst + eot * 24 / 360);

    var opportunity_sol_date = msd - 46235 - 0.042431;
    var opportunity_sol = Math.floor(opportunity_sol_date);
    var opportunity_mission = (24 * opportunity_sol_date) % 24;
    var opportunity_ltst = within_24(opportunity_mission + eot * 24 / 360);

    $(".millis").text(add_commas(millis));
    $(".jd_ut").text(add_commas(jd_ut.toFixed(5)));
    $(".jd_tt").text(add_commas(jd_tt.toFixed(5)));
    $(".j2000").text(add_commas(j2000.toFixed(5)));
    $(".m").text(m.toFixed(5));
    $(".alpha_fms").text(alpha_fms.toFixed(5));
    $(".pbs").text(pbs.toFixed(5));
    $(".e").text(e.toFixed(5));
    $(".nu_m").text(nu_m.toFixed(5));
    $(".nu").text(nu.toFixed(5));
    $(".l_s").text(l_s.toFixed(5));
    $(".eot").text(eot.toFixed(5));
    $(".eot_h").text(h_to_hms(eot_h.toFixed(5)));
    $(".msd").text(add_commas(msd.toFixed(5)));
    $(".mtc").text(h_to_hms(mtc));

    $(".curiosity_lmst").text(h_to_hms(curiosity_lmst));
    $(".curiosity_ltst").text(h_to_hms(curiosity_ltst));
    $(".curiosity_sol").text(curiosity_sol);

    $(".opportunity_mission").text(h_to_hms(opportunity_mission));
    $(".opportunity_ltst").text(h_to_hms(opportunity_ltst));
    $(".opportunity_sol").text(opportunity_sol);
}
$(function() {
    $(".last_leap_second").text(last_leap_second);
    $(".tai_offset").text(tai_offset);
    update();
    $(".explanation").hide();
    setInterval(update, 10);
    $(".explanation-link").hover(function() {
        $(".explanation").hide();
        $(this).css("font-weight", "bold");
        $(".help").hide();
        $($(this).data("explanation")).show();
    }, function() {
        $(this).css("font-weight", "300");
        $(".help").show();
        $($(this).data("explanation")).hide();
    });
    $('.automatic-input').mouseup(function() {
        // Changing the contents of this element so frequently
        // stops the click handler from firing, so we need to
        // watch for mouseup instead
        $('.automatic-input').hide();
        $('.manual-input').show();
        $('.custom-datetime').select();
    });
    $('.custom-datetime').blur(function() {
        if (! $('.custom-datetime').val()) {
            $('.manual-input').hide();
            $('.automatic-input').show();
        }
    });
    $('.earth-date-input .clear-button').click(function() {
        $('.custom-datetime').val('');
        $('.manual-input').hide();
        $('.automatic-input').show();
    });
});