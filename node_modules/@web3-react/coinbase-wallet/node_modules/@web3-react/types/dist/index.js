"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connector = void 0;
class Connector {
    /**
     * @param actions - Methods bound to a zustand store that tracks the state of the connector.
     * Actions are used by the connector to report changes in connection status.
     */
    constructor(actions) {
        this.actions = actions;
    }
    /**
     * Initiate a disconnect.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deactivate(...args) {
        this.actions.reportError(undefined);
    }
}
exports.Connector = Connector;
