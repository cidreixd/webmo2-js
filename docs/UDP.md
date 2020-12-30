# UDP通信

![UDP](https://user-images.githubusercontent.com/15213630/103216667-ee11e800-4959-11eb-96ef-a5d1a62db044.png)


##

```
  const handleUDP = (data) => {
      if(data.sensordata.gravity) {
          webmo.motor1.rotate(data.sensordata.gravity.x * 800)
      }
  }
  webmo.socketClient.events.on('UDP', handleUDP)
```