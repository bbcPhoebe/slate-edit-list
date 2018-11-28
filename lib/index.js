// @flow
import Options from './options';
import { onEnter, onTab, onBackspace } from './handlers';
import core from './core';

const KEY_ENTER = 'Enter';
const KEY_TAB = 'Tab';
const KEY_BACKSPACE = 'Backspace';

/**
 * A Slate plugin to handle keyboard events in lists.
 */
function EditList(
    // Options for the plugin
    optionsFormat = {}
) {
    const opts = new Options(optionsFormat);
    const corePlugin = core(opts);

    return {
        ...corePlugin,

        onKeyDown: onKeyDown.bind(null, opts)
    };
}

/**
 * User is pressing a key in the editor
 */
function onKeyDown(opts, event, editor, next) {
    const args = [event, editor, opts, next];

    switch (event.key) {
        case KEY_ENTER:
            return onEnter(...args);
        case KEY_TAB:
            return onTab(...args);
        case KEY_BACKSPACE:
            return onBackspace(...args);
        default:
            return undefined;
    }
}

export default EditList;
