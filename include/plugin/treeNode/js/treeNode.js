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
			expandIcon_style: "tradition",
			nodes: [], // The data array of tree node
			click: function( nodeData, nodeElement ) {} // The click event of node.
		};

 		// ["close-status". "open-status"]
		this.expandIconStyle = {
			"tradition" : ["fa-plus fa-xs", "fa-minus fa-xs"],
			"caret" : ["fa-caret-right", "fa-caret-down"]
		};

		// this.options = $.extend( true, defaultOption, options );
		this.options = $.extend( defaultOption, options );

		var _root = $("<div>").prop("id", "treeNode-root");

		_createTree( this.options.nodes, _root, this.expandIconStyle[this.options.expandIcon_style], this.options.click );

		$(_root).appendTo(this);
	}


	function _createTree( nodes, _root, expandIconStyle, clickEvent ) {

		var nodeRoot = $("<ul>").addClass("treeNode-ul");

		$(nodeRoot).appendTo( _root );

		$.each( nodes, function( index, node ) {

			_createNode( node, nodeRoot, expandIconStyle, clickEvent );

		});

	}

	function _createNode ( node, nodeRoot, expandIconStyle, clickEvent ) {

		var nodeElement = $("<li>").addClass("treeNode-li");
		var expandIcon = $("<i>").addClass("expand-icon").addClass("fa "+expandIconStyle[1]).hide();
		var nodeName = $("<span>").addClass("node-name").text(node.text);

		// $(nodeElement).append( expandIcon, nodeName );
		$(nodeElement).append( nodeName, expandIcon );
		$(nodeElement).appendTo(nodeRoot);

		if( node.child.length > 0 ) {

			$(expandIcon).show();
			_createTree( node.child, nodeElement, expandIconStyle, clickEvent );

			// 縮合
			$(expandIcon).click( function () {

				if( $(this).hasClass(expandIconStyle[0]) ) {

					$(this).removeClass(expandIconStyle[0]).addClass(expandIconStyle[1]);

					$(this).siblings("ul").toggle(300);

				} else {

					$(this).removeClass(expandIconStyle[1]).addClass(expandIconStyle[0]);

					$(this).siblings("ul").toggle(300);

				}

			});

		}

		if( clickEvent ) {

			$(nodeName).click( function () {

				clickEvent( node, nodeElement );

			});

		}

	}

})( jQuery );