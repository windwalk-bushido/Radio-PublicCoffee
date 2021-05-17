const main_controls = document.getElementById("main_controls");
main_controls.scrollIntoView();

const btn_repeat_tracks = document.getElementById("btn_repeat_track");
const btn_previous_track = document.getElementById("btn_previous_track");
const btn_play_pause_track = document.getElementById("btn_play_pause_track");
const btn_next_track = document.getElementById("btn_next_track");
const btn_shuffle_tracks = document.getElementById("btn_shuffle_track");

const track = document.getElementById("track");

const div_track_progress = document.getElementById("div_track_progress");
const progress_bar = document.getElementById("progress_bar");

const track_name_of_current_track_playing = document.getElementById("track_name_of_current_track_playing");

const duration_time_while_playing = document.querySelector('#duration_time_while_playing');
const current_time_while_playing = document.querySelector('#current_time_while_playing');


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


const artist_name_of_current_track_playing = document.getElementById("artist_name_of_current_track_playing");
artist_name_of_current_track_playing.innerHTML = "Windwalk";








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
        main_controls?.classList.add("is_playing");
        btn_play_pause_track?.querySelector("i.fas")?.classList.remove("fa-play");
        btn_play_pause_track?.querySelector("i.fas")?.classList.add("fa-pause");

        pause_icon.style.marginLeft = "0px";

        track?.play();
}

function PauseTrack()
{
        main_controls?.classList.remove("is_playing");
        btn_play_pause_track?.querySelector("i.fas")?.classList.add("fa-play");
        btn_play_pause_track?.querySelector("i.fas")?.classList.remove("fa-pause");

        CenterPlayButton();

        track?.pause();
}

function PauseOrPlayTrack()
{
        var is_playing = main_controls.classList.contains("is_playing");

        if (is_playing)
        {
                PauseTrack();
        }
        else
        {
                PlayTrack();
        }
}




function RemoveClassFromLastSong(numberic: number)
{
        switch(numberic)
        {
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

function ChangeSelectedSongStyle(requested_index: number)
{
        switch(requested_index)
        {
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

function JustPlayIt()
{
        LoadTrack(tracks_list[track_index]);
        PlayTrack();
        if(last_track_index != track_index)
        {
                ChangeSelectedSongStyle(track_index);
        };
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
                JustPlayIt();
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
                JustPlayIt();
        }
}




function UpdateTrackProgress(e: { srcElement: { duration: any; currentTime: any; }; })
{
        const { duration, currentTime } = e.srcElement;
        const progress_in_percent = (currentTime / duration) * 100;
        progress_bar.style.width = `${progress_in_percent}%`;
}

function SetTrackProgress(this: any, e: { offsetX: any; })
{
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = track?.duration;

        track.currentTime = (clickX / width) * duration;
}




function DurationTime (e: { srcElement: { duration: any; currentTime: any; }; }) 
{
	const {duration, currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes of currentTime
	let min = (currentTime==null)? 0: Math.floor(currentTime/60);
	min = min <10 ? '0'+min:min;

	// define seconds of currentTime
	function get_sec(x: number)
        {
		if (Math.floor(x) >= 60)
                {
			
			for (var i = 1; i<=60; i++)
                        {
				if (Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1)))
                                {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}
                else
                {
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		}
	}

	get_sec(currentTime, sec);

	// change currentTime DOM
	current_time_while_playing.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0': Math.floor(duration/60);
	min_d = min_d <10 ? '0'+min_d:min_d;


	function get_sec_d(x: number)
        {
		if (Math.floor(x) >= 60)
                {
			
			for (var i = 1; i<=60; i++)
                        {
				if (Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1)))
                                {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}
                else
                {
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		}
	} 

	// define seconds duration
	get_sec_d(duration);

	// change duration DOM
	duration_time_while_playing.innerHTML = min_d +':'+ sec_d;
};




btn_repeat_tracks?.addEventListener("click", ChangeRepeatTracksState);
btn_previous_track?.addEventListener("click", PreviousTrack);
btn_play_pause_track?.addEventListener("click", PauseOrPlayTrack);
btn_next_track?.addEventListener("click", NextTrack);
btn_shuffle_tracks?.addEventListener("click", ChangeShuffleTracksState);

track?.addEventListener("timeupdate", UpdateTrackProgress);
div_track_progress?.addEventListener("click", SetTrackProgress);

track?.addEventListener("ended", NextTrack);

track?.addEventListener('timeupdate', DurationTime);




const btn_info = document.getElementById("btn_info");
const splash_page = document.getElementById("splash_page");
const webpage = document.getElementById("body");
const btn_close = document.getElementById("btn_close");


function ShowSplashScreen()
{
        splash_page.style.visibility = "visible";
        webpage.style.overflow = "hidden";
        webpage.scrollIntoView();
}

function CloseSplashScreen()
{
        splash_page.style.visibility = "hidden";
        webpage.style.overflow = "auto";
}


btn_info?.addEventListener("click", ShowSplashScreen);
btn_close?.addEventListener("click", CloseSplashScreen);








const div_track_1 = document.getElementById("div_track_1");
const div_track_2 = document.getElementById("div_track_2");
const div_track_3 = document.getElementById("div_track_3");
const div_track_4 = document.getElementById("div_track_4");
const div_track_5 = document.getElementById("div_track_5");
const div_track_6 = document.getElementById("div_track_6");
const div_track_7 = document.getElementById("div_track_7");
const div_track_8 = document.getElementById("div_track_8");
const div_track_9 = document.getElementById("div_track_9");
const div_track_10 = document.getElementById("div_track_10");
const div_track_11 = document.getElementById("div_track_11");
const div_track_12 = document.getElementById("div_track_12");




div_track_1.classList.add("selected_track");




function PlayOnDemand(requested_index: number)
{
        last_track_index = track_index;
        track_index = requested_index - 1;
        JustPlayIt();
}
