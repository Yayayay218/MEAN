'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SimpleForm = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reduxForm = require('redux-form');

var _reactRedux = require('react-redux');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _getDefaultValues = require('./getDefaultValues');

var _getDefaultValues2 = _interopRequireDefault(_getDefaultValues);

var _FormField = require('./FormField');

var _FormField2 = _interopRequireDefault(_FormField);

var _Toolbar = require('./Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noop = function noop() {};

var SimpleForm = exports.SimpleForm = function SimpleForm(_ref) {
    var children = _ref.children,
        handleSubmit = _ref.handleSubmit,
        invalid = _ref.invalid,
        record = _ref.record,
        resource = _ref.resource,
        basePath = _ref.basePath,
        submitOnEnter = _ref.submitOnEnter;

    return _react2.default.createElement(
        'form',
        { onSubmit: submitOnEnter ? handleSubmit : noop, className: 'simple-form' },
        _react2.default.createElement(
            'div',
            { style: { padding: '0 1em 1em 1em' } },
            _react2.default.Children.map(children, function (input) {
                return input && _react2.default.createElement(
                    'div',
                    { key: input.props.source, className: 'aor-input-' + input.props.source, style: input.props.style },
                    _react2.default.createElement(_FormField2.default, { input: input, resource: resource, record: record, basePath: basePath })
                );
            })
        ),
        _react2.default.createElement(_Toolbar2.default, { invalid: invalid, submitOnEnter: submitOnEnter })
    );
};

SimpleForm.propTypes = {
    children: _propTypes2.default.node,
    defaultValue: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func]),
    handleSubmit: _propTypes2.default.func,
    invalid: _propTypes2.default.bool,
    record: _propTypes2.default.object,
    resource: _propTypes2.default.string,
    basePath: _propTypes2.default.string,
    validate: _propTypes2.default.func,
    submitOnEnter: _propTypes2.default.bool
};

SimpleForm.defaultProps = {
    submitOnEnter: true
};

var enhance = (0, _compose2.default)((0, _reactRedux.connect)(function (state, props) {
    return {
        initialValues: (0, _getDefaultValues2.default)(state, props)
    };
}), (0, _reduxForm.reduxForm)({
    form: 'record-form',
    enableReinitialize: true
}));

exports.default = enhance(SimpleForm);