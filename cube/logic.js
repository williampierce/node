// Contains the business logic. Maintains state based on inputs; updates device state.

var deviceControl = require("./deviceControl");

function updateState(state)
{
    // Todo: maintain all device state here; publish the majority.
    deviceControl.setState(state);
}

exports.updateState = updateState;
