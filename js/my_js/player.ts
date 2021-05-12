const main_controls = document.getElementById('main_controls');

const btn_repeat_tracks = document.getElementById('repeat_track');
const btn_previous_track = document.getElementById('previous_track');
const btn_play_pause_track = document.getElementById('play_pause_track');
const btn_next_track = document.getElementById('next_track');
const btn_shuffle_tracks = document.getElementById('shuffle_track');

const track = document.getElementById('track');

const div_track_progress = document.getElementById('div_track_progress');
const progress_bar = document.getElementById('progress');

const track_name = document.getElementById('track_name');


var pause_icon = document.getElementById('pause_icon');


const obj_tracks_xhr = new XMLHttpRequest();

var json_object = "";

obj_tracks_xhr.onload = function()
{
        json_object = JSON.parse(this.responseText);
        console.log(json_object);
}

obj_tracks_xhr.open('get', 'tracks.json');
obj_tracks_xhr.send();


// ---------------------------------------------------------------- //


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




let shuffle_state_is_on = false;
let repeat_state_is_on = false;
let total_number_of_tracks = tracks_list.length;
let track_index = 0;
let last_track_index = track_index;




function CenterPlayButton()
{
        pause_icon.style.marginLeft = "4px";
}

function LoadTrack(tracks_list: string)
{
        track_name.innerText = tracks_list;
        track.src = `music/${tracks_list}.mp3`;
}

LoadTrack(tracks_list[track_index]);
CenterPlayButton();




function ChangeSelectedSongStyle()
{
        //song_from_playlist[track_index].className = 'song selected_song';
        //song_from_playlist[last_track_index].className = 'song';
}

function ChangeShuffleTracksState()
{
        if (shuffle_state_is_on)
        {
                shuffle_state_is_on = false;
                btn_shuffle_tracks?.classList.remove('active_state');
        }
        else
        {
                shuffle_state_is_on = true;
                btn_shuffle_tracks?.classList.add('active_state');

                repeat_state_is_on = true;
                btn_repeat_tracks?.classList.add('active_state');
        }
}

function ChangeRepeatTracksState()
{
        if (repeat_state_is_on)
        {
                repeat_state_is_on = false;
                btn_repeat_tracks?.classList.remove('active_state');

                shuffle_state_is_on = false;
                btn_shuffle_tracks?.classList.remove('active_state');
        }
        else
        {
                repeat_state_is_on = true;
                btn_repeat_tracks?.classList.add('active_state');
        }
}




function GetRandomInteger(minimum_number: number, maximum_number: number)
{
        return Math.floor(Math.random() * (maximum_number - minimum_number)) + minimum_number;
}

function GetRandomTrackIndex()
{
        let current_track_index = track_index;
        let next_song_index = 0;

        do
        {
                next_song_index = GetRandomInteger(0, total_number_of_tracks)
        }
        while (next_song_index == current_track_index);

        return next_song_index;
}




function PlayTrack()
{
        main_controls?.classList.add('play');
        btn_play_pause_track?.querySelector('i.fas')?.classList.remove('fa-play');
        btn_play_pause_track?.querySelector('i.fas')?.classList.add('fa-pause');

        pause_icon.style.marginLeft = "0px";

        track?.play();
}

function PauseTrack()
{
        main_controls?.classList.remove('play');
        btn_play_pause_track?.querySelector('i.fas')?.classList.add('fa-play');
        btn_play_pause_track?.querySelector('i.fas')?.classList.remove('fa-pause');

        CenterPlayButton();

        track?.pause();
}

function PreviousTrack()
{
        if (shuffle_state_is_on == false)
        {
                if (track_index > -1)
                {
                        last_track_index = track_index;
                        track_index--;
                };

                if (track_index < 0 && repeat_state_is_on == true)
                {
                        last_track_index = track_index;
                        track_index = tracks_list.length - 1;
                }
        }
        else
        {
                last_track_index = track_index;
                track_index = GetRandomTrackIndex();
        }


        if (track_index > -1)
        {
                LoadTrack(tracks_list[track_index]);
                PlayTrack();
                ChangeSelectedSongStyle();
        }
}

function NextTrack() 
{
        if (shuffle_state_is_on == false)
        {
                if (track_index < total_number_of_tracks)
                {
                        last_track_index = track_index;
                        track_index++;
                }

                if (track_index > tracks_list.length - 1 && repeat_state_is_on == true)
                {
                        last_track_index = track_index;
                        track_index = 0;
                }
        }
        else
        {
                last_track_index = track_index;
                track_index = GetRandomTrackIndex();
        }


        if (track_index < total_number_of_tracks)
        {
                LoadTrack(tracks_list[track_index]);
                PlayTrack();
                ChangeSelectedSongStyle();
        }
}




function UpdateTrackProgress(e: { srcElement: { duration: any; some_time: any; }; })
{
        var { duration, some_time } = e.srcElement;
        var progress_in_percent = (some_time / duration) * 100;
        progress_bar.style.width = `${progress_in_percent}%`;
}

function SetTrackProgress(this: any, e: { offsetX: any; })
{
        var width = this.clientWidth;
        var clickX = e.offsetX;
        var duration = track?.duration;

        track.some_time = (clickX / width) * duration;
}




btn_repeat_tracks?.addEventListener('click', ChangeRepeatTracksState);
btn_previous_track?.addEventListener('click', PreviousTrack);
btn_play_pause_track?.addEventListener('click', () => 
{
        var is_playing = main_controls.classList.contains('play');

        if (is_playing)
        {
                PauseTrack();
        }
        else
        {
                PlayTrack();
        }
});
btn_next_track?.addEventListener('click', NextTrack);
btn_shuffle_tracks?.addEventListener('click', ChangeShuffleTracksState);

track?.addEventListener('timeupdate', UpdateTrackProgress); // <- THIS
div_track_progress?.addEventListener('click', SetTrackProgress);

track?.addEventListener('ended', NextTrack);








// Click to play song (from playlist)
const song_number = document.getElementById('song_number');
const song_from_playlist = document.getElementById('song_from_playlist');


function PlayTrackOnDemand()
{
        last_track_index = track_index;
        track_index = parseInt(song_number.innerHTML);
        track_index--;

        LoadTrack(tracks_list[track_index]);
        PlayTrack();
        ChangeSelectedSongStyle();
}




// PLAYLIST
const playlist = document.getElementById('div_playlist');
const song_name = document.getElementById('playlist_track_name');




function MakePlaylist()
{
        for (var i = 0; i < total_number_of_tracks; i++)
	{
                if (i == 0)
                {
                        song_name.innerText = tracks_list[i];
                        song_number.innerHTML = (i+1).toString();
                }
                else
                {
                        // Main track div
                        var song_in_playlist = document.createElement('div');
                        playlist?.appendChild(song_in_playlist);
                        song_in_playlist.className = 'song';


                        // Div for main track info
                        var song_info = document.createElement('div');
                        song_in_playlist?.appendChild(song_info);
                        song_info.className = 'song_info';
                        song_info.id = 'song_from_playlist';


                        // Track number + div
                        var div_for_song_number = document.createElement('div');
                        song_info?.appendChild(div_for_song_number);
                        div_for_song_number.className = 'song_number';

                        var real_song_number = document.createElement('p');
                        div_for_song_number.appendChild(real_song_number);
                        real_song_number.id = 'song_number';
                        real_song_number.innerHTML = (i+1).toString();


                        // Artist div + artist name
                        var div_for_main_info = document.createElement('div');
                        song_info?.appendChild(div_for_main_info);
                        div_for_main_info.className = 'main_info';

                        var playlist_artist_name = document.createElement('div');
                        div_for_main_info?.appendChild(playlist_artist_name);
                        playlist_artist_name.className = 'playlist_artist_name';

                        var artist_name = document.createElement('p');
                        playlist_artist_name?.appendChild(artist_name);
                        artist_name.innerHTML = artist_list[i];


                        // Track div + track name
                        var playlist_track_name = document.createElement('div');
                        div_for_main_info?.appendChild(playlist_track_name);
                        playlist_track_name.className = 'playlist_track_name';

                        var track_name = document.createElement('p');
                        playlist_artist_name?.appendChild(track_name);
                        track_name.innerHTML = tracks_list[i];


                        // Div for links
                        var div_for_link_to_artist = document.createElement('div');
                        song_in_playlist?.appendChild(div_for_link_to_artist);
                        div_for_link_to_artist.className = 'link_to_artist';


                        // Number of hearts
                        var div_number_of_hearts = document.createElement('div');
                        div_for_link_to_artist.appendChild(div_number_of_hearts);
                        div_number_of_hearts.className = 'div_hearts_number';
                        var actual_number_of_hearts = document.createElement('p');
                        div_number_of_hearts.appendChild(actual_number_of_hearts);
                        var helper = hearts_list[i];
                        actual_number_of_hearts.innerHTML = helper.toString();

                        // Heart button
                        var heart_button = document.createElement('a');
                        div_for_link_to_artist?.appendChild(heart_button);
                        heart_button.className = 'heart';
                        var actual_heart = document.createElement('i');
                        heart_button.appendChild(actual_heart);
                        actual_heart.className = 'fas fa-heart';

                        // Artist page button
                        var actual_link_to_artist = document.createElement('a');
                        div_for_link_to_artist?.appendChild(actual_link_to_artist);
                        actual_link_to_artist.className = 'heart';
                        var go_to_link = document.createElement('i');
                        actual_link_to_artist.appendChild(go_to_link);
                        go_to_link.className = 'fas fa-share';
                        actual_link_to_artist.href = link_list[i];
                }
        }
}

MakePlaylist();




song_from_playlist?.addEventListener('click', PlayTrackOnDemand);
song_from_playlist?.addEventListener('ended', NextTrack);
