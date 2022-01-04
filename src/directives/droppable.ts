import $ from 'jquery';
import 'jquery-ui'
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/droppable';

export default {
	bind: function (el: Element, binding: any, vNode: any) {
		$(el).droppable({
			drop: function (e, ui) {
				vNode.componentInstance.add(e, ui);
			}
		});
	}
}
