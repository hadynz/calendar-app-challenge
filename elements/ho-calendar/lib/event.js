(function (scope) {
  'use strict';

  function Event(rawEvent) {
    this.id = rawEvent.id;
    this.start = rawEvent.start;
    this.end = rawEvent.end;

    this.columns = 1;
    this.columnOffset = 0;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Event;
  } else {
    scope.Event = Event;
  }

})(this);
