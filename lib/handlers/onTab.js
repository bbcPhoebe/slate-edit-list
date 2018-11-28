// @flow
import { decreaseItemDepth, increaseItemDepth } from '../changes';
import { getCurrentItem } from '../utils';

/**
 * User pressed Tab in an editor.
 * Tab       -> Increase item depth if inside a list item
 * Shift+Tab -> Decrease item depth if inside a list item
 */
function onTab(event, editor, opts) {
    const { value } = editor;
    const { isCollapsed } = value;

    if (!isCollapsed || !getCurrentItem(opts, value)) {
        return undefined;
    }

    // Shift+tab reduce depth
    if (event.shiftKey) {
        event.preventDefault();

        return decreaseItemDepth(opts, editor);
    }

    // Tab increases depth
    event.preventDefault();

    return increaseItemDepth(opts, editor);
}

export default onTab;
