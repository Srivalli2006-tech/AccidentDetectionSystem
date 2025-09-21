#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_MPU6050.h>
#include <SoftwareSerial.h>
#include <TinyGPS++.h>

#define buzzer 8
Adafruit_MPU6050 mpu;
SoftwareSerial gsm(7, 6);  
SoftwareSerial gpsSerial(4, 3);

TinyGPSPlus gps;
float threshold = 2.5; 
long lastAlert = 0;

void setup() {
  Serial.begin(9600);
  gsm.begin(9600);
  gpsSerial.begin(9600);
  pinMode(buzzer, OUTPUT);

  if (!mpu.begin()) {
    Serial.println("MPU6050 not detected");
    while (1);
  }
  Serial.println("Accident Detection System Started");
}

void loop() {
  while (gpsSerial.available() > 0) gps.encode(gpsSerial.read());

  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);

  float totalAccel = sqrt(a.acceleration.x*a.acceleration.x +
                          a.acceleration.y*a.acceleration.y +
                          a.acceleration.z*a.acceleration.z);

  if (totalAccel > threshold && millis() - lastAlert > 30000) {
    Serial.println("Accident detected!");
    digitalWrite(buzzer, HIGH);
    sendAlertSMS();
    lastAlert = millis();
  } else digitalWrite(buzzer, LOW);

  delay(100);
}

void sendAlertSMS() {
  if (gps.location.isValid()) {
    String latitude = String(gps.location.lat(), 6);
    String longitude = String(gps.location.lng(), 6);
    String message = "Accident Alert! Location: " + latitude + ", " + longitude;

    gsm.println("AT+CMGF=1");
    delay(100);
    gsm.println("AT+CMGS=\"+91XXXXXXXXXX\"");
    delay(100);
    gsm.println(message);
    delay(100);
    gsm.write(26);
    delay(5000);
  }
}
