import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { storage } from "../services/strorage";
import { ref, uploadBytesResumable, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useRouter } from "next/router";
import getCookie from "../utils/getCookie";

function Moments() {
  const navigate = useRouter();
  const [cookie, setCookie] = useState(null);

  useEffect(() => {
    const theCookie = getCookie("token");
    if (!theCookie) {
      navigate.push("/login");
    }
    setCookie(theCookie);
  }, []);

  useEffect(() => {
    listAll(videoListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((videoUrl) => {
          setVideoList((prev) => [...prev, videoUrl]);
        });
      });
    });
  }, []);

  const [videoUpload, setVideoUpload] = useState(null);
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(false);

  const videoListRef = ref(storage, "video/");
  const handleUpload = () => {
    if (videoUpload == null) return;
    setLoading(true);
    const videoRef = ref(storage, `video/${videoUpload.name + v4()}`);
    const uploadTask = uploadBytesResumable(videoRef, videoUpload);
    uploadTask.on(
      "state_change",
      (snapshot) => {
        const progressValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        fixedProgress = progressValue.toFixed();
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((videoUrl) => {
          setVideoList((prev) => [...prev, videoUrl]);
        });
        setLoading(false);
        alert("Upload success");
      }
    );
  };

  return (
    <div style={{ paddingTop: "80px", paddingBottom: "50px" }} className={`bg-black text-white d-flex flex-column align-items-center justify-content-center`}>
      <h1 className={`display-1`}>Moments</h1>
      <p className={`fs-3 mb-4`}>Share your gaming moments here.</p>
      {loading === false ? (
        <div className={`d-flex flex-column gap-2 mb-5`}>
          <input className={`form-control`} type="file" accept="video/*" onChange={(e) => setVideoUpload(e.target.files[0])} />
          <div className={`d-flex justify-content-center align-content-center`}>
            <button className={`btn btn-warning px-5`} onClick={handleUpload}>
              <p className={`fw-bold`}>Upload</p>
            </button>
          </div>
        </div>
      ) : (
        <div className={`mt-2 mb-5`}>
          <p className={`fw-bold fs-3`}>Uploading...</p>
          <div className={"progress"}>
            <div className={"progress-bar progress-bar-striped bg-warning"} role="progressbar" aria-label="Warning striped example" style={{ width: `${fixedProgress}%` }} aria-valuemin="0" aria-valuemax="100">
              {fixedProgress}%
            </div>
          </div>
        </div>
      )}
      <div className={`d-flex flex-wrap gap-5 align-items-center justify-content-center`}>
        {videoList.map((videoUrl) => {
          return (
            <div className={`bg-dark min-w-fit`} key={v4()}>
              <ReactPlayer controls url={videoUrl} width="100%" style={{ aspectRatio: 16 / 9, minWidth: "240px" }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Moments;
