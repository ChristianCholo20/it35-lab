import {
  IonAlert,
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonToast,
  useIonRouter,
} from '@ionic/react';
import { logoGoogle, logoFacebook } from 'ionicons/icons';
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header="Notification"
      message={message}
      buttons={['OK']}
    />
  );
};

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const doLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
      return;
    }

    setShowToast(true);
    setTimeout(() => {
      navigation.push('/it35-lab/app', 'forward', 'replace');
    }, 300);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          backdropFilter: 'blur(10px)',
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '40px 30px',
            borderRadius: '20px',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            width: '90%',
            maxWidth: '400px',
            textAlign: 'center',
          }}>
            <h2 style={{ color: 'white', marginBottom: '10px' }}>Welcome Back!</h2>
            <p style={{ color: '#ccc', marginBottom: '20px' }}>Enter your details below to sign in into your account</p>

            {/* Google and Facebook Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <IonButton color="light" expand="block" style={{ flex: 1 }} shape="round">
                <IonIcon icon={logoGoogle} slot="start" />
                Google
              </IonButton>
              <IonButton color="primary" expand="block" style={{ flex: 1 }} shape="round">
                <IonIcon icon={logoFacebook} slot="start" />
                Facebook
              </IonButton>
            </div>

            <div style={{
              margin: '20px 0',
              display: 'flex',
              alignItems: 'center',
              color: '#aaa'
            }}>
              <hr style={{ flex: 1, borderColor: '#555' }} />
              <span style={{ padding: '0 10px' }}>or</span>
              <hr style={{ flex: 1, borderColor: '#555' }} />
            </div>

            {/* Email and Password Inputs */}
            <div style={{ textAlign: 'left', marginBottom: '15px' }}>
              <label style={{ color: '#ccc', fontSize: '14px' }}>Email</label>
              <IonInput
                style={{ marginTop: '5px' }}
                fill="outline"
                type="email"
                placeholder="Enter your email"
                value={email}
                onIonInput={e => setEmail(e.detail.value!)}
              />
            </div>

            <div style={{ textAlign: 'left', marginBottom: '15px' }}>
              <label style={{ color: '#ccc', fontSize: '14px' }}>Password</label>
              <IonInput
                style={{ marginTop: '5px' }}
                fill="outline"
                type="password"
                placeholder="Enter Password"
                value={password}
                onIonInput={e => setPassword(e.detail.value!)}
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>
            </div>

            {/* Login Button */}
            <IonButton expand="block" shape="round" onClick={doLogin}>
              Login
            </IonButton>

            {/* Register Link */}
            <div style={{ marginTop: '20px', fontSize: '14px', color: '#ccc' }}>
              Don't have an account? <a href="/it35-lab/register" style={{ color: '#4e9bff' }}>Sign Up</a>
            </div>
          </div>
        </div>

        {/* Alerts and Toasts */}
        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login successful! Redirecting..."
          duration={1500}
          position="top"
          color="primary"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
