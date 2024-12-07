import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonButton, IonRow, IonCol, IonGrid, IonSpinner } from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import axios from 'axios';
import './AdminDashboard.css';

interface Log {
  patient: string;
  medicine: string;
  time: string;
  status: string;
}

const SuperAdminDashboard: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useIonRouter();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('jwtToken'); // Retrieve JWT from storage
      const response = await axios.get('/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in the Authorization header
        },
      });
      setLogs(response.data.logs); // Assuming API returns logs as part of the response
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const filteredLogs = logs.filter((log) =>
    log.patient.toLowerCase().includes(filter.toLowerCase())
  );

  const navigateToSchedule = () => {
    router.push('/schedule', 'forward');
  };

  return (
    <IonPage>
      <IonContent className="container">
        <div className="filter-item">
          <label htmlFor="filter" className="filter-label">Filter by Patient Name</label>
          <input
            type="text"
            id="filter"
            className="filter-input"
            placeholder="Type patient name..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <IonButton expand="block" className="medicine-btn" onClick={navigateToSchedule}>
          Go to Medicine Schedule
        </IonButton>

        {loading ? (
          <div className="loading">
            <IonSpinner name="crescent" />
            <p>Loading data...</p>
          </div>
        ) : error ? (
          <div className="error">
            <p>{error}</p>
          </div>
        ) : (
          <IonGrid>
            <IonRow className="table-header">
              <IonCol><strong>Patient</strong></IonCol>
              <IonCol><strong>Medicine</strong></IonCol>
              <IonCol><strong>Time</strong></IonCol>
              <IonCol><strong>Status</strong></IonCol>
            </IonRow>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log, index) => (
                <IonRow key={index} className="table-row">
                  <IonCol>{log.patient}</IonCol>
                  <IonCol>{log.medicine}</IonCol>
                  <IonCol>{log.time}</IonCol>
                  <IonCol>{log.status}</IonCol>
                </IonRow>
              ))
            ) : (
              <IonRow>
                <IonCol>No logs available.</IonCol>
              </IonRow>
            )}
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};

export default SuperAdminDashboard;
