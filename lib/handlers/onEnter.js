// @flow
import { unwrapList, splitListItem, decreaseItemDepth } from '../changes';
import { getCurrentItem, getItemDepth } from '../utils';

/**
 * User pressed Enter in an editor
 *
 * Enter in a list item should split the list item
 * Enter in an empty list item should remove it
 * Shift+Enter in a list item should make a new line
 */
function onEnter(event, editor, opts, next) {
    // Pressing Shift+Enter
    // should split block normally
    if (event.shiftKey) {
        return undefined;
    }

    const { value } = editor;
    const currentItem = getCurrentItem(opts, value);

    // Not in a list
    if (!currentItem) {
        return undefined;
    }

    event.preventDefault();

    // If expanded, delete first.
    if (value.isExpanded) {
        editor.delete();
        return next();
    }

    if (currentItem.isEmpty) {
        // Block is empty, we exit the list
        if (getItemDepth(opts, value) > 1) {
            decreaseItemDepth(opts, editor);
            return next();
        }
        // Exit list
        unwrapList(opts, editor);
        return next();
    }
    // Split list item
    splitListItem(opts, editor);
    return next();
}

export default onEnter;
