import { useEffect, useMemo, useState } from "react";
import getData from "./getData";

const LayoutPage = () => {
  const [layoutData, setLayoutData] = useState(null);
  const [definitionData, setDefinitionData] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  const [formState, setFormState] = useState({
    name: undefined,
    age: undefined,
  });


  // const name = (event) => {
  //   console.log(event.current.value);
  // };

  // const age = (event) => {
  //   console.log(event.current.value);
  // };


  const onChange = (name) => {
    if (name === 'name') {
      setFormState(name: name)
    } else if (name === "age") {
      setdata2('age')
    }
  };

  const getInf = () => {
    console.log(formState)
  }


  useEffect(() => {
    setIsloading(true);
    getData().then((data) => {
      setLayoutData(data.layout);
      setDefinitionData(data.definition);
      setIsloading(false);
    });
  }, []);

  const newLayout = useMemo(() => {
    if (layoutData && definitionData) {
      const layout = {
        rows: layoutData.header.rows.map((row) => {
          return row.columns.map((column) => {
            switch (column.type) {
              case "field":
                const { _id, ...props } = definitionData.schema.fields.find(
                  (field) => field._id === column.fieldId
                );
                const fieldData = { ...column, props };

                return fieldData;
              case "button":
                return column;
              default:
                return column;
            }
          });
        }),
      };

      return layout;
    }
  }, [layoutData, definitionData]);

  console.log(newLayout);

  if (isLoading) {
    return <p> Loading... </p>;
  } else if (newLayout) {
    return (
      <table className="table">
        <tbody>
          {newLayout.rows.map((row, index) => (
            <tr key={index} className="tableRow">
              {row.map((column, index) => {
                if (column.type === "field") {
                  return (
                    <td className="tableColumn" key={column.fieldId}>
                      <p>{column.props.label}</p>
                      <input
                        type={column.props.type}
                        onChange={()=> onChange(column.props.name)} // "name" or "age" --- column.props.name
                        placeholder={column.props.name}
                        maxLength={column.props.maxLength}
                      />
                    </td>
                  );
                } else if (column.type === "button") {
                  return (
                    <td key={index}>
                      <button onClick={getInf} className="button" type={column.type}>
                        {column.label}
                      </button>
                    </td>
                  );
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

// {newLayout.rows.map((row, index) => (
//   <tr key={index}>
//     {row.columns.map((column, index) => {
//       if (column.type === "field") {
//         return (
//           <td>
//             {definitionData.schema.fields.map((field) => {
//               if (field._id === column.fieldId) {
//                 return <input type="text" />;
//               }
//             })}
//           </td>
//         );
//       } else if (column.type === "button") {
//         return <button>BUTTON</button>;
//       }
//     })}
//   </tr>
// ))}
// </tbody>
