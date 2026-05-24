import { useEffect } from "react";

const APP_NAME = "DineMaster";

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title ? title : APP_NAME;
  }, [title]);
};

export default useDocumentTitle;
