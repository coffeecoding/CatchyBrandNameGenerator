import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";
import { Oval, ThreeDots } from "react-loader-spinner";
import Availability from "../components/Availability";

const env = process.env.NODE_ENV;

export default function Home() {
  const [syllableCount, setSyllableCount] = useState("2");
  const [brandName, setBrandName] = useState("");
  const [isGeneratingName, setIsGeneratingName] = useState(false);

  useEffect(() => {
    generateName();
    return () => {
      console.log("Umounted");
    };
  }, []);

  const generateName = async () => {
    setIsGeneratingName(true);
    //await waitForTwoSeconds();
    const response = await fetch(
      (env === "development"
        ? "http://localhost:3001/api/name?sc="
        : "https://catchybrand.vercel.app/api/name?sc=") + syllableCount
    );
    const data = await response
      .json()
      .then((d) => setBrandName(d.name))
      .catch((error) => alert("An error occurred, try again!"));
    setIsGeneratingName(false);
  };

  const logLookup = async () => {
    const host =
      env === "development"
        ? "http://localhost:3000/api/log"
        : "https://catchybrand.vercel.app/api/log";
    await fetch(host, {
      method: "POST",
      headers: new Headers({
        "content-type": "text/plain",
      }),
      body: brandName,
    }).catch(() => {});
  };

  const selectSyllableCount = (event) => {
    console.log("selected " + event.target.value);
    setSyllableCount(event.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Brand Name Generator</title>
        <meta name="description" content="Brand Name Generator" />
        <meta name="viewport" content="width=device-width"></meta>
        <meta name="application-name" content="Brand Name Generator" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <h1>Catchy Brand Name Generator</h1>
        <p>9 of the 10 most successful brand names have 3 or less syllables.</p>
        <p>Of the top 100, about 75% do.</p>
        <p>
          <strong>Generate yours below.</strong>
        </p>
        <div className={styles.spacerSmall} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: 224,
          }}
        >
          <div style={{ display: "flex" }}>
            <label style={{ cursor: "pointer" }}>
              <input
                type={"radio"}
                value={"2"}
                checked={syllableCount === "2"}
                onChange={selectSyllableCount}
              />
              2 Syllables
            </label>
          </div>
          <div style={{ display: "flex" }}>
            <label style={{ cursor: "pointer" }}>
              <input
                type={"radio"}
                value={"3"}
                checked={syllableCount === "3"}
                onChange={selectSyllableCount}
              />
              3 Syllables
            </label>
          </div>
        </div>
        <div className={styles.spacerSmaller} />
        {isGeneratingName ? (
          <ThreeDots
            height="50"
            width="40"
            radius="5"
            color="#0070f3"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        ) : (
          <div style={{ height: 50, display: "flex", alignItems: "end" }}>
            <button onClick={generateName}>Generate New</button>
          </div>
        )}
        <div className={styles.spacerSmall} />
        <div className={styles.brand}>{brandName}</div>
        <div className={styles.spacer} />
        <p>
          Like it? Check availabilities of top domain names while you're at it!
        </p>
        <div className={styles.spacerSmall} />
        <div className={styles.tinyText}>
          Redirects to instantdomainsearch.com
        </div>
        <div className={styles.spacerSmaller} />
        <a target="_blank" rel="noopener noreferrer">
          <button
            className={styles.button2}
            onClick={async () => {
              await logLookup();
              window.open("https://instantdomainsearch.com/?q=" + brandName);
            }}
          >
            Check Domain Availability
          </button>
        </a>
        <div className={styles.spacerSmall} />
        <div className={styles.spacerSmall} />
        <p>
          <strong>Why Brand Name Generator?</strong>
        </p>
        <div className={styles.spacerSmall} />
        <p>
          A catchy, easy to remember name can do some of the marketing for you.
        </p>
        <p>
          However, it may be a challenging to come up with a unique such name.
        </p>
        <div className={styles.spacerSmall} />
        <p>What's more, a brand name doesn't need to have a meaning.</p>
        <p>
          Many successful brand names simply follow roughly one of these
          patterns:
        </p>
        <div className={styles.spacerSmaller} />
        <p className={styles.tinyText} style={{ lineHeight: "14px" }}>
          (C = Consonant or combination thereof, <br></br> V = Vowel or
          combination thereof)
        </p>
        <div className={styles.spacerSmaller} />
        <p>VCV, VCVC, CVCV, CVCVC</p>
        <div className={styles.spacerSmall} />
        <p>
          Kind of like Sony, Xerox, Google, Pantone, ... well, you get the
          point.
        </p>
        <div className={styles.spacerSmall} />
        <p>
          Brand Name Generator generates names following this pattern, <br />
          in addition to following some other heuristics.
        </p>
        <div className={styles.spacerSmaller} />
        <p>
          However it may take a few tries to come across a great one.
          <br />
          So keep spamming that <strong>Generate New</strong> button!
        </p>
        <div className={styles.spacerSmall} />
        <button onClick={() => window.open("https://ko-fi.com/yscodes")}>
          Support me on Ko-Fi 💝
        </button>
      </main>

      <footer>
        <div>
          &copy; 2023 Brandnamer | Made <span> </span>
          <span> </span>by WiseCodes
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.twitter.com/yscodes"
            className={styles.twitterLogo}
          >
            <img src="twitter.svg" />
          </a>
        </div>
        <div dangerouslySetInnerHTML={{ __html: "<div></div>" }} />
        <script
          data-goatcounter="https://catchybrand.goatcounter.com/count"
          async
          src="//gc.zgo.at/count.js"
        ></script>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 0 2vw;
        }
      `}</style>
    </div>
  );
}
