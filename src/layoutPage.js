import useFetchData from "./useFetchData";

const LayoutPage = () => {
  const [layoutData, definitionData, isLoading, isError] = useFetchData();

  if (isLoading) {
    return <p> Loading... </p>;
  } else if (isError) {
    return <p> Loading error! </p>;
  } else {
    return (
      <table className="table">
        <tbody>
          {layoutData.header.rows.map((row, index) => (
            <tr key={index} className="tableRow">
              {row.columns.map((column) => { 
                
              })
              }
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
};

export default LayoutPage;

// if (column.type === 'field') {
//   return <td>{column.type}</td>
// } else if (column.type === "button") {
//   return <td>{column.type}</td>
// }