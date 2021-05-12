const main_controls = document.getElementById("div_main_controls");

const btn_repeat_tracks = document.getElementById("btn_repeat_track");
const btn_previous_track = document.getElementById("btn_previous_track");
const btn_play_pause_track = document.getElementById("btn_play_pause_track");
const btn_next_track = document.getElementById("btn_next_track");
const btn_shuffle_tracks = document.getElementById("btn_shuffle_track");

const track = document.getElementById("track");

const div_track_progress = document.getElementById("div_track_progress");
const progress_bar = document.getElementById("progress_bar");

const track_name_of_current_track_playing = document.getElementById("track_name_of_current_track_playing");


var pause_icon = document.getElementById("pause_icon");


/*
const obj_tracks_xhr = new XMLHttpRequest();

var json_object = "";

obj_tracks_xhr.onload = function()
{
        json_object = JSON.parse(this.responseText);
        console.log(json_object);
}

obj_tracks_xhr.open("get", "tracks.json");
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
*/




var tracks_list =
        [
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
        track_name_of_current_track_playing.innerText = tracks_list;
        track.src = `music/${tracks_list}.mp3`;
}

LoadTrack(tracks_list[track_index]);
CenterPlayButton();


const current_artist = document.getElementById("artist_name_of_current_track_playing");
current_artist.innerHTML = "Windwalk";




function ChangeSelectedSongStyle()
{
        //track_from_playlist[track_index].className = "song selected_song";
        //track_from_playlist[last_track_index].className = "song";
}

function ChangeShuffleTracksState()
{
        if (shuffle_state_is_on)
        {
                shuffle_state_is_on = false;
                btn_shuffle_tracks?.classList.remove("active_state");
        }
        else
        {
                shuffle_state_is_on = true;
                btn_shuffle_tracks?.classList.add("active_state");

                repeat_state_is_on = true;
                btn_repeat_tracks?.classList.add("active_state");
        }
}

function ChangeRepeatTracksState()
{
        if (repeat_state_is_on)
        {
                repeat_state_is_on = false;
                btn_repeat_tracks?.classList.remove("active_state");

                shuffle_state_is_on = false;
                btn_shuffle_tracks?.classList.remove("active_state");
        }
        else
        {
                repeat_state_is_on = true;
                btn_repeat_tracks?.classList.add("active_state");
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
        main_controls?.classList.add("play");
        btn_play_pause_track?.querySelector("i.fas")?.classList.remove("fa-play");
        btn_play_pause_track?.querySelector("i.fas")?.classList.add("fa-pause");

        pause_icon.style.marginLeft = "0px";

        track?.play();
}

function PauseTrack()
{
        main_controls?.classList.remove("play");
        btn_play_pause_track?.querySelector("i.fas")?.classList.add("fa-play");
        btn_play_pause_track?.querySelector("i.fas")?.classList.remove("fa-pause");

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




btn_repeat_tracks?.addEventListener("click", ChangeRepeatTracksState);
btn_previous_track?.addEventListener("click", PreviousTrack);
btn_play_pause_track?.addEventListener("click", () => 
{
        var is_playing = main_controls.classList.contains("play");

        if (is_playing)
        {
                PauseTrack();
        }
        else
        {
                PlayTrack();
        }
});
btn_next_track?.addEventListener("click", NextTrack);
btn_shuffle_tracks?.addEventListener("click", ChangeShuffleTracksState);

track?.addEventListener("timeupdate", UpdateTrackProgress); // <- THIS
div_track_progress?.addEventListener("click", SetTrackProgress);

track?.addEventListener("ended", NextTrack);








// Click to play song (from playlist)
const track_index_in_playlist = document.getElementById("track_index_in_playlist");
const track_from_playlist = document.getElementById("track_from_playlist"); // <------


function PlayTrackOnDemand()
{
        last_track_index = track_index;
        track_index = parseInt(track_index_in_playlist.innerHTML);
        track_index--;

        LoadTrack(tracks_list[track_index]);
        PlayTrack();
        ChangeSelectedSongStyle();
}




track_from_playlist?.addEventListener("click", PlayTrackOnDemand);
track_from_playlist?.addEventListener("ended", NextTrack);




// PLAYLIST
const playlist = document.getElementById("div_playlist");

// For changing first track's name and artist name
const track_name = document.getElementById("track_name_in_playlist");
const artist_name = document.getElementById("artist_name_in_playlist");




function MakePlaylist()
{
        for (var i = 0; i < total_number_of_tracks; i++)
	{
                if (i == 0)
                {
                        track_name.innerText = tracks_list[i];
                        artist_name.innerHTML = "Windwalk";
                        track_index_in_playlist.innerHTML = (i+1).toString();
                }
                else
                {
                        // Main track div
                        var div_track = document.createElement("div");
                        playlist?.appendChild(div_track);
                        div_track.className = "div_track";




                        // Div for main track info
                        var div_track_info = document.createElement("div");
                        div_track?.appendChild(div_track_info);
                        div_track_info.className = "div_track_info";
                        div_track_info.id = "track_from_playlist";




                        // Track number div + track number
                        var div_for_track_index_in_playlist = document.createElement("div");
                        div_track_info?.appendChild(div_for_track_index_in_playlist);
                        div_for_track_index_in_playlist.className = "div_track_index";

                        var real_track_index_in_playlist = document.createElement("p");
                        div_for_track_index_in_playlist.appendChild(real_track_index_in_playlist);
                        real_track_index_in_playlist.id = "track_index_in_playlist";
                        real_track_index_in_playlist.innerHTML = (i+1).toString();


                        // Artist div + artist name
                        var div_main_info = document.createElement("div");
                        div_track_info?.appendChild(div_main_info);
                        div_main_info.className = "div_main_info";

                        var div_artist_name = document.createElement("div");
                        div_main_info?.appendChild(div_artist_name);
                        div_artist_name.className = "div_artist_name";

                        var artist_name_in_playlist = document.createElement("p");
                        div_artist_name?.appendChild(artist_name_in_playlist);
                        artist_name_in_playlist.innerHTML = "Windwalk";
                        artist_name_in_playlist.id = "artist_name_in_playlist";


                        // Track div + track name
                        var div_track_name = document.createElement("div");
                        div_main_info?.appendChild(div_track_name);
                        div_track_name.className = "div_track_name";

                        var track_name_in_playlist = document.createElement("p");
                        div_track_name?.appendChild(track_name_in_playlist);
                        track_name_in_playlist.innerHTML = tracks_list[i];
                        track_name_in_playlist.id = "track_name_in_playlist";




                        // Div for likes and downloads
                        var div_likes_and_downloads = document.createElement("div");
                        div_track?.appendChild(div_likes_and_downloads);
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
                        div_likes_and_downloads?.appendChild(btn_like);
                        btn_like.className = "btn_like";
                        var like_icon = document.createElement("i");
                        btn_like.appendChild(like_icon);
                        like_icon.className = "fas fa-heart";


                        // Artist page button
                        var btn_download = document.createElement("a");
                        div_likes_and_downloads?.appendChild(btn_download);
                        btn_download.className = "btn_download";
                        var go_to_link = document.createElement("i");
                        btn_download.appendChild(go_to_link);
                        go_to_link.className = "fas fa-download";
                        btn_download.href = "#";
                }
        }
}

MakePlaylist();
