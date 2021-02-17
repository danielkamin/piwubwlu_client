import React, { ReactText } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import { getAccessToken } from '../../../../../utils/api/accessToken';
import { Reservation, ReservationState } from '../../../types';
import useStyles from '../../../styles';
import { postData, deleteData } from '../../../../../api/index';
import { Link } from 'react-router-dom';
import RentAction from './RentAction';
import format from 'date-fns/format';
import { useAlertContext, AlertType } from '../../../../../context/AlertContext';
import DeleteModal from '../../../../Shared/Modal/DeleteModal';
interface Props {
  data: Reservation[];
  supervised?: boolean;
  CB: () => Promise<void>;
}
const ReservationsTable: React.FC<Props> = ({ data, supervised, CB }) => {
  const context = useAlertContext();
  const classes = useStyles();
  const handleReject = async (id: ReactText) => {
    await postData('rental/supervised/' + id, getAccessToken(), { accept: false });
    context.openAlert(AlertType.error, 'Odrzucono prośbę o rezerwację!');
    await CB();
  };
  const handleAccept = async (id: ReactText) => {
    await postData('rental/supervised/' + id, getAccessToken(), { accept: true });
    context.openAlert(AlertType.success, 'Zaakceptowano prośbę o rezerwację!');
    await CB();
  };
  const handleDelete = async (id: ReactText) => {
    await deleteData('rental/' + id, getAccessToken());
    context.openAlert(AlertType.info, 'Pomyślnie usunięto rezerwację');
    await CB();
  };
  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Maszyna</TableCell>
            <TableCell>Pracownia</TableCell>
            <TableCell>Data początek</TableCell>
            <TableCell>Data Koniec</TableCell>
            <TableCell>Przyjęta?</TableCell>
            <TableCell>Anuluj</TableCell>
            {supervised ? <TableCell>Akceptuj/Odrzuć</TableCell> : <TableCell>Wypełnij ankietę</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((tRow) => (
            <TableRow key={tRow.id}>
              <TableCell>
                <Link to={`/rezerwacje/${tRow.id}`}>{tRow.id}</Link>
              </TableCell>
              <TableCell>
                <Link to={`/maszyny/${tRow.Machine.id}`}>{tRow.Machine.name}</Link>
              </TableCell>
              <TableCell>
                <Link to={`/pracownie/${tRow.Machine.Workshop.id}`}>{tRow.Machine.Workshop.name}</Link>
              </TableCell>
              <TableCell>{format(new Date(tRow.start_date), 'HH:mm dd/MM/yyyy')}</TableCell>
              <TableCell>{format(new Date(tRow.end_date), 'HH:mm dd/MM/yyyy')}</TableCell>
              <TableCell>{tRow.state}</TableCell>
              <TableCell>
                <DeleteModal
                  triggerText='Usuń'
                  okBtnText='Usuń'
                  title={'Anuluj Rezerwację'}
                  bodyText={'Czy na pewno chcesz anulować rezerwację?'}
                  onApproved={() => {
                    handleDelete(tRow.id);
                  }}
                />
              </TableCell>
              {supervised ? (
                <TableCell>
                  <RentAction onAccepted={() => handleAccept(tRow.id)} onRejected={() => handleReject(tRow.id)} />
                </TableCell>
              ) : (
                tRow?.state === ReservationState.FINISHED &&
                tRow.ReservationSurvey === null && (
                  <TableCell>
                    <Button component={Link} to={`/rezerwacje/${tRow.id}/ankieta/`} color='primary' variant='contained'>
                      Wypełnij Ankietę
                    </Button>
                  </TableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReservationsTable;
