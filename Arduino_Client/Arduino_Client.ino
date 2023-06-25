#define relay D4
String ID_Card;

// ---- Leds -------
#define led_R D3
#define led_B D1
#define led_Y D2


void ModesSetup(){
  pinMode(led_R, OUTPUT);
  pinMode(led_B, OUTPUT);
  pinMode(led_Y, OUTPUT);
  pinMode(relay, OUTPUT);
}

// ------- Measurements --------
#define light_intensity A0
unsigned long timeForMeasurement;
int lightIntensity = 0;
int count = 0;

// ------ Situation management --------
#define HEATING 30
#define LIGHT_LEVEL 31
#define COMPONENT_ACTIVATION 32
#define DELAY_TIME 33
int CurrentStatus;
char* process;


// ----- Time Managment --------
unsigned long timeForProcess;
unsigned long timeForHeating;
unsigned long timeForLightLevel;
unsigned long timeForComponentSctivation;
unsigned long timeForDelayTime;
int finishTime;
bool isStart = false;

void startingWork(char* proc, int p){
  process = proc;
  if(!isStart){
    finishTime = GetData().toInt();
        switch(p){
        case HEATING:
          timeForHeating = millis();
          break;
        case LIGHT_LEVEL:
          timeForLightLevel= millis();
          break;
        case COMPONENT_ACTIVATION:
          timeForComponentSctivation = millis();
          break;
         case DELAY_TIME:
          timeForDelayTime = millis(); 
          break;    
      }
    isStart = true;
   }
}

void setup() {
  ModesSetup();
  Serial.begin(9600);
  wifi_Setup();
  ID_Card = GetData();
  
  digitalWrite(((ID_Card == "No machine available") || (ID_Card == "Error"))? led_R : led_B , HIGH);
}

void loop() {
  switch(CurrentStatus){
    case HEATING:
      startingWork("Heating", HEATING);
      digitalWrite(relay, HIGH);
      if((millis() - timeForHeating) > finishTime * 1000){
        isStart = false;
        digitalWrite(relay, LOW);
        CurrentStatus = LIGHT_LEVEL;
      }
      break;
     case LIGHT_LEVEL:
       startingWork("Light_level", LIGHT_LEVEL);
       if(millis() - timeForProcess > 1000){
        lightIntensity += map(analogRead(light_intensity),0,1023,0,255);
        count++;
        timeForProcess = millis();
       }
       if((millis() - timeForLightLevel) > finishTime * 1000){
        isStart = false;
        lightIntensity /= count;
        CurrentStatus = COMPONENT_ACTIVATION;
       }
        break;
      case COMPONENT_ACTIVATION: 
        startingWork("component_activation", COMPONENT_ACTIVATION);
        analogWrite(led_R, lightIntensity);
        if((millis() - timeForComponentSctivation) > finishTime * 1000){
          isStart = false;
          analogWrite(led_R, 0);
          count = 0;
          lightIntensity = 0;
          CurrentStatus = DELAY_TIME;
        }
        break;
      case DELAY_TIME:
        startingWork("delay_time", DELAY_TIME);
        if((millis() - timeForDelayTime) > finishTime * 1000){
          isStart = false;
          CurrentStatus = HEATING;
        }
        break;    
      default:
        if((ID_Card != "No machine available") && (ID_Card != "Error")){
          CurrentStatus = HEATING;
        }
        break;
  }

}
