import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";

// Register required AG Grid modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface RowTypes {
  id: number;
  name: string;
  price: string | number;
  quantity: number | string;
}

const ReusableTable = ({ rows }: { rows: RowTypes }) => {
  const [colDefs, setColDefs] = useState([
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", flex: 1 },
    { field: "price", flex: 1 },
    { field: "quantity", flex: 1 },
    { field: "available", headerName: "Available", flex: 1 },
  ]);

  return (
    <div style={{ height: 300, width: "100%" }} className="ag-theme-alpine">
      <AgGridReact rowData={rows} columnDefs={colDefs} />
    </div>
  );
};
export default ReusableTable;
