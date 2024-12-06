import React, { useState } from 'react';
import { IonContent, IonPage, IonLabel, IonButton, IonItem, IonInput, IonList, IonRow, IonCol } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './AdminDashboard.css';

interface Log {
  patient: string;
  medicine: string;
  time: string;
  status: string;
}

const SuperAdminDashboard: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([
    { patient: 'John Doe', medicine: 'Aspirin', time: '08:00 AM', status: 'Taken' },
    { patient: 'Jane Smith', medicine: 'Ibuprofen', time: '09:00 AM', status: 'Not Taken' },
  ]);

  const [filter, setFilter] = useState<string>('');
  const history = useHistory();

  const filteredLogs = logs.filter(log => log.patient.toLowerCase().includes(filter.toLowerCase()));

  const handleNavigateToSchedule = () => {
    history.push('/schedule'); // Navigate to the MedicineSchedule page
  };

  return (
    <IonPage>
      <IonContent className="container">
        <div className="filter-item">
          <label className="filter-label">Filter by Patient Name</label>
          <input
            type="text"
            id="filter"
            className="filter-input"
            placeholder="Type patient name..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <IonRow>
          <IonCol>
            <IonButton onClick={handleNavigateToSchedule} className='medicine-btn'>Go to Medicine</IonButton>
          </IonCol>
        </IonRow>

        <IonRow class='table'>
          <IonCol class='th'><strong>Patient</strong></IonCol>
          <IonCol class='th'><strong>Medicine</strong></IonCol>
          <IonCol class='th'><strong>Time</strong></IonCol>
          <IonCol class='th'><strong>Status</strong></IonCol>
        </IonRow>
        {filteredLogs.map((log, index) => (
          <IonRow key={index} class='tr'>
            <IonCol class='td'>{log.patient}</IonCol>
            <IonCol class='td'>{log.medicine}</IonCol>
            <IonCol class='td'>{log.time}</IonCol>
            <IonCol class='td'>{log.status}</IonCol>
          </IonRow>
        ))}
    </IonContent>
  </IonPage>
  );
};

export default SuperAdminDashboard;
