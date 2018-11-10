# 🚋 pikiosk - trams 🚋

Customizable time display for Helsinki public transportation system

Data from [HSL public api](https://dev.hsl.fi/#journeyplanning)


![screenshot](https://raw.githubusercontent.com/thatsprettyfaroutman/pi-kiosk/353799ebc9225fc1b6a1e0b1658b6ba3d1ec583c/screenshot.png)

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
