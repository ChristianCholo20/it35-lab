
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
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
} from '@ionic/react';

const favorites = [
    {
        id: "1",
        title: "Coding & Web Development",
        description: "I love building modern websites and exploring new frameworks like React and Next.js."
    },
    {
        id: "2",
        title: "Cybersecurity & Ethical Hacking",
        description: "Security is a priority in all my projects. I enjoy learning about ethical hacking and secure coding."
    },
    {
        id: "3",
        title: "AI & Machine Learning",
        description: "I'm interested in how AI is transforming industries, from automation to deep learning."
    },
    {
        id: "4",
        title: "Gaming & Esports",
        description: "Gaming is my way to relax and have fun. I enjoy competitive multiplayer games and strategy-based genres."
    },
    {
        id: "5",
        title: "Photography & Travel",
        description: "Capturing moments and exploring new places is something I deeply enjoy."
    }
];

const Favorite: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="header-toolbar">
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>My Favorites</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="favorites-content">
                <IonList>
                    {favorites.map((fav) => (
                        <IonCard key={fav.id} className="favorite-card">
                            <IonCardHeader>
                                <IonCardTitle>{fav.title}</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <p>{fav.description}</p>
                            </IonCardContent>
                        </IonCard>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Favorite;