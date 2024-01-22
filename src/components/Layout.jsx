import CodeEditor from "./CodeEditor";
import axios from "axios";
import classnames from "../utils/general";
import defineTheme from "../lib/defineTheme";
import OutputWindow from "./OutputWindow";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguageDropdown from "./LanguageDropdown"
import { useEffect, useState } from "react";
import useKeyPress from "../hooks/useKeyPress";
import CustomInput from "./CustomInput";
import { ToastContainer, toast } from "react-toastify";

const javascriptDefault = `/** 
*Start Your Code. !!
*/`;
const Layout = () => {
  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState("javaScript");
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");
  const onSelectChange = (sl) => {
    console.log("Selected Option", sl);
    setLanguage(sl);
  };
  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPerss", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not Handled!", action, data);
      }
    }
  };

  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: 63,
      source_code: btoa(code),
      stdin: btoa(customInput),
    };

    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Host": "demo-project70639.p.rapidapi.com",
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        let status = err.response.status;
        console.log("Status: ", status);
        if (status === 429) {
          console.log("To many request", status);
          showErrorToast(
            `Quota of 100 request exceeded for the day! Please come again`,
            100
          );
        }
        setProcessing(false);
        console.log("catch block-----", error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;
      if (statusId === 1 || statusId === 2) {
        setTimeout((token) => {}, 2000);
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Seccesfully!!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("Error:--", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  // function handleThemeChange(th) {
  //   const theme = th;
  //   console.log("Themwn----", theme);

  //   if (["light", "vs-dark"].includes(theme.value)) {
  //     setTheme(theme);
  //   } else {
  //     defineTheme(theme.value).then((_) => setTheme(theme));
  //   }
  // }
  // useEffect(() => {
  //   defineTheme("oceanic-next").then((_) =>
  //     setTheme({ value: "oceanic-next", label: "Oceanic Next" })
  //   );
  // }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again. . . `, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <div className="flex flex-row">
        <div className="px-4 py-2">
          <LanguageDropdown onSelectChange={onSelectChange} language={language} />
        </div>
        <div className="px-4 py-2">
          {/* <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} /> */}
        </div>
      </div>
      <div className="flex lg:flex-row flex-col space-x-4 items-start p-4">
        <div className="flex flex-col w-full h-full justify-start items-end">
          <CodeEditor
            code={code}
            onChange={onChange}
            language={`javascript`}
            theme={theme}
          />
        </div>
        <div className="right-container flex flex-shrink-0 w-[30%] flex-col gap-2">
          <OutputWindow outputDetails={outputDetails} />
       
          <CustomInput
            customInput={customInput}
            setCustomInput={setCustomInput}
          />
          <button className=" btn btn-primary"
            onClick={handleCompile}
            disabled={!code}
            className={classnames(
              "mt-4 border border-red-400 z-10 rounded-lg shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
              !code ? "opacity-50" : ""
            )}
          >
            {processing ? "Processing..." : "Compile & Execute"}
          </button>
        </div>
        {outputDetails && <OutputDetails outputDetails={outputDetails} />}
      </div>
    </>
  );
};

export default Layout;
