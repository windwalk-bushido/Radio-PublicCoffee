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
var tracks_list =
        [
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
let shuffle_state_is_on = false;
let repeat_state_is_on = false;
let total_number_of_tracks = tracks_list.length;
let track_index = 0;




// When site loads...
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
                        track_index--;
                };

                if (track_index < 0 && repeat_state_is_on == true)
                {
                        track_index = tracks_list.length - 1;
                }
        }
        else
        {
                track_index = GetRandomTrackIndex();
        }

        if (track_index > -1)
        {
                LoadTrack(tracks_list[track_index]);
                PlayTrack();
        }
}

function NextTrack() 
{
        if (shuffle_state_is_on == false)
        {
                if (track_index < total_number_of_tracks)
                {
                        track_index++;
                }

                if (track_index > tracks_list.length - 1 && repeat_state_is_on == true)
                {
                        track_index = 0;
                }
        }
        else
        {
                track_index = GetRandomTrackIndex();
        }


        if (track_index < total_number_of_tracks)
        {
                LoadTrack(tracks_list[track_index]);
                PlayTrack();
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




function SetVolume(this: any, e: { offsetX: any; })
{
        var width = this.clientWidth;
        var clickX = e.offsetX;
        
        track.volume = (clickX / width) * 100;
        // 1.0 is max volume.
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

volume_bar?.addEventListener('click', SetVolume);








// PLAYLIST

const playlist = document.getElementById('div_playlist');
const song_name = document.getElementById('playlist_track_name');




function MakePlaylist()
{
        for (var i = 0; i < total_number_of_tracks; i++)
	{
                if (i === 0)
                {
                        song_name.innerText = tracks_list[i];
                        song_name.style.fontWeight = 'bold';
                }
                else
                {
                        // Creating track div
                        var song_in_playlist = document.createElement('div');
                        playlist?.appendChild(song_in_playlist);
                        song_in_playlist.className = 'song';


                        // Creating track info -> div for: artist name div, track name div + div for link to artist page
                        var song_info = document.createElement('div');
                        song_in_playlist?.appendChild(song_info);
                        song_info.className = 'song_info';

                        var div_for_link_to_artist = document.createElement('div');
                        song_in_playlist?.appendChild(div_for_link_to_artist);
                        div_for_link_to_artist.className = 'link_to_artist';


                        // Creating mentioned divs
                        var playlist_artist_name = document.createElement('div');
                        song_info?.appendChild(playlist_artist_name);
                        playlist_artist_name.className = 'playlist_artist_name';

                        var playlist_track_name = document.createElement('div');
                        song_info?.appendChild(playlist_track_name);
                        playlist_track_name.className = 'playlist_track_name';


                        // Creating paragraphs to fit those info
                        var artist_name = document.createElement('p');
                        playlist_artist_name?.appendChild(artist_name);
                        artist_name.innerHTML = 'Windwalk';

                        var track_name = document.createElement('p');
                        playlist_artist_name?.appendChild(track_name);
                        track_name.innerHTML = tracks_list[i];
                        track_name.style.fontWeight = 'bold';


                        // Creating actual link to artist page
                        var actual_link_to_artist = document.createElement('a');
                        div_for_link_to_artist?.appendChild(actual_link_to_artist);
                        actual_link_to_artist.innerHTML = 'Artist Page';
                        actual_link_to_artist.href = '#';
                }
        }
}

MakePlaylist();
