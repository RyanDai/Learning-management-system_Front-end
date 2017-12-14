import $ from 'jquery';

let x = null;
export default function startCountDown(time) {
    let countDownDate = new Date(time).getTime();

    // Update the count down every 1 second
    x = setInterval(function () {

        const animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        const animationName = 'flipInX';
        // Get todays date and time
        let now = new Date().getTime();

        // Find the distance between now an the count down date
        let distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        if (document.getElementById("cd_day") === null) {
            clearInterval(x);
            return;
        }
        document.getElementById("cd_day").innerHTML = "" + days;
        if (seconds === 59 && minutes === 59 && hours === 23) {
            $('#cd_day').addClass('animated ' + animationName).one(animationEnd, function () {
                $(this).removeClass('animated ' + animationName);
            });
        }
        document.getElementById("cd_hour").innerHTML = "" + hours;
        if (seconds === 59 && minutes === 59) {
            $('#cd_hour').addClass('animated ' + animationName).one(animationEnd, function () {
                $(this).removeClass('animated ' + animationName);
            });
        }
        document.getElementById("cd_min").innerHTML = "" + minutes;
        if (seconds === 59) {
            $('#cd_min').addClass('animated ' + animationName).one(animationEnd, function () {
                $(this).removeClass('animated ' + animationName);
            });
        }
        document.getElementById("cd_sec").innerHTML = "" + seconds;
        // $('#cd_sec').text(""+seconds);
        $('#cd_sec').addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);
        });
        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
        }
    }, 1000);
}

export function stopCountDown() {
    if (x !== null)
        clearInterval(x);
}