import { Alert, Box, Button, Snackbar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useMutation, useQuery } from '@tanstack/react-query';
import Header from '../../component/Header.component';
import PageLayout from '../../component/PageLayout.component';
import { IServiceResult, IVisulInfo } from '../../general/interface';
import { columns } from './History.grid';
import './History.css';
import PageBody from '../../component/PageBody.component';
import {
  defaultHeader,
  DeleteHistoryAddress,
  HistoryAddress,
} from '../../general/serviceAddress';
import { useEffect, useState } from 'react';
import UserAlert from '../../component/UserAlert.component';

export default function History() {
  const { data: serviceResult } = useQuery<IServiceResult<IVisulInfo[]>>({
    queryKey: ['history'],
    queryFn: () => fetch(HistoryAddress).then((res) => res.json()),
  });

  return (
    <PageLayout>
      <Header text={'Visual Info History'} />
      <PageBody>{serviceResult && <Content rows={serviceResult.data} />}</PageBody>
    </PageLayout>
  );
}
const Content = ({ rows }: { rows: IVisulInfo[] }) => {
  const handleDelete = () => {
    deleteHsitory.mutate();
  };
  const [open, setOpen] = useState<boolean>(false);
  const [lrows, setlrows] = useState<IVisulInfo[]>([]);
  useEffect(() => {
    if (rows) setlrows(rows);
  }, [rows]);

  const deleteHsitory = useMutation({
    mutationFn: () =>
      fetch(DeleteHistoryAddress, {
        method: 'delete',
        headers: defaultHeader,
      }).then(() => {
        setlrows([]);
        setOpen(true);
      }),
  });

  return (
    <Box className='dataGrid'>
      {lrows && lrows.length > 0 ? (
        <>
          <DataGrid rows={lrows} columns={columns} getRowId={(e) => e.timeStamp} />
          <Box>
            <Button variant='outlined' color='error' onClick={handleDelete}>
              Delete All History
            </Button>
          </Box>
        </>
      ) : (
        <Alert severity='info'>No history to Display</Alert>
      )}
      <UserAlert
        open={open}
        setOpen={setOpen}
        text={' All history deleted successfully!'}
      />
    </Box>
  );
};
