import { useEffect, useMemo, useState } from "react";
import getData from "./getData";
import { Button, Input, Grid, Center } from "@mantine/core";

const LayoutPage = () => {
  const [layoutData, setLayoutData] = useState(null);
  const [definitionData, setDefinitionData] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [formState, setFormState] = useState({});

  const handleChange = (inputType) => (event) => {
    const data = { [inputType]: event.target.value };
    // setFormState(prev => ({...prev, ...data }));
    setFormState({ ...formState, ...data });
  };

  const getInf = () => {
    console.log(formState);
  };

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

  // console.log(newLayout);

  if (isLoading) {
    return <p> Loading... </p>;
  } else if (newLayout) {
    return (
      <Grid>
        {newLayout.rows.map((row, index) => (
          <Grid.Col className="tableRow" key={index}>
            {row.map((column, index) => {
              if (column.type === "field") {
                return (
                  <Center key={column.fieldId}>
                    <Grid.Col className="tableColumn">
                      <p>{column.props.label}</p>
                      <Input
                        radius="xl"
                        type={column.props.type}
                        onChange={handleChange(column.props.name)} // "name" or "age" --- column.props.name
                        placeholder={column.props.name}
                        maxLength={column.props.maxLength}
                      />
                    </Grid.Col>
                  </Center>
                );
              } else if (column.type === "button") {
                return (
                  
                    <Grid.Col className="button" key={index}>
                      <Button
                        variant="gradient"
                        radius="lg"
                        size="md"
                        gradient={{ from: "teal", to: "blue", deg: 60 }}
                        onClick={getInf}
                        type={column.type}
                      >
                        {column.label}
                      </Button>
                    </Grid.Col>
                  
                );
              }
            })}
          </Grid.Col>
        ))}
      </Grid>
    );
  }
};

export default LayoutPage;

// <table className="table">
//         <tbody>
//           {newLayout.rows.map((row, index) => (
//             <tr key={index} className="tableRow">
//               {row.map((column, index) => {
//                 if (column.type === "field") {
//                   return (
//                     <td className="tableColumn" key={column.fieldId}>
//                       <p>{column.props.label}</p>
//                       <Input
//                         radius="xl"
//                         type={column.props.type}
//                         onChange={handleChange(column.props.name)} // "name" or "age" --- column.props.name
//                         placeholder={column.props.name}
//                         maxLength={column.props.maxLength}
//                       />
//                     </td>
//                   );
//                 } else if (column.type === "button") {
//                   return (
//                     <td key={index}>
//                       <Button
//                         variant="gradient"
//                         radius="lg"
//                         size="md"
//                         gradient={{ from: "teal", to: "blue", deg: 60 }}
//                         onClick={getInf}
//                         type={column.type}
//                       >
//                         {column.label}
//                       </Button>
//                     </td>
//                   );
//                 }
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
