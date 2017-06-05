'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TabbedForm = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reduxForm = require('redux-form');

var _reactRedux = require('react-redux');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _Tabs = require('material-ui/Tabs');

var _Toolbar = require('./Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _getDefaultValues = require('./getDefaultValues');

var _getDefaultValues2 = _interopRequireDefault(_getDefaultValues);

var _translate = require('../../i18n/translate');

var _translate2 = _interopRequireDefault(_translate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noop = function noop() {};

var TabbedForm = exports.TabbedForm = function (_Component) {
    (0, _inherits3.default)(TabbedForm, _Component);

    function TabbedForm(props) {
        (0, _classCallCheck3.default)(this, TabbedForm);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TabbedForm.__proto__ || Object.getPrototypeOf(TabbedForm)).call(this, props));

        _this.handleChange = function (value) {
            _this.setState({ value: value });
        };

        _this.state = {
            value: 0
        };
        return _this;
    }

    (0, _createClass3.default)(TabbedForm, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                contentContainerStyle = _props.contentContainerStyle,
                handleSubmit = _props.handleSubmit,
                invalid = _props.invalid,
                record = _props.record,
                resource = _props.resource,
                basePath = _props.basePath,
                translate = _props.translate,
                submitOnEnter = _props.submitOnEnter;

            return _react2.default.createElement(
                'form',
                { onSubmit: submitOnEnter ? handleSubmit : noop, className: 'tabbed-form' },
                _react2.default.createElement(
                    'div',
                    { style: { padding: '0 1em 1em 1em' } },
                    _react2.default.createElement(
                        _Tabs.Tabs,
                        {
                            value: this.state.value,
                            onChange: this.handleChange,
                            contentContainerStyle: contentContainerStyle
                        },
                        _react2.default.Children.map(children, function (tab, index) {
                            return _react2.default.createElement(
                                _Tabs.Tab,
                                {
                                    key: tab.props.value,
                                    className: 'form-tab',
                                    label: translate(tab.props.label, { _: tab.props.label }),
                                    value: index,
                                    icon: tab.props.icon
                                },
                                _react2.default.cloneElement(tab, { resource: resource, record: record, basePath: basePath })
                            );
                        })
                    )
                ),
                _react2.default.createElement(_Toolbar2.default, { invalid: invalid, submitOnEnter: submitOnEnter })
            );
        }
    }]);
    return TabbedForm;
}(_react.Component);

TabbedForm.propTypes = {
    children: _propTypes2.default.node,
    contentContainerStyle: _propTypes2.default.object,
    defaultValue: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func]),
    handleSubmit: _propTypes2.default.func,
    invalid: _propTypes2.default.bool,
    record: _propTypes2.default.object,
    resource: _propTypes2.default.string,
    basePath: _propTypes2.default.string,
    translate: _propTypes2.default.func,
    validate: _propTypes2.default.func,
    submitOnEnter: _propTypes2.default.bool
};

TabbedForm.defaultProps = {
    contentContainerStyle: { borderTop: 'solid 1px #e0e0e0' },
    submitOnEnter: true
};

var enhance = (0, _compose2.default)((0, _reactRedux.connect)(function (state, props) {
    return {
        initialValues: (0, _getDefaultValues2.default)(state, props)
    };
}), (0, _reduxForm.reduxForm)({
    form: 'record-form',
    enableReinitialize: true
}), _translate2.default);

exports.default = enhance(TabbedForm);