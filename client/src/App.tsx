import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
}   from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import MedicineSchedule from './pages/MedicineSchedule';  
import SuperAdminDashboard from './pages/SuperAdminDashboard';  
import Login from './pages/Login';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
        <IonRouterOutlet>
        <Route exact path="/login">
           <Login />
        </Route>
        <Route exact path="/schedule">
            <MedicineSchedule />
        </Route>
        <Route exact path="/admin">
            <SuperAdminDashboard />
        </Route>
          
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
