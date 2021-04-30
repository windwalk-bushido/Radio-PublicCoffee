var main_controls = document.getElementById('main_controls');
var btn_repeat_tracks = document.getElementById('repeat_track');
var btn_previous_track = document.getElementById('previous_track');
var btn_play_pause_track = document.getElementById('play_pause_track');
var btn_next_track = document.getElementById('next_track');
var btn_shuffle_tracks = document.getElementById('shuffle_track');
var track = document.getElementById('track');
var div_track_progress = document.getElementById('div_track_progress');
var progress_bar = document.getElementById('progress');
var track_name = document.getElementById('track_name');
var div_volume = document.getElementById('div_volume');
var volume_bar = document.getElementById('volume');
var pause_icon = document.getElementById('pause_icon');
// Make function to scan the folder for song names and add them into array. Possible via JSON?
var tracks_list = [
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
];
var shuffle_state_is_on = false;
var repeat_state_is_on = false;
var total_number_of_tracks = tracks_list.length;
var track_index = 0;
// When site loads...
function CenterPlayButton() {
    pause_icon.style.marginLeft = "4px";
}
function LoadTrack(tracks_list) {
    track_name.innerText = tracks_list;
    track.src = "music/" + tracks_list + ".mp3";
}
LoadTrack(tracks_list[track_index]);
CenterPlayButton();
function ChangeShuffleTracksState() {
    if (shuffle_state_is_on) {
        shuffle_state_is_on = false;
        btn_shuffle_tracks === null || btn_shuffle_tracks === void 0 ? void 0 : btn_shuffle_tracks.classList.remove('active_state');
    }
    else {
        shuffle_state_is_on = true;
        btn_shuffle_tracks === null || btn_shuffle_tracks === void 0 ? void 0 : btn_shuffle_tracks.classList.add('active_state');
        repeat_state_is_on = true;
        btn_repeat_tracks === null || btn_repeat_tracks === void 0 ? void 0 : btn_repeat_tracks.classList.add('active_state');
    }
}
function ChangeRepeatTracksState() {
    if (repeat_state_is_on) {
        repeat_state_is_on = false;
        btn_repeat_tracks === null || btn_repeat_tracks === void 0 ? void 0 : btn_repeat_tracks.classList.remove('active_state');
        shuffle_state_is_on = false;
        btn_shuffle_tracks === null || btn_shuffle_tracks === void 0 ? void 0 : btn_shuffle_tracks.classList.remove('active_state');
    }
    else {
        repeat_state_is_on = true;
        btn_repeat_tracks === null || btn_repeat_tracks === void 0 ? void 0 : btn_repeat_tracks.classList.add('active_state');
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
    main_controls === null || main_controls === void 0 ? void 0 : main_controls.classList.add('play');
    (_a = btn_play_pause_track === null || btn_play_pause_track === void 0 ? void 0 : btn_play_pause_track.querySelector('i.fas')) === null || _a === void 0 ? void 0 : _a.classList.remove('fa-play');
    (_b = btn_play_pause_track === null || btn_play_pause_track === void 0 ? void 0 : btn_play_pause_track.querySelector('i.fas')) === null || _b === void 0 ? void 0 : _b.classList.add('fa-pause');
    pause_icon.style.marginLeft = "0px";
    track === null || track === void 0 ? void 0 : track.play();
}
function PauseTrack() {
    var _a, _b;
    main_controls === null || main_controls === void 0 ? void 0 : main_controls.classList.remove('play');
    (_a = btn_play_pause_track === null || btn_play_pause_track === void 0 ? void 0 : btn_play_pause_track.querySelector('i.fas')) === null || _a === void 0 ? void 0 : _a.classList.add('fa-play');
    (_b = btn_play_pause_track === null || btn_play_pause_track === void 0 ? void 0 : btn_play_pause_track.querySelector('i.fas')) === null || _b === void 0 ? void 0 : _b.classList.remove('fa-pause');
    CenterPlayButton();
    track === null || track === void 0 ? void 0 : track.pause();
}
function PreviousTrack() {
    if (shuffle_state_is_on == false) {
        if (track_index > -1) {
            track_index--;
        }
        ;
        if (track_index < 0 && repeat_state_is_on == true) {
            track_index = tracks_list.length - 1;
        }
    }
    else {
        track_index = GetRandomTrackIndex();
    }
    if (track_index > -1) {
        LoadTrack(tracks_list[track_index]);
        PlayTrack();
    }
}
function NextTrack() {
    if (shuffle_state_is_on == false) {
        if (track_index < total_number_of_tracks) {
            track_index++;
        }
        if (track_index > tracks_list.length - 1 && repeat_state_is_on == true) {
            track_index = 0;
        }
    }
    else {
        track_index = GetRandomTrackIndex();
    }
    if (track_index < total_number_of_tracks) {
        LoadTrack(tracks_list[track_index]);
        PlayTrack();
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
function SetVolume(e) {
    var width = this.clientWidth;
    var clickX = e.offsetX;
    track.volume = (clickX / width) * 100;
    // 1.0 is max volume.
}
btn_repeat_tracks === null || btn_repeat_tracks === void 0 ? void 0 : btn_repeat_tracks.addEventListener('click', ChangeRepeatTracksState);
btn_previous_track === null || btn_previous_track === void 0 ? void 0 : btn_previous_track.addEventListener('click', PreviousTrack);
btn_play_pause_track === null || btn_play_pause_track === void 0 ? void 0 : btn_play_pause_track.addEventListener('click', function () {
    var is_playing = main_controls.classList.contains('play');
    if (is_playing) {
        PauseTrack();
    }
    else {
        PlayTrack();
    }
});
btn_next_track === null || btn_next_track === void 0 ? void 0 : btn_next_track.addEventListener('click', NextTrack);
btn_shuffle_tracks === null || btn_shuffle_tracks === void 0 ? void 0 : btn_shuffle_tracks.addEventListener('click', ChangeShuffleTracksState);
track === null || track === void 0 ? void 0 : track.addEventListener('timeupdate', UpdateTrackProgress); // <- THIS
div_track_progress === null || div_track_progress === void 0 ? void 0 : div_track_progress.addEventListener('click', SetTrackProgress);
track === null || track === void 0 ? void 0 : track.addEventListener('ended', NextTrack);
volume_bar === null || volume_bar === void 0 ? void 0 : volume_bar.addEventListener('click', SetVolume);
// PLAYLIST
var playlist = document.getElementById('div_playlist');
var song_name = document.getElementById('playlist_track_name');
function MakePlaylist() {
    for (var i = 0; i < total_number_of_tracks; i++) {
        if (i === 0) {
            song_name.innerText = tracks_list[i];
            song_name.style.fontWeight = 'bold';
        }
        else {
            // Creating track div
            var song_in_playlist = document.createElement('div');
            playlist === null || playlist === void 0 ? void 0 : playlist.appendChild(song_in_playlist);
            song_in_playlist.className = 'song';
            // Creating track info -> div for: artist name div, track name div + div for link to artist page
            var song_info = document.createElement('div');
            song_in_playlist === null || song_in_playlist === void 0 ? void 0 : song_in_playlist.appendChild(song_info);
            song_info.className = 'song_info';
            var div_for_link_to_artist = document.createElement('div');
            song_in_playlist === null || song_in_playlist === void 0 ? void 0 : song_in_playlist.appendChild(div_for_link_to_artist);
            div_for_link_to_artist.className = 'link_to_artist';
            // Creating mentioned divs
            var playlist_artist_name = document.createElement('div');
            song_info === null || song_info === void 0 ? void 0 : song_info.appendChild(playlist_artist_name);
            playlist_artist_name.className = 'playlist_artist_name';
            var playlist_track_name = document.createElement('div');
            song_info === null || song_info === void 0 ? void 0 : song_info.appendChild(playlist_track_name);
            playlist_track_name.className = 'playlist_track_name';
            // Creating paragraphs to fit those info
            var artist_name = document.createElement('p');
            playlist_artist_name === null || playlist_artist_name === void 0 ? void 0 : playlist_artist_name.appendChild(artist_name);
            artist_name.innerHTML = 'Windwalk';
            var track_name = document.createElement('p');
            playlist_artist_name === null || playlist_artist_name === void 0 ? void 0 : playlist_artist_name.appendChild(track_name);
            track_name.innerHTML = tracks_list[i];
            track_name.style.fontWeight = 'bold';
            // Creating actual link to artist page
            var actual_link_to_artist = document.createElement('a');
            div_for_link_to_artist === null || div_for_link_to_artist === void 0 ? void 0 : div_for_link_to_artist.appendChild(actual_link_to_artist);
            actual_link_to_artist.innerHTML = 'Artist Page';
            actual_link_to_artist.href = '#';
        }
    }
}
MakePlaylist();
