import styles from "./Project.module.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import YouTube from "react-youtube";

library.add(faYoutube, faArrowLeft);

function Project({ project }) {
  const controls = useAnimation();
  const { ref, inView } = useInView();

  const [showYoutube, setshowYoutube] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }

    if (!inView) {
      controls.start("hidden");
    }
  }, [controls, inView]);
  const textBlock = {
    hidden: {
      x: -2000,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  const logoBlock = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: [0, 1.4, 1],
    },
  };

  const contentBoxVariants = {
    hidden: {
      width: ["100vw", "0vw"],
      opacity: [1, 0],
    },
    visible: {
      width: ["0vw", "100vw"],
      opacity: [0, 1],
    },
  };

  const youtubeBoxVariants = {
    hidden: {
      width: ["100vw", "0vw"],
      opacity: [1, 0],
    },
    visible: {
      width: ["0vw", "100vw"],
      opacity: [0, 1],
    },
  };

  const youtubeOptions = {
    height: "390",
    width: "90%",
  };

  return (
    <div ref={ref} className="flex">
      <motion.div
        animate={showYoutube ? "hidden" : "visible"}
        variants={contentBoxVariants}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
      >
        <div key={project.ID} className="grid grid-cols-2 overflow-hidden">
          <motion.div
            initial="hidden"
            transition={{ duration: 0.6 }}
            animate={controls}
            variants={textBlock}
          >
            <div>
              <h1 className="text-center">{project.NAME}</h1>
              <div className={styles.textBlock}>{project.PREVIEW_TEXT}</div>
            </div>
          </motion.div>
          <motion.div initial="hidden" animate={controls} variants={logoBlock}>
            <div className="flex items-center h-full justify-around relative">
              <img src={project.DETAIL_PICTURE} className="w-6/12" />
              {project.PROPERTY_YOUTUBE_LINK_VALUE && (
                <div className="absolute" onClick={() => setshowYoutube(true)}>
                  <FontAwesomeIcon
                    icon={faYoutube}
                    size="lg"
                    className="cursor-pointer text-red-500 w-12"
                  />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
      {project.PROPERTY_YOUTUBE_LINK_VALUE && (
        <motion.div
          animate={showYoutube ? "visible" : "hidden"}
          variants={youtubeBoxVariants}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
        >
          <div>
            <div
              className="cursor-pointer flex items-center pb-4 px-16"
              onClick={() => setshowYoutube(false)}
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                size="lg"
                className="mr-2 text-white w-5"
              />
              <span>Назад</span>
            </div>
            <YouTube
              videoId={project.PROPERTY_YOUTUBE_LINK_VALUE}
              opts={youtubeOptions}
              className="m-auto"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Project;
