/*
 * Undies: Undo and redo history management for Javascript
 *
 * Based on the Undo prototype in Mikko Mononen's Stylii:
 * https://github.com/memononen/stylii/blob/master/js/editor.js#L2
 *
 * Copyright(c) 2014 Moniker <jonathan@studiomoniker.com>
 * MIT Licensed
 */

(function() {
	function Undies(param) {
		this.maxUndos = param.maxUndos || 10;
		this.restore = param.restore;
		this.serialize = param.serialize;
		this.reset();
	}

	Undies.prototype = {
		snapshot: function(name) {
			var state = {
				name: name,
				data: this.serialize()
			};

			// We might be in the middle of the undo history,
			// so we should discard states after the current one:
			if (this.head < this.states.length - 1)
				this.states = this.states.slice(0, this.head + 1);

			this.states.push(state);

			// Remove the oldest state if we have too many states.
			if (this.states.length > this.maxUndos)
				this.states.shift();

			this.head = this.states.length - 1;
			if (this.onStateChange)
				this.onStateChange();
		},

		getState: function() {
			return this.states[this.head];
		},

		getRedoState: function() {
			if (!this.canRedo())
				return;
			return this.states[this.head + 1];
		},

		undo: function() {
			if (!this.canUndo())
				return;
			this.head--;
			this.restore(this.getState().data);
			if (this.onStateChange)
				this.onStateChange();
		},

		redo: function() {
			if (!this.canRedo())
				return;
			this.head++;
			this.restore(this.getState().data);
			if (this.onStateChange)
				this.onStateChange();
		},

		reset: function() {
			this.states = [];
			this.head = -1;
		},

		canUndo: function() {
			return this.head > 0;
		},

		canRedo: function() {
			return this.head < this.states.length - 1;
		}
	};

	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
		  exports = module.exports = Undies;
		}
		exports.Undies = Undies;
	} else {
		this.Undies = Undies;
	}
}).call(this);
