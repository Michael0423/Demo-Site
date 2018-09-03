(function($) {

    $.fn.flowChart = function(options) {
        var opts = $.extend({}, $.fn.flowChart.defaults, options);
        console.log(opts);
        return new FlowChart($(this), opts);
    }

    $.fn.flowChart.defaults = {
        flowData: [],
        isEdit: true, // 是否可編輯
        peopleData: []
    };

    function FlowChart($container, opts) {
        this.data = opts.flowData;
        this.opts = opts;
        this.$container = $container;
        var self = this;

        this.draw = function() {
            if (self.data.length == 0) {
                self.init();
            } else {
                $container.empty().append(self.render());
            }
        }

        // 產生layer
        this.createLayer = function() {
            var layerIndex = $container.find(".ui-flow-layer").length + 1;

            var layerArea = $("<div class='ui-flow-layer'>");

            var layer = $("<div class='layer'>").append(
                $("<span>").text("第" + layerIndex + "層"),
                $("<span>").append(
                    $("<div class='action-btn delete-layer-btn'>").append(
                        $("<i class='fa fa-trash'>")
                    ),
                    $("<div class='action-btn add-person-btn'>").append(
                        $("<i class='fa fa-user-plus'>")
                    )
                )
            );

            var peopleArea = $("<div>").addClass("ui-flow-person");

            var addLayerBtn = $("<div>").addClass("action-btn add-layer-btn").append(
                $("<i>").addClass("fa fa-plus")
            );

            layerArea.append(layer, peopleArea, addLayerBtn);

            if(!self.opts.isEdit){
                $(layerArea).find(".action-btn").remove();
            }

            return layerArea;
        }

        // 產生person
        this.createPerson = function() {
            var personArea = $("<div>").addClass("person").append(
                $("<span>").addClass("person-org"),
                $("<span>").addClass("person-name"),
                $("<div>").addClass("action-btn delete-user-btn").append(
                    $("<i>").addClass("fa fa-trash-alt")
                )
            );

            if(!self.opts.isEdit){
                $(personArea).find(".action-btn").remove();
            }

            return personArea;
        }

        this.init = function() {
            var rootNode = $("<div>").addClass("root").append(
                $("<i>").addClass("fa fa-plus")
            );

            $(rootNode).click(function() {
                $(this).hide();
                self.addLayer(true);
            });

            $container.append(rootNode);
        }

        this.addLayer = function(isFirst) {
            self.data.push([]);
            self.render();
        }

        this.delLayer = function( layerIndex ) {
            self.data.splice(layerIndex, 1);
            self.render();
        }

        this.addPerson = function () {

        }

        this.delPerson = function ( layerIndex, personIndex ) {
            self.data[layerIndex].splice(personIndex, 1);
            self.render();
        }

        this.render = function() {
            $container.empty();
            var flowData = self.data;

            $.each(flowData, function(layerIndex, layerData){
                var layerArea = self.createLayer();

                $(layerArea).find(".add-layer-btn").click(function() {
                    self.addLayer();
                });

                $(layerArea).find(".delete-layer-btn").click(function(){
                    self.delLayer(layerIndex);
                });

                $container.append(layerArea);

                if(flowData[layerIndex+1] != undefined){
                    $(layerArea).find(".add-layer-btn").remove();
                    $container.append($("<div class='ui-flow-line'>").append($("<div class='line'>")));
                }

                if (layerData.length > 0) {
                    var peopleArea = $(layerArea).find(".ui-flow-person");
                    $.each(layerData, function(personIndex, personData){
                        var person = self.createPerson();

                        $(person).find(".person-org").text(personData.org);
                        $(person).find(".person-name").text(personData.name);

                        $(person).find(".delete-user-btn").click(function(){
                            self.delPerson(layerIndex, personIndex);
                        });

                        $(peopleArea).append(person);
                    });
                }
            });
        }

        // draw org chart
        $container.addClass('flowChart');

        self.draw();
    }

})(jQuery);