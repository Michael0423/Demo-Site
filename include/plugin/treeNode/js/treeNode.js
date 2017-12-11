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
		var nodeRoot = $("<div>").prop("id","node_area");
		var nodeList = $("<ul>").prop("id", "node_root");
		var expendedIcon = $("<i>").prop("id", "icon").addClass("expended-icon");
		$(nodeRoot).append(expendedIcon, nodeList);
		$(nodeRoot).appendTo( _root );

		$.each(nodes, function(index, node) {
			_createNode( node, nodeList );
		});

		return _root;
	}

	function _createNode ( node, nodeRoot ) {
		var nodeId = ( node.id ) ? node.id : nodeCount;
		var nodeElement = $("<li>").prop("id", nodeId );

		$(nodeElement).html( node.text );
		$(nodeElement).appendTo( nodeRoot );

		if( node.child.length > 0 ) {

			nodeRoot = _createTree( node.child, nodeRoot );

		}

		return nodeRoot;
	}

})( jQuery );