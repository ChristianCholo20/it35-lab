import { 
    IonButtons,
    IonContent, 
    IonHeader, 
    IonMenuButton, 
    IonPage, 
    IonTitle, 
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonImg
  } from '@ionic/react';
  
  const Feed: React.FC = () => {
    // Example contact data
    const contacts = [
      { id: 1, name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 2, name: 'Samantha Lee', avatar: 'https://i.pravatar.cc/150?img=2' },
      { id: 3, name: 'Chris Evans', avatar: 'https://i.pravatar.cc/150?img=3' },
    ];
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Feed</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent fullscreen>
  
          <IonList>
            {contacts.map(contact => (
              <IonItem key={contact.id}>
                <IonAvatar slot="start">
                  <IonImg src={contact.avatar} />
                </IonAvatar>
                <IonLabel>{contact.name}</IonLabel>
              </IonItem>
            ))}
          </IonList>
          
        </IonContent>
      </IonPage>
    );
  };
  
  export default Feed;
  