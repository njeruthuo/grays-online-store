import { AgGridReact } from "ag-grid-react";
import { ColDef, ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";

// Register required AG Grid modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface RowTypes {
  id: number;
  name: string;
  price: string | number;
  quantity: number | string;
  available: boolean;
}

const ReusableTable = ({ rows }: { rows: RowTypes[] }) => {
  const colDefs: ColDef<RowTypes>[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Product Name", flex: 2 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
    { field: "available", headerName: "Stocked", flex: 1 },
  ];

  return (
    <div style={{ height: 300, width: "100%" }} className="ag-theme-alpine">
      <AgGridReact rowData={rows} columnDefs={colDefs} />
    </div>
  );
};
export default ReusableTable;
