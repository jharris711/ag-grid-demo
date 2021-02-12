import React, { useEffect, useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";

const App = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  /* const [rowData, setRowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 }
  ]); */
  const [rowData, setRowData] = useState([]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  const onButtonClick = () => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => node.make + " " + node.model)
      .join(", ");
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  };

  return (
    <div className="ag-theme-balham-dark" style={{ height: 400, width: 600 }}>
      <button onClick={onButtonClick}>Get selected rows</button>
      <AgGridReact
        onGridReady={onGridReady}
        rowData={rowData}
        rowSelection="multiple"
      >
        <AgGridColumn
          field="make"
          sortable
          filter
          checkboxSelection
        ></AgGridColumn>
        <AgGridColumn field="model" sortable filter></AgGridColumn>
        <AgGridColumn field="price" sortable filter></AgGridColumn>
      </AgGridReact>
    </div>
  );
};

export default App;
