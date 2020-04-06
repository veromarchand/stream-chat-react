'use strict';
var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var react_1 = __importDefault(require('react'));
var prop_types_1 = __importDefault(require('prop-types'));
var emoji_mart_1 = require('emoji-mart');
var utils_1 = require('../utils');
var ReactionsList = /** @class */ (function(_super) {
  __extends(ReactionsList, _super);
  function ReactionsList(props) {
    var _this = _super.call(this, props) || this;
    _this._renderReactions = function(reactions) {
      var reactionsByType = {};
      reactions.map(function(item) {
        if (reactions[item.type] === undefined) {
          return (reactionsByType[item.type] = [item]);
        } else {
          return (reactionsByType[item.type] = __spreadArrays(
            reactionsByType[item.type],
            [item],
          ));
        }
      });
      var reactionsEmojis = _this.props.reactionOptions.reduce(function(
        acc,
        cur,
      ) {
        var _a;
        return __assign(__assign({}, acc), ((_a = {}), (_a[cur.id] = cur), _a));
      },
      {});
      return Object.keys(reactionsByType).map(function(type) {
        return reactionsEmojis[type]
          ? react_1.default.createElement(
              'li',
              { key: reactionsEmojis[type].id },
              react_1.default.createElement(
                emoji_mart_1.NimbleEmoji,
                __assign(
                  { emoji: reactionsEmojis[type] },
                  utils_1.emojiSetDef,
                  { size: 16, data: utils_1.emojiData },
                ),
              ),
              ' ',
              '\u00A0',
            )
          : null;
      });
    };
    _this._getReactionCount = function() {
      var reaction_counts = _this.props.reaction_counts;
      var count = null;
      if (
        reaction_counts !== null &&
        reaction_counts !== undefined &&
        Object.keys(reaction_counts).length > 0
      ) {
        count = 0;
        Object.keys(reaction_counts).map(function(key) {
          return (count += reaction_counts[key]);
        });
      }
      return count;
    };
    return _this;
  }
  ReactionsList.prototype.render = function() {
    return react_1.default.createElement(
      'div',
      {
        className:
          'str-chat__reaction-list ' +
          (this.props.reverse ? 'str-chat__reaction-list--reverse' : ''),
        onClick: this.props.onClick,
        ref: this.reactionList,
      },
      react_1.default.createElement(
        'ul',
        null,
        this._renderReactions(this.props.reactions),
        react_1.default.createElement(
          'li',
          null,
          react_1.default.createElement(
            'span',
            { className: 'str-chat__reaction-list--counter' },
            this._getReactionCount(),
          ),
        ),
      ),
    );
  };
  ReactionsList.propTypes = {
    /** List of reactions */
    reactions: prop_types_1.default.array,
    /** Provide a list of reaction options [{name: 'angry', emoji: 'angry'}] */
    reactionOptions: prop_types_1.default.array,
    /** If true, reaction list will be shown at trailing end of message bubble. */
    reverse: prop_types_1.default.bool,
    /** Object/map of reaction id/type (e.g. 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry') vs count */
    reaction_counts: prop_types_1.default.object,
  };
  ReactionsList.defaultProps = {
    reactionOptions: utils_1.defaultMinimalEmojis,
    emojiSetDef: utils_1.emojiSetDef,
    reverse: false,
  };
  return ReactionsList;
})(react_1.default.Component);
exports.ReactionsList = ReactionsList;
