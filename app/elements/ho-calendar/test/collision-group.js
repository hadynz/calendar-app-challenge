/* global chai, describe, it, CollisionGroup */
'use strict';

var assert = chai.assert;

describe('CollisionGroup', function () {

  describe('constructor', function() {

    it('should have a default events array', function() {
      var cg = new CollisionGroup();
      assert.equal(0, cg.count());
    });

    it('can be initialised with a default events array', function() {
      var events = [
          {id: 'event1', start: 60, end: 60},
          {id: 'event2', start: 60, end: 60}
        ],
        cg = new CollisionGroup(events);

      assert.equal(2, cg.count());
    });

  });

  describe('process', function () {

    var actualObject = function(event) {
      return {id: event.id, columnOffset: event.columnOffset, columns: event.columns};
    };

    it('will correctly return an ordered list of events with column and width info populated for Scenario B1', function () {
      var events = [
          {id: 'event1', start: 0, end: 180},
          {id: 'event2', start: 60, end: 300},
          {id: 'event3', start: 240, end: 360},
          {id: 'event4', start: 300, end: 360},
          {id: 'event5', start: 300, end: 360}
        ],
        expected = [
          {id: 'event1', columnOffset: 0, columns: 3},
          {id: 'event2', columnOffset: 1, columns: 3},
          {id: 'event3', columnOffset: 0, columns: 3},
          {id: 'event4', columnOffset: 1, columns: 3},
          {id: 'event5', columnOffset: 2, columns: 3}
        ];

      var cg = new CollisionGroup(events),
        actual = cg.process().map(actualObject);

      assert.deepEqual(actual, expected);
    });

    it('will correctly return an ordered list of events with column and width info populated for Scenario B2', function () {
      var events = [
          {id: 'event1', start: 0, end: 180},
          {id: 'event2', start: 60, end: 300},
          {id: 'event3', start: 240, end: 360},
          {id: 'event4', start: 240, end: 360},
          {id: 'event5', start: 300, end: 360}
        ],
        expected = [
          {id: 'event1', columnOffset: 0, columns: 3},
          {id: 'event2', columnOffset: 1, columns: 3},
          {id: 'event3', columnOffset: 0, columns: 3},
          {id: 'event4', columnOffset: 2, columns: 3},
          {id: 'event5', columnOffset: 1, columns: 3}
        ];

      var cg = new CollisionGroup(events),
        actual = cg.process().map(actualObject);

      assert.deepEqual(actual, expected);
    });

    it('will correctly return an ordered list of events with column and width info populated for Scenario C1', function () {
      var events = [
          {id: 'event1', start: 0, end: 360},
          {id: 'event2', start: 60, end: 300},
          {id: 'event3', start: 120, end: 300},
          {id: 'event4', start: 120, end: 300},
          {id: 'event5', start: 300, end: 420}
        ],
        expected = [
          {id: 'event1', columnOffset: 0, columns: 4},
          {id: 'event2', columnOffset: 1, columns: 4},
          {id: 'event3', columnOffset: 2, columns: 4},
          {id: 'event4', columnOffset: 3, columns: 4},
          {id: 'event5', columnOffset: 1, columns: 4}
        ];

      var cg = new CollisionGroup(events),
        actual = cg.process().map(actualObject);

      assert.deepEqual(actual, expected);
    });

    it('will correctly return an ordered list of events with column and width info populated for Scenario C2', function () {
      var events = [
          {id: 'event1', start: 0, end: 360},
          {id: 'event2', start: 60, end: 360},
          {id: 'event3', start: 120, end: 300},
          {id: 'event4', start: 120, end: 300},
          {id: 'event5', start: 300, end: 420}
        ],
        expected = [
          {id: 'event1', columnOffset: 0, columns: 4},
          {id: 'event2', columnOffset: 1, columns: 4},
          {id: 'event3', columnOffset: 2, columns: 4},
          {id: 'event4', columnOffset: 3, columns: 4},
          {id: 'event5', columnOffset: 2, columns: 4}
        ];

      var cg = new CollisionGroup(events),
        actual = cg.process().map(actualObject);

      assert.deepEqual(actual, expected);
    });

    it('will correctly return an ordered list of events with column and width info populated for Scenario C3', function () {
      var events = [
          {id: 'event1', start: 0, end: 240},
          {id: 'event2', start: 60, end: 300},
          {id: 'event3', start: 120, end: 240},
          {id: 'event4', start: 120, end: 360},
          {id: 'event5', start: 240, end: 360},
          {id: 'event6', start: 300, end: 420}
        ],
        expected = [
          {id: 'event1', columnOffset: 0, columns: 4},
          {id: 'event2', columnOffset: 1, columns: 4},
          {id: 'event3', columnOffset: 2, columns: 4},
          {id: 'event4', columnOffset: 3, columns: 4},
          {id: 'event5', columnOffset: 0, columns: 4},
          {id: 'event6', columnOffset: 1, columns: 4}
        ];

      var cg = new CollisionGroup(events),
        actual = cg.process().map(actualObject);

      assert.deepEqual(actual, expected);
    });

    it('will correctly return an ordered list of events with column and width info populated for Scenario C4', function () {
      var events = [
          {id: 'event1', start: 0, end: 240},
          {id: 'event2', start: 60, end: 300},
          {id: 'event3', start: 120, end: 360},
          {id: 'event4', start: 120, end: 360},
          {id: 'event5', start: 240, end: 300},
          {id: 'event6', start: 300, end: 360},
          {id: 'event7', start: 300, end: 420}
        ],
        expected = [
          {id: 'event1', columnOffset: 0, columns: 4},
          {id: 'event2', columnOffset: 1, columns: 4},
          {id: 'event3', columnOffset: 2, columns: 4},
          {id: 'event4', columnOffset: 3, columns: 4},
          {id: 'event5', columnOffset: 0, columns: 4},
          {id: 'event6', columnOffset: 0, columns: 4},
          {id: 'event7', columnOffset: 1, columns: 4}
        ];

      var cg = new CollisionGroup(events),
        actual = cg.process().map(actualObject);

      assert.deepEqual(actual, expected);
    });

    it('will correctly return an ordered list of events with column and width info populated for Scenario C5', function () {
      var events = [
          {id: 'event1', start: 0, end: 240},
          {id: 'event2', start: 60, end: 240},
          {id: 'event3', start: 120, end: 300},
          {id: 'event4', start: 120, end: 360},
          {id: 'event5', start: 240, end: 300},
          {id: 'event6', start: 240, end: 360},
          {id: 'event7', start: 300, end: 360},
          {id: 'event8', start: 300, end: 360}
        ],
        expected = [
          {id: 'event1', columnOffset: 0, columns: 4},
          {id: 'event2', columnOffset: 1, columns: 4},
          {id: 'event3', columnOffset: 2, columns: 4},
          {id: 'event4', columnOffset: 3, columns: 4},
          {id: 'event5', columnOffset: 0, columns: 4},
          {id: 'event6', columnOffset: 1, columns: 4},
          {id: 'event7', columnOffset: 0, columns: 4},
          {id: 'event8', columnOffset: 2, columns: 4}
        ];

      var cg = new CollisionGroup(events),
        actual = cg.process().map(actualObject);

      assert.deepEqual(actual, expected);
    });

    it('will correctly return an ordered list of events with column and width info populated for Scenario C6', function () {
      var events = [
          {id: 'event1', start: 0, end: 180},
          {id: 'event2', start: 0, end: 180},
          {id: 'event3', start: 60, end: 240},
          {id: 'event4', start: 60, end: 300},
          {id: 'event5', start: 180, end: 300},
          {id: 'event6', start: 240, end: 300},
          {id: 'event7', start: 240, end: 360},
          {id: 'event8', start: 300, end: 360}
        ],
        expected = [
          {id: 'event1', columnOffset: 0, columns: 4},
          {id: 'event2', columnOffset: 1, columns: 4},
          {id: 'event3', columnOffset: 2, columns: 4},
          {id: 'event4', columnOffset: 3, columns: 4},
          {id: 'event5', columnOffset: 0, columns: 4},
          {id: 'event6', columnOffset: 1, columns: 4},
          {id: 'event7', columnOffset: 2, columns: 4},
          {id: 'event8', columnOffset: 0, columns: 4}
        ];

      var cg = new CollisionGroup(events),
        actual = cg.process().map(actualObject);

      assert.deepEqual(actual, expected);
    });

  });

});
