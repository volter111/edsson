import { useEffect, useMemo, useState } from "react";
import getData from "./getData";

const LayoutPage = () => {
  const [layoutData, setLayoutData] = useState(null);
  const [definitionData, setDefinitionData] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setIsloading(true);
    getData().then((data) => {
      setLayoutData(data.layout);
      setDefinitionData(data.definition);
      setIsloading(false);
    });
  }, []);

  // console.log(layoutData);
  // console.log(definitionData);

  const newLayout = useMemo(() => {
    if (layoutData && definitionData) {
      const layout = {
        rows: layoutData.header.rows.map((row) => {
          return row.columns.map((column) => {
            
            const { fieldId, ...layoutData } = column;

            const props = definitionData.schema.fields.filter((field) => {
              const {_id, ...props } = field
              if (_id === fieldId) {
                return {...props}
              }
            })

            // console.log(props)

            switch (column.type) {
              case "button":
                return column;

              case "field":
                return {...layoutData, props};

              default:
                console.log("Wrong data");
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
  } else {
    return (
      <table className="table">
        {/* <tbody>
          {layoutData.header.rows.map((row, index) => (
            <tr key={index}>
              {row.columns.map((column, index) => {
                if (column.type === "field") {
                  return (
                    <td>
                      {definitionData.schema.fields.map((field) => {
                        if (field._id === column.fieldId) {
                          return <input type="text" />;
                        }
                      })}
                    </td>
                  );
                } else if (column.type === "button") {
                  return <button>BUTTON</button>;
                }
              })}
            </tr>
          ))}
        </tbody> */}
      </table>
    );
  }
};

export default LayoutPage;

// // const { fieldId } = column;
// if (column.type === "field") {
//    definitionData.schema.fields.map((field) => {
//     const { _id, ...fieldProps } = field;
//     if (field._id === column.fieldId) {
//       return { ...column, fieldProps };
//     }
//   });
// } else if (column.type === "button") {
//   return column;
// }

// switch (column.type) {
//             case "button":
//               return column;

//             case "field":
//               definitionData.schema.fields.map((field) => {
//                 const { _id, ...fieldProps } = field;
//                 console.log(field)
//                 if (field._id === column.fieldId) {
//                   return { ...column, fieldProps };
//                 }
//               });
//               break;

//             default:
//               console.log("Cant read data...");
//           }
