#include <WiFi.h>
#include <PubSubClient.h>

const char *ssid = "sua-rede-wifi";
const char *password = "sua-senha-wifi";
const char *mqttServer = "mqtt.eclipse.org";
const int mqttPort = 1883;

WiFiClient espClient;
PubSubClient client(espClient);

void setup()
{
    Serial.begin(115200);
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }

    Serial.println("Connected to WiFi");

    client.setServer(mqttServer, mqttPort);
}

void loop()
{
    if (!client.connected())
    {
        reconnect();
    }

    client.loop();
}

void reconnect()
{
    while (!client.connected())
    {
        Serial.println("Connecting to MQTT...");

        if (client.connect("arduino-client"))
        {
            Serial.println("Connected to MQTT");
            client.subscribe("arduino/topic");
        }
        else
        {
            Serial.print("Failed to connect to MQTT, rc=");
            Serial.print(client.state());
            Serial.println(" Retrying in 5 seconds");
            delay(5000);
        }
    }
}

void callback(char *topic, byte *payload, unsigned int length)
{
    Serial.print("Mensagem recebida no tópico: ");
    Serial.println(topic);

    Serial.print("Mensagem: ");
    for (int i = 0; i < length; i++)
    {
        Serial.print((char)payload[i]);
    }
    Serial.println();
}
