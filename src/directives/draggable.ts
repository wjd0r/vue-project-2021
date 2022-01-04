import $ from 'jquery';
import 'jquery-ui';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/draggable';

export default {
	bind: function (el: Element, binding: any, vNode: any) {
		$(el).draggable({
			revert: true,
			helper: 'clone',
			// handle: '.block-drag',
			appendTo: document.body,
			zIndex: 99999
		});
	}
};
