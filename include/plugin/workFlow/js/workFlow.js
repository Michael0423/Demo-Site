(function($) {

    $.fn.flowChart = function(options) {
        var opts = $.extend({}, $.fn.flowChart.defaults, options);
        return new FlowChart($(this), opts);
    }

	$.fn.flowChart.defaults = {
        data: [],
        peopleData: [],
        onAddLayer: null,
        onDeleteLayer: null,
        onAddPerson: null,
        onDeletePerson: null,
    };

    function FlowChart($container, opts) {
        var data = opts.data;
        var nodes = {};
        var rootNodes = [];
        this.opts = opts;
        this.$container = $container;
        var self = this;

    	this.draw = function(){
            $container.empty().append(rootNodes[0].render(opts));

            // 新增下一層
            $container.find(".add-layer").click(function(){

            });

            // 刪除層
            $container.find(".delete-layer").click(function(){

            });

            // 新增人
            // 刪除人

        }

        // draw org chart
        $container.addClass('flowChart');

        self.draw();
    }

})(jQuery);