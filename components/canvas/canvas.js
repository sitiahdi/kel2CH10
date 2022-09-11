import React, { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function Canvas() {
  const musicTracks = [
    {
      name: "Cartoon, Asena - Howling",
      src: "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/781/howling-1597319420-UjfTH4Oz58.mp3",
    },
    {
      name: "Cartoon x Time To Talk, Asena - Omen",
      src: "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/003/omen-1630659637-G8apyocGHd.mp3",
    },
    {
      name: "Ship Wrek, Zookeepers, Trauzers - Vessel",
      src: "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/341/vessel-1586950077-8NqmSPL5PP.mp3",
    },
    {
      name: "Unknown Brain, Marvin Divine - MATAFAKA",
      src: "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/355/matafaka-feat-marvin-divine-1586950539-YXEfeGlwIv.mp3",
    },
    {
      name: "Unknown Brain, Bri Tolani - Why Do I?",
      src: "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/487/why-do-i-feat-bri-tolani-1586954600-5IMWlSMhuc.mp3",
    },
    {
      name: "Au5, Danyka Nadeau - Closer",
      src: "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/485/closer-feat-danyka-nadeau-1586954537-t2Hdco8TQy.mp3",
    },
    {
      name: "Mike Robert, ROY KNOX - Over My Head",
      src: "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/834/over-my-head-1602154829-jnosfRHISr.mp3",
    },
    {
      name: "if found - Need You",
      src: "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/952/need-you-1621951234-DdIeIyFtQ3.mp3",
    },
    {
      name: "Warriyo, Laura Brehm - Mortals",
      src: "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/287/mortals-feat-laura-brehm-1586948736-3e1Snmxk7T.mp3",
    },
    {
      name: "Diamond Eyes - Everything",
      src: "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/482/everything-1586954487-4HIIGx454b.mp3",
    },
    {
      name: "Rival, Cadmium, Harley Bird - Seasons",
      src: "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/469/1617274255_CL5cDBtHsP_Rival-X-Cadmium---Seasons-feat.-Harley-Bird-NCS-Release.mp3",
    },
    {
      name: "Ship Wrek & Zookeepers - Ark",
      src: "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/199/ark-1586947417-GnJoXlafLl.mp3",
    },
    {
      name: "Rogers & Dean - No Doubt",
      src: "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/381/no-doubt-1586951398-wAuJPbAC5V.mp3",
    },
    {
      name: "Nurko, Last Heroes, Jessie Chambers - Promise Me",
      src: "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/513/promise-me-feat-jessie-chambers-1586955253-chsecOqj8E.mp3",
    },
    {
      name: "Electro-Light - Symbolism",
      src: "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/093/symbolism-1586946511-TalL4nERHU.mp3",
    },
  ];

  const [trackIndex, setTrackIndex] = useState(0);

  const handleClickPrevious = () => {
    setTrackIndex((currentTrack) => (currentTrack === 0 ? musicTracks.length - 1 : currentTrack - 1));
  };

  const handleClickNext = () => {
    setTrackIndex((currentTrack) => (currentTrack < musicTracks.length - 1 ? currentTrack + 1 : 0));
  };
  return (
    <div style={{ zIndex: "100" }}>
      <div className="position-relative fixed-top">
        <button
          className="btn py-2 px-4 rounded-3 btn-primary position-absolute start-99 z-100"
          style={{ marginTop: "80px", backgroundColor: "#f3af34" }}
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasBottom"
          aria-controls="offcanvasBottom"
        >
          🎧
        </button>
      </div>

      <div className="offcanvas offcanvas-bottom rounded-2" style={{ height: "210px", backgroundColor: "#f3af34" }} tabIndex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
        <div className="offcanvas-header d-flex align-items-center text-white pb-0">
          <h5 className="offcanvas-title fw-bold" id="offcanvasBottomLabel">
            Music Player
          </h5>
          <button type="button" className="btn-close m-0" data-bs-dismiss="offcanvas" aria-label="Close">
            <p className="text-white pb-5">✖</p>
          </button>
        </div>
        <div className="offcanvas-body small text-center">
          <AudioPlayer
            style={{ borderRadius: "5px", backgroundColor: "white" }}
            src={musicTracks[trackIndex].src}
            onPlay={(e) => console.log("onPlay")}
            showSkipControls={true}
            showJumpControls={false}
            header={`${musicTracks[trackIndex].name}`}
            onClickPrevious={handleClickPrevious}
            onClickNext={handleClickNext}
            onEnded={handleClickNext}
          />
        </div>
      </div>
    </div>
  );
}

export default Canvas;
