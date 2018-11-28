// @flow
import { getCurrentItem } from '../utils';

/**
 * Split a list item at the start of the current range.
 */
function splitListItem(opts, editor) {
    const { value } = editor;
    const currentItem = getCurrentItem(opts, value);
    if (!currentItem) {
        return editor;
    }

    const splitOffset = value.startOffset;

    return editor.splitDescendantsByKey(
        currentItem.key,
        value.start.key,
        splitOffset
    );
}

export default splitListItem;
