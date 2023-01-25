import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { Stack, useState, useEffect } from "react";
import { Oval, ThreeDots } from "react-loader-spinner";
import Availability from "../components/Availability";

export default function Home() {
  const [syllableCount, setSyllableCount] = useState("2");
  const [brandName, setBrandName] = useState("");
  const [brandNameLastChecked, setBrandNameLastChecked] = useState("");
  const [showDomains, setShowDomains] = useState(false);
  const [isCheckingDomains, setIsCheckingDomains] = useState(false);
  const [isGeneratingName, setIsGeneratingName] = useState(false);

  const [isComAvailable, setIsComAvailable] = useState(false);
  const [isAppAvailable, setIsAppAvailable] = useState(false);
  const [isIoAvailable, setIsIoAvailable] = useState(false);
  const [isNetAvailable, setIsNetAvailable] = useState(false);
  const [isOrgAvailable, setIsOrgAvailable] = useState(false);
  const [isCoAvailable, setIsCoAvailable] = useState(false);

  useEffect(() => {
    generateName();
    return () => {
      console.log("Umounted");
    };
  }, []);

  const waitForTwoSeconds = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  const generateName = async () => {
    setIsGeneratingName(true);
    //await waitForTwoSeconds();
    const response = await fetch(
      "http://localhost:3000/api/name?sc=" + syllableCount
    );
    const data = await response
      .json()
      .then((d) => setBrandName(d.name))
      .catch((error) => alert("An error occurred, try again!"));
    setIsGeneratingName(false);
  };

  const checkDomain = async (domain, tld) => {
    // https://stackoverflow.com/a/50101022
    AbortSignal.timeout ??= function timeout(ms) {
      const ctrl = new AbortController();
      setTimeout(() => ctrl.close(), ms);
      return ctrl.signal;
    };

    const fullhost = "http://" + domain + tld;
    var options = {
      host: fullhost,
      method: "HEAD",
      path: "/",
      mode: "no-cors",
      signal: AbortSignal.timeout(10000),
    };
    var isAvailable = false;
    console.log("Checking " + fullhost + " ...");
    await fetch(fullhost, options)
      .then((_) => (isAvailable = false))
      .catch((err) => {
        isAvailable = true;
      });
    return isAvailable;
  };

  const checkDomains = async () => {
    setBrandNameLastChecked(brandName);
    setShowDomains(true);
    setIsCheckingDomains(true);
    await Promise.all([
      checkDomain(brandName, ".com"),
      checkDomain(brandName, ".app"),
      checkDomain(brandName, ".io"),
      checkDomain(brandName, ".net"),
      checkDomain(brandName, ".org"),
      checkDomain(brandName, ".co"),
    ])
      .then(([com, app, io, net, org, co]) => {
        setIsComAvailable(com);
        setIsAppAvailable(app);
        setIsIoAvailable(io);
        setIsNetAvailable(net);
        setIsOrgAvailable(org);
        setIsCoAvailable(co);
      })
      .catch(() => alert("An unexpected error occurred, try again later."));

    //const json = await data.json();
    //console.log(json);
    setIsCheckingDomains(false);
  };

  const selectSyllableCount = (event) => {
    console.log("selected " + event.target.value);
    setSyllableCount(event.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Catchy Brand Name Generator</title>
        <meta name="description" content="Catchy Brand Name Generator" />
        <meta name="viewport" content="width=device-width"></meta>
        <meta name="application-name" content="Catchy Brand Name Generator" />
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
        <button className={styles.button2} onClick={checkDomains}>
          Check Domain availability
        </button>
        <div className={styles.spacerSmaller} />
        <div className={styles.tinyText}>Results may not be 100% accurate.</div>
        <div className={styles.spacerSmall} />
        {showDomains &&
          (isCheckingDomains ? (
            <Oval
              height={80}
              width={80}
              color="#0070f3"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#0070f388"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          ) : (
            brandNameLastChecked && (
              <table className={styles.table}>
                <thead></thead>
                <tbody>
                  <tr>
                    <td className={styles.tableColumnOne}>
                      {brandNameLastChecked}.com
                    </td>
                    <td>
                      <Availability value={isComAvailable} />
                    </td>
                  </tr>
                  <tr>
                    <td>{brandNameLastChecked}.app</td>
                    <td>
                      <Availability value={isAppAvailable} />
                    </td>
                  </tr>
                  <tr>
                    <td>{brandNameLastChecked}.io</td>
                    <td>
                      <Availability value={isIoAvailable} />
                    </td>
                  </tr>
                  <tr>
                    <td>{brandNameLastChecked}.net</td>
                    <td>
                      <Availability value={isNetAvailable} />
                    </td>
                  </tr>
                  <tr>
                    <td>{brandNameLastChecked}.org</td>
                    <td>
                      <Availability value={isOrgAvailable} />
                    </td>
                  </tr>
                  <tr>
                    <td>{brandNameLastChecked}.co</td>
                    <td>
                      <Availability value={isCoAvailable} />
                    </td>
                  </tr>
                </tbody>
              </table>
            )
          ))}
        <div className={styles.spacerSmall} />
        <p>
          <strong>Why Catchy Brand Name Generator?</strong>
        </p>
        <div className={styles.spacerSmall} />
        <p>
          A catchy, easy to remember name can definitely do some of the
          marketing for you.
        </p>
        <p>However, such names are hard to come by or think of.</p>
        <div className={styles.spacerSmall} />
        <p>Yet many of them follow roughly one of the following patterns:</p>
        <div className={styles.spacerSmaller} />
        <p className={styles.tinyText} style={{ lineHeight: "14px" }}>
          (C = Consonant or combination thereof, <br></br> V = Vowel or
          combination thereof)
        </p>
        <div className={styles.spacerSmaller} />
        <p>VCV, VCVC, CVCV, CVCVC</p>
        <div className={styles.spacerSmall} />
        <p>Like Apple, Tesla, Uber, Honda, Audi, Intel, Linux, ...</p>
        <div className={styles.spacerSmall} />
        <p>
          Catchy Brand Generator generates names following this pattern,{" "}
          <br></br>in addition to following some other heuristics.
        </p>
        <div className={styles.spacerSmaller} />
        <p>
          Most of the names generated are quick and easy to pronounce as well as
          memorize.
        </p>
        <p>
          The generated terms mostly don't carry any meaning, which may also be
          desired.
        </p>
        <div className={styles.spacerSmaller} />
        <p>Examples of innovative, modern names this generates are:</p>
        <p>Yeebsi, Pludra, Jeanpine, Vooper, and Tingpate.</p>
        <div className={styles.spacerSmall} />
        <button onClick={() => window.open("https://ko-fi.com/yscodes")}>
          Support me on Ko-Fi 💝
        </button>
      </main>

      <footer>
        <div>
          &copy; 2023 | Made <span> </span>
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
        {/*<script
          data-goatcounter="https://ssssssss.goatcounter.com/count"
          async
          src="//gc.zgo.at/count.js"
  ></script>*/}
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
