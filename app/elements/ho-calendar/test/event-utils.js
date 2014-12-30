/* global chai, describe, it, EventUtils */
'use strict';

var assert = chai.assert;

describe('EventUtils', function () {

  describe('sort', function () {

    it('should sort three events correctly by start time', function () {
      var events = [
        {id: 'event1', start: 60, end: 150},
        {id: 'event2', start: 20, end: 200},
        {id: 'event3', start: 30, end: 620}
      ];

      EventUtils.sort(events);
      assert.equal('event2', events[0].id);
      assert.equal('event3', events[1].id);
      assert.equal('event1', events[2].id);
    });

    it('should three events by start and end times', function () {
      var events = [
        {id: 'event1', start: 60, end: 150},
        {id: 'event2', start: 30, end: 620},
        {id: 'event3', start: 30, end: 300}
      ];

      EventUtils.sort(events);
      assert.equal('event3', events[0].id);
      assert.equal('event2', events[1].id);
      assert.equal('event1', events[2].id);
    });

  });

  describe('intersects', function () {

    it('should return false for when checking for intersection between 2-3pm and 10-11am', function () {
      var event1 = {id: 'event1', start: 300, end: 360};
      var event2 = {id: 'event1', start: 60, end: 120};

      var intersects1 = EventUtils.intersects(event1, event2);
      var intersects2 = EventUtils.intersects(event2, event1);
      assert.isFalse(intersects1);
      assert.isFalse(intersects2);
    });

    it('should return false for when checking for intersection between 10-11am and 11-12pm', function () {
      var event1 = {id: 'event1', start: 60, end: 120};
      var event2 = {id: 'event1', start: 120, end: 180};

      var intersects1 = EventUtils.intersects(event1, event2);
      var intersects2 = EventUtils.intersects(event2, event1);
      assert.isFalse(intersects1);
      assert.isFalse(intersects2);
    });

    it('should return false for when checking for intersection between 10-10:30am and 11-12am', function () {
      var event1 = {id: 'event1', start: 60, end: 90};
      var event2 = {id: 'event1', start: 120, end: 180};

      var intersects1 = EventUtils.intersects(event1, event2);
      var intersects2 = EventUtils.intersects(event2, event1);
      assert.isFalse(intersects1);
      assert.isFalse(intersects2);
    });

    it('should return true for when checking for intersection between 10-11am and 10:30-11:30am', function () {
      var event1 = {id: 'event2', start: 60, end: 120};
      var event2 = {id: 'event3', start: 90, end: 150};

      var intersects1 = EventUtils.intersects(event1, event2);
      var intersects2 = EventUtils.intersects(event2, event1);
      assert.isTrue(intersects1);
      assert.isTrue(intersects2);
    });

    it('should return true for when checking for intersection between 9-12pm and 10-11am', function () {
      var event1 = {id: 'event1', start: 0, end: 180};
      var event2 = {id: 'event1', start: 60, end: 120};

      var intersects1 = EventUtils.intersects(event1, event2);
      var intersects2 = EventUtils.intersects(event2, event1);
      assert.isTrue(intersects1);
      assert.isTrue(intersects2);
    });

    it('should return true for when checking for intersection between 9-10am and 9-11am', function () {
      var event1 = {id: 'event1', start: 0, end: 60};
      var event2 = {id: 'event1', start: 0, end: 120};

      var intersects1 = EventUtils.intersects(event1, event2);
      var intersects2 = EventUtils.intersects(event2, event1);
      assert.isTrue(intersects1);
      assert.isTrue(intersects2);
    });

    it('should return true for when checking for intersection between 9-11am and 10-11am', function () {
      var event1 = {id: 'event1', start: 0, end: 120};
      var event2 = {id: 'event1', start: 60, end: 120};

      var intersects1 = EventUtils.intersects(event1, event2);
      var intersects2 = EventUtils.intersects(event2, event1);
      assert.isTrue(intersects1);
      assert.isTrue(intersects2);
    });

    it('should return true for when checking for intersection between 1-2pm and 1-2pm', function () {
      var event1 = {id: 'event1', start: 240, end: 300};
      var event2 = {id: 'event1', start: 240, end: 300};

      var intersects1 = EventUtils.intersects(event1, event2);
      var intersects2 = EventUtils.intersects(event2, event1);
      assert.isTrue(intersects1);
      assert.isTrue(intersects2);
    });

  });

});
