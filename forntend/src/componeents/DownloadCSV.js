import React from 'react';
import {MdOutlineFileDownload} from "react-icons/md";
import axios from "axios";

// const DownloadCSV = ({ data, fileName }) => {
const DownloadCSV = (prop) => {
  const convertToCSV = (objArray) => {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    console.log(Object.entries(array).length)
    let str = '';
    for (let i = 0; i < Object.keys(array).length; i++) {
      // let line = 'id, message, check';
      let line = '';
      for (let index=0; index < Object.entries(array)[i].length; index++) {
        if (line !== '') line += ' ';
        line += Object.entries(array)[i][index];
      }
      str += line + '\r\n';
      // console.log(str)
    }
    return str;
  };

  const downloadFile = async() => {
      try {
          const csvData = new Blob([convertToCSV(prop.response)], {type: 'application/json'});
          const csvURL = URL.createObjectURL(csvData);
          const tempLink = document.createElement("a");
          tempLink.href = csvURL;
          tempLink.setAttribute(
              "download",
              `result.csv`
          ); // Set the desired filename for the downloaded file

          // Append the <a> element to the body and click it to trigger the download
          document.body.appendChild(tempLink);
          tempLink.click();

          // Clean up the temporary elements and URL
          document.body.removeChild(tempLink);
          window.URL.revokeObjectURL(csvURL);
      }
     catch (error) {
        console.error("Error downloading CSV:", error);
      }
  };

  return (
      <button className="btn_dl" onClick={downloadFile}>Download<MdOutlineFileDownload/></button>
  );
}

export default DownloadCSV;