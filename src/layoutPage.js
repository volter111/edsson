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
            <tr key={index}>
              {row.columns.map((column, index) => {
                if (column.type === "field") {
                  definitionData.schema.fields.map((fieldData) => {
                    <td>
                      if (fieldData._id === column.fieldId)
                      {console.log(fieldData._id === column.fieldId)}
                    </td>;
                  });
                } else if (column.type === "button") {
                  return <button>BUTTON</button>;
                }
              })}
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
