import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: 'timeStamp', headerName: 'TimeStamp', width: 200 },
  { field: 'text', headerName: 'Text', width: 500 },
  {
    field: 'position',
    headerName: 'Position',
    width: 130,
    valueGetter: (param: any) => {
      return `[${param.value.x},${param.value.y}]`;
    },
  },
];
