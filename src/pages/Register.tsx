import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonTitle,
  IonModal,
  IonText,
  IonAlert,
} from '@ionic/react';
import { supabase } from '../utils/supabaseClient';
import bcrypt from 'bcryptjs';

// Reusable Alert Component
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

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleOpenVerificationModal = () => {
    if (!email.endsWith("@nbsc.edu.ph")) {
      setAlertMessage("Only @nbsc.edu.ph emails are allowed to register.");
      setShowAlert(true);
      return;
    }

    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match.");
      setShowAlert(true);
      return;
    }

    setShowVerificationModal(true);
  };

  const doRegister = async () => {
    setShowVerificationModal(false);

    try {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        throw new Error("Account creation failed: " + error.message);
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const { error: insertError } = await supabase.from("users").insert([
        {
          username,
          user_email: email,
          user_firstname: firstName,
          user_lastname: lastName,
          user_password: hashedPassword,
        },
      ]);

      if (insertError) {
        throw new Error("Failed to save user data: " + insertError.message);
      }

      setShowSuccessModal(true);
    } catch (err) {
      if (err instanceof Error) {
        setAlertMessage(err.message);
      } else {
        setAlertMessage("An unknown error occurred.");
      }
      setShowAlert(true);
    }
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
            <h2 style={{ color: 'white', marginBottom: '10px' }}>Create your account</h2>
            <p style={{ color: '#ccc', marginBottom: '20px' }}>Enter your details below to sign up</p>

            {/* Input Fields */}
            <div style={{ textAlign: 'left', marginBottom: '15px' }}>
              <label style={{ color: '#ccc', fontSize: '14px' }}>Username</label>
              <IonInput
                fill="outline"
                type="text"
                placeholder="Enter username"
                style={{
                    borderRadius: '12px',
                    marginBottom: '10px',
                    '--highlight-color-focused': '#008000',
                    '--border-color': '#008000'
            }}
                value={username}
                onIonInput={e => setUsername(e.detail.value!)}
              />
            </div>

           
            <div style={{ textAlign: 'left', marginBottom: '15px' }}>
              <label style={{ color: '#ccc', fontSize: '14px' }}>Email</label>
              <IonInput
                fill="outline"
                type="email"
                placeholder="youremail@nbsc.edu.ph"
                style={{
                    borderRadius: '12px',
                    marginBottom: '10px',
                    '--highlight-color-focused': '#008000',
                    '--border-color': '#008000'
            }}
                value={email}
                onIonInput={e => setEmail(e.detail.value!)}
              />
            </div>

            <div style={{ textAlign: 'left', marginBottom: '15px' }}>
              <label style={{ color: '#ccc', fontSize: '14px' }}>Password</label>
              <IonInput
                fill="outline"
                type="password"
                placeholder="Enter password"
                style={{
                    borderRadius: '12px',
                    marginBottom: '10px',
                    '--highlight-color-focused': '#008000',
                    '--border-color': '#008000'
            }}
        
                value={password}
                onIonInput={e => setPassword(e.detail.value!)}
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>
            </div>

            <div style={{ textAlign: 'left', marginBottom: '20px' }}>
              <label style={{ color: '#ccc', fontSize: '14px' }}>Confirm Password</label>
              <IonInput
                fill="outline"
                type="password"
                placeholder="Confirm password"
                style={{
                    borderRadius: '12px',
                    marginBottom: '10px',
                    '--highlight-color-focused': '#008000',
                    '--border-color': '#008000'
            }}
                value={confirmPassword}
                onIonInput={e => setConfirmPassword(e.detail.value!)}
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>
            </div>

            {/* Buttons */}
            <IonButton onClick={handleOpenVerificationModal}  expand="full"
            fill="solid"
            color="success"
            style={{ marginTop: '20px' }} >
             
              Register
            </IonButton>
            <IonButton routerLink="/it35-lab" 
             expand="full"
             fill="clear"
             shape="round"
             color="success">

            Already have an account?
         </IonButton>
          </div>
        </div>

        {/* Modals */}
        <IonModal isOpen={showVerificationModal} onDidDismiss={() => setShowVerificationModal(false)}>
          <IonContent className="ion-padding" style={{ textAlign: 'center' }}>
            <h2>Confirm your details</h2>
            <p><strong>Username:</strong> {username}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Name:</strong> {firstName} {lastName}</p>
            <div style={{ marginTop: '20px' }}>
              <IonButton fill="clear" onClick={() => setShowVerificationModal(false)}>Cancel</IonButton>
              <IonButton color="primary" onClick={doRegister}>Confirm</IonButton>
            </div>
          </IonContent>
        </IonModal>

        <IonModal isOpen={showSuccessModal} onDidDismiss={() => setShowSuccessModal(false)}>
          <IonContent className="ion-padding" style={{ textAlign: 'center', marginTop: '30%' }}>
            <IonTitle>Registration Successful 🎉</IonTitle>
            <IonText>
              <p>Your account has been created successfully.</p>
              <p>Please check your email to verify.</p>
            </IonText>
                                <IonButton routerLink="/it35-lab" routerDirection="back" color="primary">
                                    Go to Login
                                </IonButton>
                           



         
         
          </IonContent>
        </IonModal>

        {/* Reusable Alert */}
        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />
      </IonContent>
    </IonPage>
  );
};

export default Register;
