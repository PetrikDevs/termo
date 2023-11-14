# Server end points

    In this document you can find all the end points that are callable

## GET 


## Post 

### {{Base}}/new_test
 > The arduino will send a post req to the server with the payload of the sensor values and the temperatres
```json
{
    "temp_flow_in": 60,
    "temp_flow_out": 60,
    "temp_out_side": 60,
    "temp_in_side": 70,
    "test":{
        "sec0":{
            "sensor0": 50,
            "sensor1": 50,
            "sensor2": 50,
            "sensor3": 50,
            "sensor4": 50
        },
        "sec1": {
            "sensor0": 50,
            "sensor1": 50,
            "sensor2": 50,
            "sensor3": 50,
            "sensor4": 50
        },
        "sec2": {
            "sensor0": 50,
            "sensor1": 50,
            "sensor2": 50,
            "sensor3": 50,
            "sensor4": 50
        }
    }
}
```

### {{Base}}/new_oxig
 > The arduino will send a post req to the server with the payload of the sensor values and the temperatres
```json
{
    "temp_flow_in": 60,
    "temp_flow_out": 60,
    "temp_out_side": 60,
    "temp_in_side": 70,
    "test":{
        "sec0":{
            "sensor0": 50,
            "sensor1": 50,
            "sensor2": 50,
            "sensor3": 50,
            "sensor4": 50
        },
        "sec1": {
            "sensor0": 50,
            "sensor1": 50,
            "sensor2": 50,
            "sensor3": 50,
            "sensor4": 50
        },
        "sec2": {
            "sensor0": 50,
            "sensor1": 50,
            "sensor2": 50,
            "sensor3": 50,
            "sensor4": 50
        }
    }
}
```

