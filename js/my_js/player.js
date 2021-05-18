var main_controls = document.getElementById("main_controls");
main_controls.scrollIntoView();
var btn_repeat_tracks = document.getElementById("btn_repeat_track");
var btn_previous_track = document.getElementById("btn_previous_track");
var btn_play_pause_track = document.getElementById("btn_play_pause_track");
var btn_next_track = document.getElementById("btn_next_track");
var btn_shuffle_tracks = document.getElementById("btn_shuffle_track");
var track = document.getElementById("track");
var div_track_progress = document.getElementById("div_track_progress");
var progress_bar = document.getElementById("progress_bar");
var track_name_of_current_track_playing = document.getElementById("track_name_of_current_track_playing");
var duration_time_while_playing = document.querySelector('#duration_time_while_playing');
var current_time_while_playing = document.querySelector('#current_time_while_playing');
var pause_icon = document.getElementById("pause_icon");
var tracks_list = [
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
];
var shuffle_state_is_on = false;
var repeat_state_is_on = false;
var total_number_of_tracks = tracks_list.length;
var track_index = 0;
var last_track_index = 1;
function CenterPlayButton() {
    pause_icon.style.marginLeft = "4px";
}
function LoadTrack(tracks_list) {
    track_name_of_current_track_playing.innerText = tracks_list;
    track.src = "music/" + tracks_list + ".mp3";
}
LoadTrack(tracks_list[track_index]);
CenterPlayButton();
var artist_name_of_current_track_playing = document.getElementById("artist_name_of_current_track_playing");
artist_name_of_current_track_playing.innerHTML = "Windwalk";
function ChangeShuffleTracksState() {
    if (shuffle_state_is_on) {
        shuffle_state_is_on = false;
        btn_shuffle_tracks === null || btn_shuffle_tracks === void 0 ? void 0 : btn_shuffle_tracks.classList.remove("active_state");
    }
    else {
        shuffle_state_is_on = true;
        btn_shuffle_tracks === null || btn_shuffle_tracks === void 0 ? void 0 : btn_shuffle_tracks.classList.add("active_state");
        repeat_state_is_on = true;
        btn_repeat_tracks === null || btn_repeat_tracks === void 0 ? void 0 : btn_repeat_tracks.classList.add("active_state");
    }
}
function ChangeRepeatTracksState() {
    if (repeat_state_is_on) {
        repeat_state_is_on = false;
        btn_repeat_tracks === null || btn_repeat_tracks === void 0 ? void 0 : btn_repeat_tracks.classList.remove("active_state");
        shuffle_state_is_on = false;
        btn_shuffle_tracks === null || btn_shuffle_tracks === void 0 ? void 0 : btn_shuffle_tracks.classList.remove("active_state");
    }
    else {
        repeat_state_is_on = true;
        btn_repeat_tracks === null || btn_repeat_tracks === void 0 ? void 0 : btn_repeat_tracks.classList.add("active_state");
    }
}
function GetRandomInteger(minimum_number, maximum_number) {
    return Math.floor(Math.random() * (maximum_number - minimum_number)) + minimum_number;
}
function GetRandomTrackIndex() {
    var current_track_index = track_index;
    var next_song_index = 0;
    do {
        next_song_index = GetRandomInteger(0, total_number_of_tracks);
    } while (next_song_index == current_track_index);
    return next_song_index;
}
function PlayTrack() {
    var _a, _b;
    main_controls === null || main_controls === void 0 ? void 0 : main_controls.classList.add("is_playing");
    (_a = btn_play_pause_track === null || btn_play_pause_track === void 0 ? void 0 : btn_play_pause_track.querySelector("i.fas")) === null || _a === void 0 ? void 0 : _a.classList.remove("fa-play");
    (_b = btn_play_pause_track === null || btn_play_pause_track === void 0 ? void 0 : btn_play_pause_track.querySelector("i.fas")) === null || _b === void 0 ? void 0 : _b.classList.add("fa-pause");
    pause_icon.style.marginLeft = "0px";
    track === null || track === void 0 ? void 0 : track.play();
}
function PauseTrack() {
    var _a, _b;
    main_controls === null || main_controls === void 0 ? void 0 : main_controls.classList.remove("is_playing");
    (_a = btn_play_pause_track === null || btn_play_pause_track === void 0 ? void 0 : btn_play_pause_track.querySelector("i.fas")) === null || _a === void 0 ? void 0 : _a.classList.add("fa-play");
    (_b = btn_play_pause_track === null || btn_play_pause_track === void 0 ? void 0 : btn_play_pause_track.querySelector("i.fas")) === null || _b === void 0 ? void 0 : _b.classList.remove("fa-pause");
    CenterPlayButton();
    track === null || track === void 0 ? void 0 : track.pause();
}
function PauseOrPlayTrack() {
    var is_playing = main_controls.classList.contains("is_playing");
    if (is_playing) {
        PauseTrack();
    }
    else {
        PlayTrack();
    }
}
function RemoveClassFromLastSong(last_track_index) {
    switch (last_track_index) {
        case 0:
            div_track_1.classList.remove("selected_track");
            break;
        case 1:
            div_track_2.classList.remove("selected_track");
            break;
        case 2:
            div_track_3.classList.remove("selected_track");
            break;
        case 3:
            div_track_4.classList.remove("selected_track");
            break;
        case 4:
            div_track_5.classList.remove("selected_track");
            break;
        case 5:
            div_track_6.classList.remove("selected_track");
            break;
        case 6:
            div_track_7.classList.remove("selected_track");
            break;
        case 7:
            div_track_8.classList.remove("selected_track");
            break;
        case 8:
            div_track_9.classList.remove("selected_track");
            break;
        case 9:
            div_track_10.classList.remove("selected_track");
            break;
        case 10:
            div_track_11.classList.remove("selected_track");
            break;
        case 11:
            div_track_12.classList.remove("selected_track");
            break;
    }
}
function ChangeSelectedSongStyle(track_index) {
    switch (track_index) {
        case 0:
            div_track_1.classList.add("selected_track");
            RemoveClassFromLastSong(last_track_index);
            break;
        case 1:
            div_track_2.classList.add("selected_track");
            RemoveClassFromLastSong(last_track_index);
            break;
        case 2:
            div_track_3.classList.add("selected_track");
            RemoveClassFromLastSong(last_track_index);
            break;
        case 3:
            div_track_4.classList.add("selected_track");
            RemoveClassFromLastSong(last_track_index);
            break;
        case 4:
            div_track_5.classList.add("selected_track");
            RemoveClassFromLastSong(last_track_index);
            break;
        case 5:
            div_track_6.classList.add("selected_track");
            RemoveClassFromLastSong(last_track_index);
            break;
        case 6:
            div_track_7.classList.add("selected_track");
            RemoveClassFromLastSong(last_track_index);
            break;
        case 7:
            div_track_8.classList.add("selected_track");
            RemoveClassFromLastSong(last_track_index);
            break;
        case 8:
            div_track_9.classList.add("selected_track");
            RemoveClassFromLastSong(last_track_index);
            break;
        case 9:
            div_track_10.classList.add("selected_track");
            RemoveClassFromLastSong(last_track_index);
            break;
        case 10:
            div_track_11.classList.add("selected_track");
            RemoveClassFromLastSong(last_track_index);
            break;
        case 11:
            div_track_12.classList.add("selected_track");
            RemoveClassFromLastSong(last_track_index);
            break;
    }
}
function JustPlayIt() {
    LoadTrack(tracks_list[track_index]);
    PlayTrack();
    if (last_track_index != track_index) {
        ChangeSelectedSongStyle(track_index);
    }
    ;
}
function PreviousTrack() {
    if (shuffle_state_is_on == false) {
        if (track_index > -1) {
            last_track_index = track_index;
            track_index--;
        }
        ;
        if (track_index < 0 && repeat_state_is_on == true) {
            last_track_index = track_index;
            track_index = tracks_list.length - 1;
        }
    }
    else {
        last_track_index = track_index;
        track_index = GetRandomTrackIndex();
    }
    if (track_index > -1) {
        JustPlayIt();
    }
}
function NextTrack() {
    if (shuffle_state_is_on == false) {
        if (track_index < total_number_of_tracks) {
            last_track_index = track_index;
            track_index++;
        }
        if (track_index > tracks_list.length - 1 && repeat_state_is_on == true) {
            last_track_index = track_index;
            track_index = 0;
        }
    }
    else {
        last_track_index = track_index;
        track_index = GetRandomTrackIndex();
    }
    if (track_index < total_number_of_tracks) {
        JustPlayIt();
    }
}
function UpdateTrackProgress(e) {
    var _a = e.srcElement, duration = _a.duration, currentTime = _a.currentTime;
    var progress_in_percent = (currentTime / duration) * 100;
    progress_bar.style.width = progress_in_percent + "%";
}
function SetTrackProgress(e) {
    var width = this.clientWidth;
    var clickX = e.offsetX;
    var duration = track === null || track === void 0 ? void 0 : track.duration;
    track.currentTime = (clickX / width) * duration;
}
function DurationTime(e) {
    var _a = e.srcElement, duration = _a.duration, currentTime = _a.currentTime;
    var sec;
    var sec_d;
    // define minutes of currentTime
    var min = (currentTime == null) ? 0 : Math.floor(currentTime / 60);
    min = min < 10 ? '0' + min : min;
    // define seconds of currentTime
    function get_sec(x) {
        if (Math.floor(x) >= 60) {
            for (var i = 1; i <= 60; i++) {
                if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
                    sec = Math.floor(x) - (60 * i);
                    sec = sec < 10 ? '0' + sec : sec;
                }
            }
        }
        else {
            sec = Math.floor(x);
            sec = sec < 10 ? '0' + sec : sec;
        }
    }
    get_sec(currentTime, sec);
    // change currentTime DOM
    current_time_while_playing.innerHTML = min + ':' + sec;
    // define minutes duration
    var min_d = (isNaN(duration) === true) ? '0' : Math.floor(duration / 60);
    min_d = min_d < 10 ? '0' + min_d : min_d;
    function get_sec_d(x) {
        if (Math.floor(x) >= 60) {
            for (var i = 1; i <= 60; i++) {
                if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
                    sec_d = Math.floor(x) - (60 * i);
                    sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
                }
            }
        }
        else {
            sec_d = (isNaN(duration) === true) ? '0' :
                Math.floor(x);
            sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
        }
    }
    // define seconds duration
    get_sec_d(duration);
    // change duration DOM
    duration_time_while_playing.innerHTML = min_d + ':' + sec_d;
}
;
btn_repeat_tracks === null || btn_repeat_tracks === void 0 ? void 0 : btn_repeat_tracks.addEventListener("click", ChangeRepeatTracksState);
btn_previous_track === null || btn_previous_track === void 0 ? void 0 : btn_previous_track.addEventListener("click", PreviousTrack);
btn_play_pause_track === null || btn_play_pause_track === void 0 ? void 0 : btn_play_pause_track.addEventListener("click", PauseOrPlayTrack);
btn_next_track === null || btn_next_track === void 0 ? void 0 : btn_next_track.addEventListener("click", NextTrack);
btn_shuffle_tracks === null || btn_shuffle_tracks === void 0 ? void 0 : btn_shuffle_tracks.addEventListener("click", ChangeShuffleTracksState);
track === null || track === void 0 ? void 0 : track.addEventListener("timeupdate", UpdateTrackProgress);
div_track_progress === null || div_track_progress === void 0 ? void 0 : div_track_progress.addEventListener("click", SetTrackProgress);
track === null || track === void 0 ? void 0 : track.addEventListener("ended", NextTrack);
track === null || track === void 0 ? void 0 : track.addEventListener('timeupdate', DurationTime);
var btn_info = document.getElementById("btn_info");
var splash_page = document.getElementById("splash_page");
var webpage = document.getElementById("body");
var btn_close = document.getElementById("btn_close");
function ShowSplashScreen() {
    splash_page.style.visibility = "visible";
    webpage.style.overflow = "hidden";
    webpage.scrollIntoView();
}
function CloseSplashScreen() {
    splash_page.style.visibility = "hidden";
    webpage.style.overflow = "auto";
}
btn_info === null || btn_info === void 0 ? void 0 : btn_info.addEventListener("click", ShowSplashScreen);
btn_close === null || btn_close === void 0 ? void 0 : btn_close.addEventListener("click", CloseSplashScreen);
var div_track_1 = document.getElementById("div_track_1");
var div_track_2 = document.getElementById("div_track_2");
var div_track_3 = document.getElementById("div_track_3");
var div_track_4 = document.getElementById("div_track_4");
var div_track_5 = document.getElementById("div_track_5");
var div_track_6 = document.getElementById("div_track_6");
var div_track_7 = document.getElementById("div_track_7");
var div_track_8 = document.getElementById("div_track_8");
var div_track_9 = document.getElementById("div_track_9");
var div_track_10 = document.getElementById("div_track_10");
var div_track_11 = document.getElementById("div_track_11");
var div_track_12 = document.getElementById("div_track_12");
div_track_1.classList.add("selected_track");
function PlayOnDemand(requested_index) {
    last_track_index = track_index;
    track_index = requested_index - 1;
    JustPlayIt();
}
var liked_tracks = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
var array_from_cookie = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
var full_cookie = document.cookie;
function ReadCookie() {
    liked_tracks = full_cookie.split(";", 1);
    // Reading from a cookie doesn't work... Fix this only.
    liked_tracks = ["1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0"];
}
var btn_like_1 = document.getElementById("btn_like_1");
var btn_like_2 = document.getElementById("btn_like_2");
var btn_like_3 = document.getElementById("btn_like_3");
var btn_like_4 = document.getElementById("btn_like_4");
var btn_like_5 = document.getElementById("btn_like_5");
var btn_like_6 = document.getElementById("btn_like_6");
var btn_like_7 = document.getElementById("btn_like_7");
var btn_like_8 = document.getElementById("btn_like_8");
var btn_like_9 = document.getElementById("btn_like_9");
var btn_like_10 = document.getElementById("btn_like_10");
var btn_like_11 = document.getElementById("btn_like_11");
var btn_like_12 = document.getElementById("btn_like_12");
function LikeSong(track_index_from_html) {
    switch (track_index_from_html) {
        case 1:
            if (liked_tracks[0] == "0") {
                liked_tracks[0] = "1";
                btn_like_1.classList.add("btn_active");
            }
            else {
                liked_tracks[0] = "0";
                btn_like_1.classList.remove("btn_active");
            }
            break;
        case 2:
            if (liked_tracks[1] == "0") {
                liked_tracks[1] = "1";
                btn_like_2.classList.add("btn_active");
            }
            else {
                liked_tracks[1] = "0";
                btn_like_2.classList.remove("btn_active");
            }
            break;
        case 3:
            if (liked_tracks[2] == "0") {
                liked_tracks[2] = "1";
                btn_like_3.classList.add("btn_active");
            }
            else {
                liked_tracks[2] = "0";
                btn_like_3.classList.remove("btn_active");
            }
            break;
        case 4:
            if (liked_tracks[3] == "0") {
                liked_tracks[3] = "1";
                btn_like_4.classList.add("btn_active");
            }
            else {
                liked_tracks[3] = "0";
                btn_like_4.classList.remove("btn_active");
            }
            break;
        case 5:
            if (liked_tracks[4] == "0") {
                liked_tracks[4] = "1";
                btn_like_5.classList.add("btn_active");
            }
            else {
                liked_tracks[4] = "0";
                btn_like_5.classList.remove("btn_active");
            }
            break;
        case 6:
            if (liked_tracks[5] == "0") {
                liked_tracks[5] = "1";
                btn_like_6.classList.add("btn_active");
            }
            else {
                liked_tracks[5] = "0";
                btn_like_6.classList.remove("btn_active");
            }
            break;
        case 7:
            if (liked_tracks[6] == "0") {
                liked_tracks[6] = "1";
                btn_like_7.classList.add("btn_active");
            }
            else {
                liked_tracks[6] = "0";
                btn_like_7.classList.remove("btn_active");
            }
            break;
        case 8:
            if (liked_tracks[7] == "0") {
                liked_tracks[7] = "1";
                btn_like_8.classList.add("btn_active");
            }
            else {
                liked_tracks[7] = "0";
                btn_like_8.classList.remove("btn_active");
            }
            break;
        case 9:
            if (liked_tracks[8] == "0") {
                liked_tracks[8] = "1";
                btn_like_9.classList.add("btn_active");
            }
            else {
                liked_tracks[8] = "0";
                btn_like_9.classList.remove("btn_active");
            }
            break;
        case 10:
            if (liked_tracks[9] == "0") {
                liked_tracks[9] = "1";
                btn_like_10.classList.add("btn_active");
            }
            else {
                liked_tracks[9] = "0";
                btn_like_10.classList.remove("btn_active");
            }
            break;
        case 11:
            if (liked_tracks[10] == "0") {
                liked_tracks[10] = "1";
                btn_like_11.classList.add("btn_active");
            }
            else {
                liked_tracks[10] = "0";
                btn_like_11.classList.remove("btn_active");
            }
            break;
        case 12:
            if (liked_tracks[11] == "0") {
                liked_tracks[11] = "1";
                btn_like_12.classList.add("btn_active");
            }
            else {
                liked_tracks[11] = "0";
                btn_like_12.classList.remove("btn_active");
            }
            break;
    }
    var helper = liked_tracks.toString();
    helper = helper + "; Expires=Fri, 31 Dec 9999 23:59:59 GMT; Secure; SameSite=Strict;"; //Date is... wow.
    document.cookie = helper;
}
function ReadUserLikes() {
    for (var i = 0; i < total_number_of_tracks; i++) {
        if (liked_tracks[i] == "1") {
            switch (i) {
                case 0:
                    if (btn_like_1.classList.contains("btn_active")) {
                        btn_like_1.classList.remove("btn_active");
                    }
                    else {
                        btn_like_1.classList.add("btn_active");
                    }
                    break;
                case 1:
                    if (btn_like_2.classList.contains("btn_active")) {
                        btn_like_2.classList.remove("btn_active");
                    }
                    else {
                        btn_like_2.classList.add("btn_active");
                    }
                    break;
                case 2:
                    if (btn_like_3.classList.contains("btn_active")) {
                        btn_like_3.classList.remove("btn_active");
                    }
                    else {
                        btn_like_3.classList.add("btn_active");
                    }
                    break;
                case 3:
                    if (btn_like_4.classList.contains("btn_active")) {
                        btn_like_4.classList.remove("btn_active");
                    }
                    else {
                        btn_like_4.classList.add("btn_active");
                    }
                    break;
                case 4:
                    if (btn_like_5.classList.contains("btn_active")) {
                        btn_like_5.classList.remove("btn_active");
                    }
                    else {
                        btn_like_5.classList.add("btn_active");
                    }
                    break;
                case 5:
                    if (btn_like_6.classList.contains("btn_active")) {
                        btn_like_6.classList.remove("btn_active");
                    }
                    else {
                        btn_like_6.classList.add("btn_active");
                    }
                    break;
                case 6:
                    if (btn_like_7.classList.contains("btn_active")) {
                        btn_like_7.classList.remove("btn_active");
                    }
                    else {
                        btn_like_7.classList.add("btn_active");
                    }
                    break;
                case 7:
                    if (btn_like_8.classList.contains("btn_active")) {
                        btn_like_8.classList.remove("btn_active");
                    }
                    else {
                        btn_like_8.classList.add("btn_active");
                    }
                    break;
                case 8:
                    if (btn_like_9.classList.contains("btn_active")) {
                        btn_like_9.classList.remove("btn_active");
                    }
                    else {
                        btn_like_9.classList.add("btn_active");
                    }
                    break;
                case 9:
                    if (btn_like_10.classList.contains("btn_active")) {
                        btn_like_10.classList.remove("btn_active");
                    }
                    else {
                        btn_like_10.classList.add("btn_active");
                    }
                    break;
                case 10:
                    if (btn_like_11.classList.contains("btn_active")) {
                        btn_like_11.classList.remove("btn_active");
                    }
                    else {
                        btn_like_11.classList.add("btn_active");
                    }
                    break;
                case 11:
                    if (btn_like_12.classList.contains("btn_active")) {
                        btn_like_12.classList.remove("btn_active");
                    }
                    else {
                        btn_like_12.classList.add("btn_active");
                    }
                    break;
            }
        }
    }
}
ReadCookie();
ReadUserLikes();
var btn_hide_player = document.getElementById("btn_hide_player");
var btn_show_player = document.getElementById("btn_show_player");
var player = document.getElementById("player");
var is_hidden = false;
function HideOrShowPlayer() {
    btn_info.style.visibility = "visible";
    btn_show_player.style.visibility = "hidden";
    if (is_hidden == false) {
        is_hidden = true;
        player.style.visibility = "hidden";
        btn_hide_player.style.visibility = "hidden";
        btn_show_player.style.visibility = "visible";
        player.style.overflow = "none";
    }
    else {
        is_hidden = false;
        player.style.visibility = "visible";
        btn_hide_player.style.visibility = "visible";
        btn_show_player.style.visibility = "hidden";
        player.style.overflow = "auto";
    }
}
btn_hide_player === null || btn_hide_player === void 0 ? void 0 : btn_hide_player.addEventListener("click", HideOrShowPlayer);
btn_show_player === null || btn_show_player === void 0 ? void 0 : btn_show_player.addEventListener("click", HideOrShowPlayer);
