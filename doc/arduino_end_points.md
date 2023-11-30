# Arduino end points

    In this document you can find all the end points that are callable

## GET 
### {{Base}}/get_szelep
> gives back a simple json object, FALSE for closed "szelep", and TRUE for open "szelep"
```json
{
    "szelep0": false,
    "szelep1": true,
    "szelep2": true,
    "szelep3": false,
    "szelep4": false
}
```

### {{Base}}/new_test
> gives back a complex object containing the temperatures of the water, the temp of the rooms and the temp each sensor detects in the termo

> sec 0 upper, sec 1 mid, sec 2 lower 
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

## Post 

### {{Base}}/set_szelep
 > The server will call the endpoint and send the wanted stage of the valves
```json
{
    "szelep0": false,
    "szelep1": true,
    "szelep2": true,
    "szelep3": false,
    "szelep4": false
}
```
