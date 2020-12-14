/* Fit Height or Width */
'use strict';

var fwohSelector = "fwoh";
var DEBUG = false;

function debug() {
    if (DEBUG && arguments.length > 0)
    {
        let args = Array.from(arguments);
        args.unshift("[fwoh]");
        console.log.apply(null, args);
    }
}

function isElement(obj) {
    return obj instanceof Element || obj instanceof HTMLDocument;  
}

function isIterable(obj) {
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}

function getMutationElements(mutations) {
    var mutationElements = [];

    if (isIterable(mutations)) {
        for (const mutation of mutations) {
            const node = mutation.addedNodes[0];
            if (isElement(node)) {
                mutationElements.push(node);
            }
        }
    }

    return mutationElements;
}

function resizeNode(node) {
    // Make sure node is an element
    if (isElement(node)) {
        // Get node and parent dimensions
        let nodeRect = node.getBoundingClientRect();
        const parentRect = node.parentNode.getBoundingClientRect();
        // Get node and parent aspect ratios
        const nodeAspectRatio = nodeRect.width / nodeRect.height;
        const parentAspectRatio = parentRect.width / parentRect.height;

        if (parentAspectRatio > nodeAspectRatio) {
            debug(`Adjusting to parent width (${parentRect.width})`, node);
            node.style.width = parentRect.width + "px";
            node.style.height = (parentRect.width / nodeAspectRatio) + "px";
        } else {
            debug(`Adjusting to parent height (${parentRect.height})`, node);
            node.style.height = parentRect.height + "px";
            node.style.width = (parentRect.height * nodeAspectRatio) + "px";
        }
    }
}

function resizeNodes(nodeList) {
    var nodes = null;

    if (nodeList == null)
    {
        nodes = Array.from(document.getElementsByClassName(fwohSelector));
    } else if (isIterable(nodeList)) {
        nodes = nodeList;
    } else if (isElement(nodeList)) {
        nodes = [nodeList];
    } else {
        return null;
    }

    for (const node of nodes) {
        if (isElement(node)) {
            if (node.complete === false) {
                node.addEventListener("load", () => resizeNode(node));
            } else {
                resizeNode(node);
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Resize all initial nodes
    resizeNodes();

    // Resize future nodes
    var observer = new MutationObserver(function(mutations) {
        const newElements = getMutationElements(mutations);
        resizeNodes(newElements);
    });
    observer.observe(document, {
        attributes: false,
        childList: true,
        characterData: false,
        subtree:true
    });
});

// Resize nodes whenever the screen changes size
window.addEventListener('resize', () => resizeNodes());
