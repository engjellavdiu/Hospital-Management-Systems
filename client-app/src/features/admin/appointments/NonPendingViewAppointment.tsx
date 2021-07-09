import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Divider, Grid, Header, Icon, Item, Segment, Label, Container, Message } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import DoctorProfileCard from "./DoctorProfileCard";
import PatientProfileCard from "./PatientProfileCard";

interface Props {
  id: string
}

export default observer(function NonPendingViewAppointment({ id }: Props) {
  const { appointmentsStore: { loadAppointment, selectedAppointment }, modalStore } = useStore();

  const [details, setDetails] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState(false);

  useEffect(() => {
    if (id) loadAppointment(id);
  }, [id, loadAppointment]);

  return (
    <>
      <Header content='Appointment details' />
      <Divider />
      <Grid>
        <Grid.Column width='8' textAlign='center'>
          <Icon name='user' color='teal' /><span>Participants</span>
          <Divider />
          <PatientProfileCard patient={selectedAppointment?.patient!} />
          <br />
          <DoctorProfileCard doctor={selectedAppointment?.doctor!} />
        </Grid.Column>
        <Grid.Column width='8' textAlign='left'>
          <Icon name='info circle' color='teal' /><span>Details</span>
          <Divider />
          {selectedAppointment?.status === 'Active' &&
            <Message
              icon='check'
              header='This appointment is scheduled and active'
              content='Once this appointment is completed with the patient, click the Mark as Completed button below'
            />
          }
          <Segment color={selectedAppointment?.status === 'Active'
            || selectedAppointment?.status === 'Completed' ? 'green' : 'red'} inverted>
            {selectedAppointment?.status}
          </Segment>
          <Label content='Date and Time' />
          <Segment.Group>
            <Segment>
              <Icon name='calendar' color='teal' /><span>{selectedAppointment?.date.toString().split('T')[0]}</span>
            </Segment>
            <Segment>
              <Icon name='time' color='teal' /><span>{(selectedAppointment?.date.toString().split('T')[1])?.split(":")[0]
                + ":" + (selectedAppointment?.date.toString().split('T')[1])?.split(":")[1]}</span>
            </Segment>
            <Segment>
              <Icon name='location arrow' color='teal' /><span>MedCare Hospital, Prishtina 10000, Kosovo</span>
            </Segment>
          </Segment.Group>
          <br />
          <Label content='Reason for appointment' />
          <Segment>
            {selectedAppointment?.reason}
          </Segment>
          <Label content='Comment by patient' />
          <Segment>
            {selectedAppointment?.comment ? selectedAppointment?.comment : 'No comment'}
          </Segment>
        </Grid.Column>
      </Grid>
    </>
  );
});
