// @flow
import { Block } from 'slate';

import {
    getPreviousItem,
    getCurrentItem,
    getListForItem,
    isList
} from '../utils';

/**
 * Increase the depth of the current item by putting it in a sub-list
 * of previous item.
 * For first items in a list, does nothing.
 */
function increaseItemDepth(opts, editor) {
    const previousItem = getPreviousItem(opts, editor.value);
    const currentItem = getCurrentItem(opts, editor.value);

    if (!previousItem) {
        return editor;
    }

    if (!currentItem) {
        return editor;
    }

    // Move the item in the sublist of previous item
    return moveAsSubItem(opts, editor, currentItem, previousItem.key);
}

/**
 * Move the given item to the sublist at the end of destination item,
 * creating a sublist if needed.
 */
function moveAsSubItem(opts, editor, item, destKey) {
    const destination = editor.value.document.getDescendant(destKey);
    const lastIndex = destination.nodes.size;
    const lastChild = destination.nodes.last();

    // The potential existing last child list
    const existingList = isList(opts, lastChild) ? lastChild : null;

    if (existingList) {
        return editor.moveNodeByKey(
            item.key,
            existingList.key,
            existingList.nodes.size // as last item
        );
    }
    const currentList = getListForItem(opts, editor.value, destination);
    if (!currentList) {
        throw new Error('Destination is not in a list');
    }

    const newSublist = Block.create({
        object: 'block',
        type: currentList.type,
        data: currentList.data
    });

    editor.insertNodeByKey(destKey, lastIndex, newSublist, {
        normalize: false
    });

    return editor.moveNodeByKey(item.key, newSublist.key, 0);
}

export default increaseItemDepth;
