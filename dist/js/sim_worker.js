/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************************!*\
  !*** ./assets/js/sim_worker.js ***!
  \*********************************/
importScripts("./magesim.js");
onmessage = function onmessage(event) {
  var data = event.data;
  if (data.type == "start") {
    var wasm = fetch("./magesim.wasm", {
      cache: "no-store"
    }).then(function (r) {
      return r.arrayBuffer();
    }).then(function (binary) {
      return MageSim({
        wasmBinary: binary
      });
    }).then(function (w) {
      return w.ready;
    }).then(function (m) {
      var config = m.allocConfig();
      for (var key in data.config) {
        if (key == "timings") continue;
        if (typeof config[key] != "undefined") config[key] = data.config[key];
      }
      if (m.Rotation.values.hasOwnProperty(data.config.rotation)) config.rotation = m.Rotation.values[data.config.rotation];
      if (m.Trinket.values.hasOwnProperty(data.config.trinket1)) config.trinket1 = m.Trinket.values[data.config.trinket1];
      if (m.Trinket.values.hasOwnProperty(data.config.trinket2)) config.trinket2 = m.Trinket.values[data.config.trinket2];
      if (m.MetaGem.values.hasOwnProperty(data.config.meta_gem)) config.meta_gem = m.MetaGem.values[data.config.meta_gem];
      if (m.Potion.values.hasOwnProperty(data.config.potion)) config.potion = m.Potion.values[data.config.potion];
      if (m.Potion.values.hasOwnProperty(data.config.pre_potion)) config.pre_potion = m.Potion.values[data.config.pre_potion];
      if (m.Conjured.values.hasOwnProperty(data.config.conjured)) config.conjured = m.Conjured.values[data.config.conjured];
      for (var i = 0; i < data.config.timings.length; i++) {
        m.addTiming(config, data.config.timings[i].name, data.config.timings[i].t ? data.config.timings[i].t : 0, data.config.timings[i].wait_for_buff, data.config.timings[i].wait_t ? data.config.timings[i].wait_t : 0);
      }
      var stats = JSON.parse(JSON.stringify(m.emptyStats()));
      for (var key in data.config.stats) {
        if (stats.hasOwnProperty(key)) stats[key] = data.config.stats[key];
      }
      var talents = JSON.parse(JSON.stringify(m.emptyTalents()));
      for (var key in data.config.talents) {
        if (talents.hasOwnProperty(key)) talents[key] = data.config.talents[key];
      }
      var glyphs = JSON.parse(JSON.stringify(m.emptyGlyphs()));
      for (var key in data.config.glyphs) {
        if (glyphs.hasOwnProperty(key)) glyphs[key] = data.config.glyphs[key];
      }
      var player = m.allocPlayer(config, stats, talents, glyphs);
      if (m.Race.values.hasOwnProperty(data.config.race)) player.race = m.Race.values[data.config.race];
      if (data.iterations && data.iterations > 1) var result = m.runSimulations(config, player, data.iterations);else var result = m.runSimulation(config, player);
      if (result.log) result.log = JSON.parse(result.log);
      if (result.spells) result.spells = JSON.parse(result.spells);
      if (result.histogram) result.histogram = JSON.parse(result.histogram);
      postMessage({
        type: "success",
        result: result
      });
    })["catch"](function (e) {
      return console.error(e);
    });
  }
};
/******/ })()
;