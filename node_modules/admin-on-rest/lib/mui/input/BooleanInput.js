'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Toggle = require('material-ui/Toggle');

var _Toggle2 = _interopRequireDefault(_Toggle);

var _FieldTitle = require('../../util/FieldTitle');

var _FieldTitle2 = _interopRequireDefault(_FieldTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    block: {
        margin: '1rem 0',
        maxWidth: 250
    },
    label: {
        color: 'rgba(0, 0, 0, 0.298039)'
    },
    toggle: {
        marginBottom: 16
    }
};

var BooleanInput = function BooleanInput(_ref) {
    var input = _ref.input,
        label = _ref.label,
        source = _ref.source,
        elStyle = _ref.elStyle,
        resource = _ref.resource;
    return _react2.default.createElement(
        'div',
        { style: elStyle || styles.block },
        _react2.default.createElement(_Toggle2.default, {
            defaultToggled: !!input.value,
            onToggle: input.onChange,
            labelStyle: styles.label,
            style: styles.toggle,
            label: _react2.default.createElement(_FieldTitle2.default, { label: label, source: source, resource: resource })
        })
    );
};

BooleanInput.propTypes = {
    addField: _propTypes2.default.bool.isRequired,
    elStyle: _propTypes2.default.object,
    input: _propTypes2.default.object,
    label: _propTypes2.default.string,
    resource: _propTypes2.default.string,
    source: _propTypes2.default.string
};

BooleanInput.defaultProps = {
    addField: true
};

exports.default = BooleanInput;
module.exports = exports['default'];