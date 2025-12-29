import { useEffect, useContext, useState } from "react";
import { context } from "../context/MyContext";

function FlashMessage() {
  const { flashMessageContent, setFlashMessageContent } = useContext(context);
  const [showMsg, setShowMsg] = useState(false);
  const [animateClass, setAnimateClass] = useState("-translate-y-[100px]");

  let text = "flash message text";
  let type = "success";

  if (flashMessageContent.length > 0) {
    [type, text] = flashMessageContent;
  }

  useEffect(() => {
    if (flashMessageContent.length > 0) {
      setShowMsg(true);

      // show it
      const timer1 = setTimeout(() => {
        setAnimateClass("translate-y-[0px]");
      }, 100);

      // hide it
      const timer2 = setTimeout(() => {
        setAnimateClass("-translate-y-[100px]");
      }, 4000);

      const timer3 = setTimeout(() => {
        setShowMsg(false);
        setFlashMessageContent([]);
      }, 4500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [flashMessageContent]);

  return showMsg ? (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md shadow-lg z-50 border border-2 bg-black text-white font-bold transition duration-300 ${animateClass} ${
        type === "success" ? "border-green-700 text-green-400" : "border-red-700 text-red-400"
      }`}
    >
      {text}
    </div>
  ) : null;
}

export default FlashMessage;
