// mqtt.service.ts
import { Injectable } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService {
  private client: mqtt.MqttClient;

  constructor() {
    this.client = mqtt.connect('mqtt://mqtt.eclipse.org'); // Use o seu broker MQTT

    this.client.on('connect', () => {
      console.log('Conectado ao servidor MQTT');
    });

    this.client.on('error', (err) => {
      console.error('Erro de conexão MQTT:', err);
    });
  }

  publish(topic: string, message: string) {
    this.client.publish(topic, message);
  }
}
