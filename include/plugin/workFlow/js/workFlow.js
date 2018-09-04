(function($) {

    $.fn.flowChart = function(options) {
        var opts = $.extend({}, $.fn.flowChart.defaults, options);
        return new FlowChart($(this), opts);
    }

    $.fn.flowChart.defaults = {
        flowData: [], // [{ uid: "user_id", name: "user_name", org: "org_name" }]
        userData: [], // [{ uid: "user_id", name: "user_name", org_id: "org_id", org_name: "org_name" }]
        isEdit: true, // 是否可編輯
        addUserAction: null
    };

    function FlowChart($container, opts) {
        this.data = opts.flowData;
        this.userData = opts.userData;
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

            if (!self.opts.isEdit) {
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
                    $("<i>").addClass("fa fa-trash")
                )
            );

            if (!self.opts.isEdit) {
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

        this.delLayer = function(layerIndex) {
            self.data.splice(layerIndex, 1);
            self.render();
        }

        this.addPerson = function(layerIndex) {
            var userData = self.userData;
            var selectData = [];

            $("#userSelectDailog").remove();
            var userSelectDailog = $("<div>").prop("id", "userSelectDailog").appendTo("body");
            var d = $(userSelectDailog).bsDialogSelect({
                autoShow: true,
                showFooterBtn: true,
                headerCloseBtn: false,
                title: "選擇使用者",
                data: userData,
                selectData: selectData,
                textTag: "name",
                valeTag: "uid",
                group: true, //群組開關
                groupOption: self.groupOption,
                groupIDTag: "org_id",
                onlySelect: false,
                button:[
                    {
                        text: "取消",
                        // className: "btn-success",
                        click: function(){
                            $("#userSelectDailog").bsDialogSelect("close");
                        }
                    },
                    {
                        text: "確定",
                        className: "btn-success",
                        click: function(){
                            var userIDList = d.getValue();
                            var userIDListText = d.getText();
                            // console.log(userIDList, userIDListText);
                            $("#userSelectDailog").bsDialogSelect("close");
                            if(userIDList){
                                console.log(userData, userIDList);
                            }else{
                                msgDialog("尚未選擇使用者");
                            }
                        }
                    }
                ]
            });
        }

        this.delPerson = function(layerIndex, personIndex) {
            self.data[layerIndex].splice(personIndex, 1);
            self.render();
        }

        this.render = function() {
            $container.empty();
            var flowData = self.data;

            $.each(flowData, function(layerIndex, layerData) {
                var layerArea = self.createLayer();

                // 增加下一層
                $(layerArea).find(".add-layer-btn").click(function() {
                    self.addLayer();
                });

                // 刪除層
                $(layerArea).find(".delete-layer-btn").click(function() {
                    self.delLayer(layerIndex);
                });

                // 新增人
                $(layerArea).find(".add-person-btn").click(function() {
                    self.addPerson(layerIndex);
                });

                $container.append(layerArea);

                if (flowData[layerIndex + 1] != undefined) {
                    $(layerArea).find(".add-layer-btn").remove();
                    $container.append($("<div class='ui-flow-line'>").append($("<div class='line'>")));
                }

                if (layerData.length > 0) {
                    var peopleArea = $(layerArea).find(".ui-flow-person");
                    $.each(layerData, function(personIndex, personData) {
                        var person = self.createPerson();
                        // $(person).data(personData.uid);

                        $(person).find(".person-org").text(personData.org);
                        $(person).find(".person-name").text(personData.name);

                        $(person).find(".delete-user-btn").click(function() {
                            self.delPerson(layerIndex, personIndex);
                        });

                        $(peopleArea).append(person);
                    });
                }
            });
        }

        // draw org chart
        $container.addClass('flowChart');

        // 處理人員群組資料
        var groupTitle = [], groupTitleID = [];
        $.each(self.userData, function(i, v){
            if(groupTitleID.indexOf(v.org_id) == -1){
                groupTitleID.push(v.org_id);
                groupTitle.push(v.org_name);
            }
        });
        self.groupOption = {
            title: groupTitle,
            titleID: groupTitleID
        };
        self.draw();
    }

})(jQuery);