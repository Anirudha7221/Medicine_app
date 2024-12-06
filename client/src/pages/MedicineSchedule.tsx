import React, { useState } from 'react';
import { IonContent, IonPage, IonCard, IonCardContent, IonLabel, IonButton, IonInput, IonItem, IonList, IonCardHeader, IonSelect, IonSelectOption } from '@ionic/react';
import './Medicine.css';

interface Schedule {
  medicine: string;
  time: string;
}

const MedicineSchedule: React.FC = () => {
  const [newmedicine, setNewmedicine] = useState<string>('');
  const [time, setTime] = useState<string>(''); 
  const [schedules, setSchedules] = useState<Schedule[]>([]); 

  const medicineOptions = ['Aspirin', 'Ibuprofen', 'Paracetamol', 'Amoxicillin', 'Metformin'];

  const addSchedule = () => {
    if (newmedicine && time) {
      setSchedules([...schedules, { medicine: newmedicine, time }]);
      setNewmedicine('');
      setTime('');
    }
  };

  return (
    <IonPage>
      <IonContent class='medicine-container'>
        <div className="form-container">
            <IonItem className="form-item">
              <IonLabel>Select Medicine</IonLabel>
              <IonSelect 
                value={newmedicine} 
                onIonChange={(e) => setNewmedicine(e.detail.value!)} 
                placeholder="Enter medicine name"
                className="select-field"
              >
                 {medicineOptions.map((medicine, index) => (
                    <IonSelectOption key={index} value={medicine}>
                      {medicine}
                    </IonSelectOption>
                  ))}
              </IonSelect>
            </IonItem>

            <IonItem className="form-item">
              <IonLabel position="stacked">Time</IonLabel>
              <IonInput
                type="time"
                value={time}
                onIonChange={(e) => setTime(e.detail.value!)}
                className="input-field"
              />
            </IonItem>
              <IonButton expand="block" onClick={addSchedule} className="add-button">
                  Add Schedule
            </IonButton>
         </div>

         <IonList>
          {schedules.map((schedule, index) => (
            <IonCard key={index} className="schedule-card">
              <IonCardContent>
                <div className="schedule-details">
                  <div className="schedule-info">
                    <h3>{schedule.medicine}</h3>
                    <p>{schedule.time}</p>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default MedicineSchedule;
