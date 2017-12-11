( function ( $ ) {

	$.fn.treeNode = function( options ) {

		/***********************************************/
		/* node = {									   */
		/*	id: 0, 									   */
		/*	text: "", // The text of the node.		   */
		/*	child: [] // Children nodes of the node.   */
		/* }										   */
		/***********************************************/
		var defaultOption = {
			data: [], // The data array of tree node
			// click: function() {} // The click event of node.
		};

		this.options = $.extend( true, defaultOption, options );

		var _root = $("<div>").prop("id", "root");

		_createTree( this.options.data, _root );

		$(_root).appendTo(this);
	}

	function _createTree( nodes, _root ) {
		var nodeRoot = $("<ul>");

		$(nodeRoot).appendTo( _root );

		$.each( nodes, function( index, node ) {
			_createNode( node, nodeRoot );
		});
		// return _root;
	}

	function _createNode ( node, nodeRoot ) {
		var nodeElement = $("<li>");
		var expendedIcon = $("<i>").addClass("fa fa-minus").hide();
		var nodeName = $("<span>").text(node.text);

		$(nodeElement).append( expendedIcon, nodeName );
		$(nodeElement).appendTo(nodeRoot);

		if( node.child.length > 0 ) {
			$(expendedIcon).show();
			_createTree( node.child, nodeElement );

			// 縮合
			$(expendedIcon).click( function () {
				if( $(this).hasClass("fa-plus") ) {
					$(this).removeClass("fa-plus").addClass("fa-minus");

					$(this).siblings("ul").toggle(300);
				} else {
					$(this).removeClass("fa-minus").addClass("fa-plus");

					$(this).siblings("ul").toggle(300);
				}
			});
		}
	}

})( jQuery );