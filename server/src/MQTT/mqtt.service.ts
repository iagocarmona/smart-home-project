import { Injectable, Logger } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { PubMQTTDTO } from 'src/DTOs/pubMQTT.dto';

@Injectable()
export class MqttService {
  private client: mqtt.MqttClient;

  constructor() {
    this.client = mqtt.connect('mqtt://localhost:1883');

    this.client.on('connect', () => {
      Logger.log('Conectado ao servidor MQTT');
    });

    this.client.on('error', (err) => {
      console.error('Erro de conexão MQTT:', err);
    });
  }

  publish(topic: string, message: PubMQTTDTO) {
    const jsonString = JSON.stringify(message);
    this.client.publish(topic, jsonString);
  }
}
