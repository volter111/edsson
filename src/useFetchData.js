import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = () => {
  const [layoutData, setLayoutData] = useState(null);
  const [definitionData, setDefinitionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      axios
        .get("http://localhost:3500/layout")
        .catch((error) => setError(error)),
      axios
        .get("http://localhost:3500/documentDefinition")
        .catch((error) => setError(error)),
    ]).then(([layoutDataResponce, definitionDataResponse]) => {
      setLayoutData(layoutDataResponce.data);
      setDefinitionData(definitionDataResponse.data);
      setIsLoading(false);
    });
  }, []);
  return [layoutData, definitionData, isLoading, isError];
};

//   useEffect(() => {
//     fetch(url)
//       .then((responce) => {
//         return responce.json();
//       })
//       .then((data) => {
//         setData(data);
//         setIsLoading(false);
//         setError(null);
//       })
//       .catch((err) => {
//         if (err.name === "AbortError") {
//           console.log("fetch aborted");
//         } else {
//           setError(err.message);
//           setIsLoading(false);
//         }
//       });
//   }, [url]);
//   return [data, isLoading, isError];
// };

export default useFetchData;
