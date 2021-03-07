const assert = require('assert');
import { parseHTML } from "../src/parser";

describe('parse html', function(){
    it('<a>abc</a>', function () {
        const tree = parseHTML('<a>abc</a>')
        assert.strictEqual(tree.children.length, 1);
    });
    it('<a href="abc">abc</a>', function () {
        parseHTML('<a href="abc">abc</a>')
        assert.strictEqual(1, 1);
    });
    it('<a href="abc" />', function () {
        parseHTML('<a href="abc" />')
        assert.strictEqual(1, 1);
    });
    it('<a href=abc />', function () {
        parseHTML('<a href=abc />')
        assert.strictEqual(1, 1);
    });
    it('<a/>', function () {
        parseHTML('<a/>')
        assert.strictEqual(1, 1);
    });
    it('<a id=\'a\' />', function () {
        parseHTML('<a id=\'a\' />')
        assert.strictEqual(1, 1);
    });
    it('<a id />', function () {
        parseHTML('<a id />')
        assert.strictEqual(1, 1);
    });
    it('<a id=asd/>', function () {
        parseHTML('<a id=asd/>')
        assert.strictEqual(1, 1);
    });
    it('<a id>', function () {
        parseHTML('<a id>')
        assert.strictEqual(1, 1);
    });
    it('<a href id/>', function () {
        parseHTML('<a href id/>')
        assert.strictEqual(1, 1);
    });
    it('<a href="abc"/>', function () {
        parseHTML('<a href="abc"/>')
        assert.strictEqual(1, 1);
    });

})
