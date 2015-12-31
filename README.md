# Weather Plugin Base
(PRG Maker MV Plugin) This Plugin provides Weather Plugin framework. Load this plugin before Weather Plugins.

## Usage
```javascript
//in your plugin

function WeatherTypePoisonRain() {
    /**
     * Name for new weather type.
     * You can also override built-in types (none|rain|storm|snow).
     */
    var weatherType = 'poison_rain';
    Weather.WeatherPluginBase.call(this, weatherType);
}
WeatherTypePoisonRain.prototype = Object.create(Weather.WeatherPluginBase.prototype);
WeatherTypePoisonRain.constructor = Weather.WeatherPluginBase;

WeatherTypePoisonRain.prototype.createBitmap = function () {
    var rainBitmap = new Bitmap(1, 60);
    rainBitmap.fillAll('purple');
    return rainBitmap;
}

WeatherTypePoisonRain.prototype.updateSprite = function (sprite) {
    sprite.bitmap = this._bitmap;
    sprite.rotation = Math.PI / 16;
    sprite.ax -= 6 * Math.sin(sprite.rotation);
    sprite.ay += 6 * Math.cos(sprite.rotation);
    sprite.opacity -= 6;
}

/**
 * Callback for each frame.
 */
WeatherTypePoisonRain.prototype.onFrameUpdated = function () {
    if (Graphics.frameCount % 60 === 0) {
        $gameParty.members().forEach(function (actor) {
            actor.executeFloorDamage();
        });
    }
};
Weather.addWeatherType(new WeatherTypePoisonRain());

//in game event
$gameScreen.changeWeather('poison_rain', 5, 10);
```