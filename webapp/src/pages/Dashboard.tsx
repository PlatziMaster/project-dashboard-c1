import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonModal,
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle
} from "@ionic/react";

import Filter from "./../components/Filter";
import RenderAreaChart from "./../components/RenderAreaChart";
import RenderPieChart from "./../components/RenderPieChart";
import RenderStackedBarChart from "./../components/RenderStackedBarChart";
import "./Dashboard.css";

import { sub, format } from 'date-fns';

const Dashboard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const [stats, setStats] = useState({
    countConversations: 0,
    countConversationsByTime: [],
    groupByRateConversations: [],
    groupByRateConversationsByTime: []
  });

  useEffect(() => {
    const today = new Date();
    const endAt = format(today, 'yyyy/MM/dd');
    const startAt = format(sub(today, {days: 7}), 'yyyy/MM/dd');
    fetch(`http://localhost:3000/api/conversations/stats?start_date=${startAt}&end_date=${endAt}`)
      .then(data => data.json())
      .then(data => setStats(data));
  }, []);

  const updateFilter = (option: any) => {
    setShowModal(false);
    const endAt = option.endAt;
    const startAt = option.startAt;
    fetch(`http://localhost:3000/api/conversations/stats?start_date=${startAt}&end_date=${endAt}`)
      .then(data => data.json())
      .then(data => setStats(data));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowModal(true)}>Filters</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="grid">

          <IonCard className="grid--card">
            <IonCardHeader>
               <IonCardTitle>Número de conversaciones ({stats.countConversations})</IonCardTitle>
            </IonCardHeader>
            <div className="card--chart">
              <RenderAreaChart data={stats.countConversationsByTime}></RenderAreaChart>
            </div>
          </IonCard>
          <IonCard className="grid--card">
            <IonCardHeader>
               <IonCardTitle>Número de conversaciones por calificación</IonCardTitle>
            </IonCardHeader>
            <div className="card--chart">
              <RenderPieChart data={stats.groupByRateConversations}></RenderPieChart>
            </div>
          </IonCard>
          <IonCard className="grid--card">
            <IonCardHeader>
               <IonCardTitle>Número de conversaciones por calificación en el tiempo</IonCardTitle>
            </IonCardHeader>
            <div className="card--chart">
              <RenderStackedBarChart data={stats.groupByRateConversationsByTime}></RenderStackedBarChart>
            </div>
          </IonCard>
        </div>
        <IonModal isOpen={showModal}>
          <Filter updateFilter={updateFilter}></Filter>
          <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
