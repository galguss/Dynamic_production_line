#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <WiFiUdp.h>
            
#include <ESP8266HTTPClient.h>
            
const char* ssid = "MyWifiName";
const char* pswd = "MyPasswordForWifi";
            
WiFiClient client;
int server_port = 80;//http
            
void wifi_Setup() {
  Serial.println("wifiSetup");
  //WiFi.begin(ssid);
    WiFi.begin(ssid, pswd);
            
  while (WiFi.status() != WL_CONNECTED) 
  {
     Serial.println("trying ...");
     digitalWrite(led_Y,HIGH);
     delay(200);
     digitalWrite(led_Y,LOW);
     delay(200);
  }
   digitalWrite(led_Y,HIGH);
   Serial.println("Connected to network");
}
            
/*void SendData(int val) {
   HTTPClient http;
   String dataURL = "";
   dataURL += "ACT=SET&DEV="+String(DEV);
   dataURL += "&CH="+String(CH);
   dataURL += "&VAL="+String(val);
   http.begin(client,"http://localhost/Arduino/" + dataURL);
   int httpCode = http.GET();
   Serial.println(httpCode);
   http.end();
}*/
            
String GetData() {
   String ret = "Error";
   HTTPClient http;
   String dataURL = "";
    dataURL += "/" + String(process);
    dataURL += "/" + String(ID_Card);
   http.begin(client, "http://192.170.9.70:5200/Arduino" + dataURL);
   int httpCode = http.GET();
   Serial.println(httpCode);
   if (httpCode == HTTP_CODE_OK) {
       Serial.print("HTTP response code ");
       Serial.println(httpCode);
       String Res = http.getString();
       Serial.println(Res);
       ret = Res;
     }
       http.end();
            
    return ret;
}
            
