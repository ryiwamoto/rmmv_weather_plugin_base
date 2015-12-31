//=============================================================================
// WeatherCore.js
//=============================================================================

/*:
 * @plugindesc This Plugin provides Weather Plugin framework. Load this plugin before Weather Plugins.
 * @author ryiwamoto
 */

/*:ja
 * @plugindesc 天候のプラグインを作成するフレームワークを提供します。天候プラグインより先に読み込まれている必要があります.
 * @author ryiwamoto
 */

(function () {
    //-----------------------------------------------------------------------------
    /**
     * Abstract Plugin class
     * 
     * Default implementation is same as rain.
     * Override methods as you like.
     *
     * @class WeatherPluginBase
     * @constructor
     */
    function WeatherPluginBase(type) {
        this.type = type;
        this._bitmap = this.createBitmap();
    }

    WeatherPluginBase.prototype.createBitmap = function () {
        var rainBitmap = new Bitmap(1, 60);
        rainBitmap.fillAll('white');
        return rainBitmap;
    }

    WeatherPluginBase.prototype.updateSprite = function (sprite) {
        sprite.bitmap = this._bitmap;
        sprite.rotation = Math.PI / 16;
        sprite.ax -= 6 * Math.sin(sprite.rotation);
        sprite.ay += 6 * Math.cos(sprite.rotation);
        sprite.opacity -= 6;
    }

    WeatherPluginBase.prototype.onFrameUpdated = function () {
        return;
    }
    
    
    //-----------------------------------------------------------------------------
    // Override Original Weather Class
    
    //{[weatherType: string] => WeatherPluginBase}
    Weather.prototype._weatherTypes = {};
    
    /**
     * Add new weather plugn
     * @param {WeatherPluginBase} plugin
     */
    Weather.addWeatherType = function (plugin) {
        if (!plugin.type) {
            throw new Error("Weather Plugin type is invalid.");
        }
        this.prototype._weatherTypes[plugin.type] = plugin;
    }

    //--- override methods ---
    
    Weather.prototype._createBitmaps = function () {
        return;
    };

    Weather.prototype._updateSprite = function (sprite) {
        this._getPlugin(this.type).updateSprite(sprite);
        if (sprite.opacity < 40) {
            this._rebornSprite(sprite);
        }
    };

    var originalUpdateAllSprites = Weather.prototype._updateAllSprites;
    Weather.prototype._updateAllSprites = function () {
        this._getPlugin(this.type).onFrameUpdated();
        originalUpdateAllSprites.apply(this, arguments);
    };

    Weather.prototype._getPlugin = function (type) {
        if (!this._weatherTypes.hasOwnProperty(this.type)) {
            throw new Error('Could not get weather plugin for "' + this.type + '"');
        }
        return this._weatherTypes[type];
    }

    Weather.WeatherPluginBase = WeatherPluginBase;

    //-----------------------------------------------------------------------------
    //Built-in weather types
    
    /**
     * Built-in weather type "none"
     */
    function WeatherTypeNone() {
        Weather.WeatherPluginBase.call(this, 'none');
    }
    WeatherTypeNone.prototype = Object.create(WeatherPluginBase.prototype);
    WeatherTypeNone.constructor = Weather.WeatherPluginBase;
    Weather.addWeatherType(new WeatherTypeNone());
    
    /**
     * Built-in weather type "rain"
     */
    function WeatherTypeRain() {
        Weather.WeatherPluginBase.call(this, 'rain');
    }
    WeatherTypeRain.prototype = Object.create(WeatherPluginBase.prototype);
    WeatherTypeRain.constructor = Weather.WeatherPluginBase;

    WeatherTypeRain.prototype.createBitmap = function () {
        var rainBitmap = new Bitmap(1, 60);
        rainBitmap.fillAll('white');
        return rainBitmap;
    }

    WeatherTypeRain.prototype.updateSprite = function (sprite) {
        sprite.bitmap = this._bitmap;
        sprite.rotation = Math.PI / 16;
        sprite.ax -= 6 * Math.sin(sprite.rotation);
        sprite.ay += 6 * Math.cos(sprite.rotation);
        sprite.opacity -= 6;
    }

    Weather.addWeatherType(new WeatherTypeRain());

    /**
     * Built-in weather type "storm"
     */
    function WeatherTypeStorm() {
        Weather.WeatherPluginBase.call(this, 'storm');
    }
    WeatherTypeStorm.prototype = Object.create(WeatherPluginBase.prototype);
    WeatherTypeStorm.constructor = Weather.WeatherPluginBase;

    WeatherTypeStorm.prototype.createBitmap = function () {
        var stormBitmap = new Bitmap(2, 100);
        stormBitmap.fillAll('white');
        return stormBitmap;
    }

    WeatherTypeStorm.prototype.updateSprite = function (sprite) {
        sprite.bitmap = this._bitmap;
        sprite.rotation = Math.PI / 8;
        sprite.ax -= 8 * Math.sin(sprite.rotation);
        sprite.ay += 8 * Math.cos(sprite.rotation);
        sprite.opacity -= 8;
    }

    Weather.addWeatherType(new WeatherTypeStorm());
    
    
    /**
     * Built-in weather type "snow"
     */
    function WeatherTypeSnow() {
        Weather.WeatherPluginBase.call(this, 'snow');
    }
    WeatherTypeSnow.prototype = Object.create(WeatherPluginBase.prototype);
    WeatherTypeSnow.constructor = Weather.WeatherPluginBase;

    WeatherTypeSnow.prototype.createBitmap = function () {
        var snowBitmap = new Bitmap(9, 9);
        snowBitmap.drawCircle(4, 4, 4, 'white');
        return snowBitmap;
    }

    WeatherTypeSnow.prototype.updateSprite = function (sprite) {
        sprite.bitmap = this._bitmap;
        sprite.rotation = Math.PI / 16;
        sprite.ax -= 3 * Math.sin(sprite.rotation);
        sprite.ay += 3 * Math.cos(sprite.rotation);
        sprite.opacity -= 3;
    }

    Weather.addWeatherType(new WeatherTypeSnow());
})();
