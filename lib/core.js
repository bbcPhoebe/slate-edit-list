// @flow
import Options from './options';
import { schema, validateNode } from './validation';
import {
    wrapInList,
    unwrapList,
    splitListItem,
    increaseItemDepth,
    decreaseItemDepth
} from './changes';
import {
    getItemDepth,
    isList,
    isSelectionInList,
    getCurrentItem,
    getCurrentList,
    getItemsAtRange,
    getPreviousItem
} from './utils';

/**
 * Returns the core of the plugin, limited to the validation and normalization
 * part of `slate-edit-list`, and utils.
 *
 * Import this directly: `import EditListCore from '@gitbook/slate-edit-table/lib/core'`
 * if you don't care about behavior/rendering.
 */
function core(
    // Options for the plugin
    optionsFormat = {}
) {
    const opts = new Options(optionsFormat);

    return {
        schema: schema(opts),
        validateNode: validateNode(opts),

        utils: {
            getCurrentItem: getCurrentItem.bind(null, opts),
            getCurrentList: getCurrentList.bind(null, opts),
            getItemDepth: getItemDepth.bind(null, opts),
            getItemsAtRange: getItemsAtRange.bind(null, opts),
            getPreviousItem: getPreviousItem.bind(null, opts),
            isList: isList.bind(null, opts),
            isSelectionInList: isSelectionInList.bind(null, opts)
        },

        changes: {
            decreaseItemDepth: bindAndScopeChange(opts, decreaseItemDepth),
            increaseItemDepth: bindAndScopeChange(opts, increaseItemDepth),
            splitListItem: bindAndScopeChange(opts, splitListItem),
            unwrapList: bindAndScopeChange(opts, unwrapList),
            wrapInList: wrapInList.bind(null, opts)
        }
    };
}

/**
 * Bind a change to given options, and scope it to act only inside a list
 */
function bindAndScopeChange(opts, fn) {
    return (editor, ...args) => {
        const { value } = editor;

        if (!isSelectionInList(opts, value)) {
            return editor;
        }

        // $FlowFixMe
        return fn(...[opts, editor].concat(args));
    };
}

export default core;
