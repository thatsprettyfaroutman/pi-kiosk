# 🚋 pikiosk - trams 🚋

Customizable time display for Helsinki public transportation system

Data from [HSL public api](https://dev.hsl.fi/#journeyplanning)

[Demo](http://trams.herokuapp.com/)

#### Usage

```
  yarn
  yarn start
```

#### Example configuration
```
export const WALK_MINUTES = 3
export const TRAM_STOPS = [ 'HSL:1203406', 'HSL:1203422' ]
export const TRAM_LINES = [ '7', '9' ]
```


#### Screenshots

![Default view](https://raw.githubusercontent.com/thatsprettyfaroutman/pi-kiosk/master/screenshot.png)

![View when raining](https://raw.githubusercontent.com/thatsprettyfaroutman/pi-kiosk/master/screenshot_rain.gif)
