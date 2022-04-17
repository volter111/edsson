// import { useState, useEffect } from "react";
// import axios from "axios";

// const useFetchData = () => {


//   const getData = async () => {
//     await Promise.all([
//       axios
//         .get("http://localhost:3500/layout")
//         .catch((error) => setError(error)),
//       axios
//         .get("http://localhost:3500/documentDefinition")
//         .catch((error) => setError(error)),
//     ]).then(([layoutDataResponce, definitionDataResponse]) => {
//       return(layoutDataResponce.data, definitionDataResponse.data)
//     });
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return [layoutData, definitionData, isLoading, isError];
// };


// export default useFetchData;
