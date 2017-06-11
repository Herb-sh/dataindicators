"use strict";

/** Indicators Group */
var IndicatorRow = React.createClass({
    displayName: "IndicatorRow",

    render: function render () {

        var indicators = [];

        for (var key in this.props.indicatorsOfGroup) {
            if (key === app.CONFIG.defaultIndicator) {
                indicators.push(React.createElement(
                    "option",
                    {value: key, selected: "selected"},
                    " ",
                    this.props.indicatorsOfGroup[key]
                ));
            } else {
                indicators.push(React.createElement(
                    "option",
                    {value: key},
                    " ",
                    this.props.indicatorsOfGroup[key]
                ));
            }
        }
        return React.createElement(
            "optgroup",
            {label: this.props.k},
            indicators
        );
    }
});

var IndicatorGroup = React.createClass({
    displayName: "IndicatorGroup",

    change: function change (e) {
        app.getByIndicator(e.target.value);
    },
    render: function render () {

        var indicatorsGroup = [];

        for (var key in this.props.indicatorsGroups) {
            var indicatorsOfGroup = this.props.indicatorsGroups[key].indicators;
            indicatorsGroup.push(React.createElement(IndicatorRow, {
                key: key,
                k: key,
                indicatorsOfGroup: indicatorsOfGroup
            }));
        }

        return React.createElement(
            "div",
            {className: "indicators"},
            React.createElement(
                "form",
                null,
                React.createElement(
                    "fieldset",
                    {className: "form-group"},
                    React.createElement(
                        "select",
                        {id: "indicatorSelect", className: "c-select", onChange: this.change},
                        indicatorsGroup
                    )
                )
            )
        );
    }
});

/** Year Block */
var YearRow = React.createClass({
    displayName: "YearRow",

    render: function render () {

        var indicators = [];

        for (var key in this.props.indicatorsOfGroup) {
            if (key === app.CONFIG.defaultIndicator) {
                indicators.push(React.createElement(
                    "option",
                    {value: key, selected: "selected"},
                    " ",
                    this.props.indicatorsOfGroup[key]
                ));
            } else {
                indicators.push(React.createElement(
                    "option",
                    {value: key},
                    " ",
                    this.props.indicatorsOfGroup[key]
                ));
            }
        }
        return React.createElement(
            "optgroup",
            {label: this.props.k},
            indicators
        );
    }
});

var YearGroup = React.createClass({
    displayName: "YearGroup",

    change: function (e) {
        app.getByIndicator(e.target.value);
    },

    render: function () {

    }
});

ReactDOM.render(React.createElement(IndicatorGroup,
    {
        indicatorsGroups: appData.getIndicatorsSelected()
        // ,
        // yearsGroups: appData.getTndicatorYears()
    }),
    document.getElementById('components'));