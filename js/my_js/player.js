var main_controls = document.getElementById("main_controls");
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
/*
FETCH JSON FILE HERE

var json_total_tracks = json_object.total_tracks;

var artist_list: string | any[] = [];
var tracks_list: string | any[] = [];
var link_list: string | any[] = [];
var hearts_list: string | number[] = [];


for(var i = 0; i < json_total_tracks; i++)
{
        artist_list[i] = json_object.tracks[i].artist;
        tracks_list[i] = json_object.tracks[i].name;
        link_list[i] = json_object.tracks[i].link;
        hearts_list[i] = json_object.tracks[i].hearts;
}
*/
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
var last_track_index = track_index;
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
function ChangeSelectedSongStyle() {
    //track_from_playlist[track_index].className = "song selected_song";
    //track_from_playlist[last_track_index].className = "song";
}
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
    main_controls === null || main_controls === void 0 ? void 0 : main_controls.classList.add("play");
    (_a = btn_play_pause_track === null || btn_play_pause_track === void 0 ? void 0 : btn_play_pause_track.querySelector("i.fas")) === null || _a === void 0 ? void 0 : _a.classList.remove("fa-play");
    (_b = btn_play_pause_track === null || btn_play_pause_track === void 0 ? void 0 : btn_play_pause_track.querySelector("i.fas")) === null || _b === void 0 ? void 0 : _b.classList.add("fa-pause");
    pause_icon.style.marginLeft = "0px";
    track === null || track === void 0 ? void 0 : track.play();
}
function PauseTrack() {
    var _a, _b;
    main_controls === null || main_controls === void 0 ? void 0 : main_controls.classList.remove("play");
    (_a = btn_play_pause_track === null || btn_play_pause_track === void 0 ? void 0 : btn_play_pause_track.querySelector("i.fas")) === null || _a === void 0 ? void 0 : _a.classList.add("fa-play");
    (_b = btn_play_pause_track === null || btn_play_pause_track === void 0 ? void 0 : btn_play_pause_track.querySelector("i.fas")) === null || _b === void 0 ? void 0 : _b.classList.remove("fa-pause");
    CenterPlayButton();
    track === null || track === void 0 ? void 0 : track.pause();
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
        LoadTrack(tracks_list[track_index]);
        PlayTrack();
        ChangeSelectedSongStyle();
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
        LoadTrack(tracks_list[track_index]);
        PlayTrack();
        ChangeSelectedSongStyle();
    }
}
function UpdateTrackProgress(e) {
    var _a = e.srcElement, duration = _a.duration, some_time = _a.some_time;
    var progress_in_percent = (some_time / duration) * 100;
    progress_bar.style.width = progress_in_percent + "%";
}
function SetTrackProgress(e) {
    var width = this.clientWidth;
    var clickX = e.offsetX;
    var duration = track === null || track === void 0 ? void 0 : track.duration;
    track.some_time = (clickX / width) * duration;
}
function DurationTime(e) {
    var _a = e.srcElement, duration = _a.duration, some_time = _a.some_time;
    var sec;
    var sec_d;
    // define minutes some_time
    var min = (some_time == null) ? 0 : Math.floor(some_time / 60);
    min = min < 10 ? '0' + min : min;
    // define seconds some_time
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
    get_sec(some_time, sec);
    // change some_time DOM
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
btn_play_pause_track === null || btn_play_pause_track === void 0 ? void 0 : btn_play_pause_track.addEventListener("click", function () {
    var is_playing = main_controls.classList.contains("play");
    if (is_playing) {
        PauseTrack();
    }
    else {
        PlayTrack();
    }
});
btn_next_track === null || btn_next_track === void 0 ? void 0 : btn_next_track.addEventListener("click", NextTrack);
btn_shuffle_tracks === null || btn_shuffle_tracks === void 0 ? void 0 : btn_shuffle_tracks.addEventListener("click", ChangeShuffleTracksState);
track === null || track === void 0 ? void 0 : track.addEventListener("timeupdate", UpdateTrackProgress); // <- THIS
div_track_progress === null || div_track_progress === void 0 ? void 0 : div_track_progress.addEventListener("click", SetTrackProgress);
track === null || track === void 0 ? void 0 : track.addEventListener("ended", NextTrack);
track === null || track === void 0 ? void 0 : track.addEventListener('timeupdate', DurationTime);
// For changing first track's name and artist name
var playlist = document.getElementById("div_playlist");
var track_index_in_playlist = document.getElementById("track_index_in_playlist");
var track_name = document.getElementById("track_name_in_playlist");
var artist_name = document.getElementById("artist_name_in_playlist");
function MakePlaylist() {
    for (var i = 0; i < total_number_of_tracks; i++) {
        if (i == 0) {
            track_name.innerText = tracks_list[i];
            artist_name.innerHTML = "Windwalk";
            track_index_in_playlist.innerHTML = (i + 1).toString();
        }
        else {
            // Main track div
            var div_track = document.createElement("div");
            playlist === null || playlist === void 0 ? void 0 : playlist.appendChild(div_track);
            div_track.className = "div_track";
            // Div for main track info
            var div_track_info = document.createElement("div");
            div_track === null || div_track === void 0 ? void 0 : div_track.appendChild(div_track_info);
            div_track_info.className = "div_track_info";
            div_track_info.id = "track_from_playlist";
            // Track number div + track number
            var div_for_track_index_in_playlist = document.createElement("div");
            div_track_info === null || div_track_info === void 0 ? void 0 : div_track_info.appendChild(div_for_track_index_in_playlist);
            div_for_track_index_in_playlist.className = "div_track_index";
            var real_track_index_in_playlist = document.createElement("p");
            div_for_track_index_in_playlist.appendChild(real_track_index_in_playlist);
            real_track_index_in_playlist.id = "track_index_in_playlist";
            real_track_index_in_playlist.innerHTML = (i + 1).toString();
            // Artist div + artist name
            var div_main_info = document.createElement("div");
            div_track_info === null || div_track_info === void 0 ? void 0 : div_track_info.appendChild(div_main_info);
            div_main_info.className = "div_main_info";
            var div_artist_name = document.createElement("div");
            div_main_info === null || div_main_info === void 0 ? void 0 : div_main_info.appendChild(div_artist_name);
            div_artist_name.className = "div_artist_name";
            var artist_name_in_playlist = document.createElement("p");
            div_artist_name === null || div_artist_name === void 0 ? void 0 : div_artist_name.appendChild(artist_name_in_playlist);
            artist_name_in_playlist.innerHTML = "Windwalk";
            artist_name_in_playlist.id = "artist_name_in_playlist";
            // Track div + track name
            var div_track_name = document.createElement("div");
            div_main_info === null || div_main_info === void 0 ? void 0 : div_main_info.appendChild(div_track_name);
            div_track_name.className = "div_track_name";
            var track_name_in_playlist = document.createElement("p");
            div_track_name === null || div_track_name === void 0 ? void 0 : div_track_name.appendChild(track_name_in_playlist);
            track_name_in_playlist.innerHTML = tracks_list[i];
            track_name_in_playlist.id = "track_name_in_playlist";
            // Div for likes and downloads
            var div_likes_and_downloads = document.createElement("div");
            div_track === null || div_track === void 0 ? void 0 : div_track.appendChild(div_likes_and_downloads);
            div_likes_and_downloads.className = "div_likes_and_downloads";
            // Number of likes
            var div_likes = document.createElement("div");
            div_likes_and_downloads.appendChild(div_likes);
            div_likes.className = "div_likes";
            var number_of_likes = document.createElement("p");
            div_likes.appendChild(number_of_likes);
            number_of_likes.id = "likes_in_playlist";
            var helper = 456;
            number_of_likes.innerHTML = helper.toString();
            // Like button
            var btn_like = document.createElement("a");
            div_likes_and_downloads === null || div_likes_and_downloads === void 0 ? void 0 : div_likes_and_downloads.appendChild(btn_like);
            btn_like.className = "btn_like";
            var like_icon = document.createElement("i");
            btn_like.appendChild(like_icon);
            like_icon.className = "fas fa-heart";
            // Artist page button
            var btn_download = document.createElement("a");
            div_likes_and_downloads === null || div_likes_and_downloads === void 0 ? void 0 : div_likes_and_downloads.appendChild(btn_download);
            btn_download.className = "btn_download";
            var go_to_link = document.createElement("i");
            btn_download.appendChild(go_to_link);
            go_to_link.className = "fas fa-download";
            btn_download.href = "#";
        }
    }
}
MakePlaylist();
