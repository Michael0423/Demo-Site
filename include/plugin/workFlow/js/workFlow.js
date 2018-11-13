(function($) {

    $.fn.flowChart = function(options) {
        var opts = $.extend({}, $.fn.flowChart.defaults, options);
        return new FlowChart($(this), opts);
    }

    $.fn.flowChart.defaults = {
        flowData: [], // [{ uid: "user_id", name: "user_name", org: "org_name" }]
        userData: [], // [{ uid: "user_id", name: "user_name", org_id: "org_id", org_name: "org_name" }]
        isEdit: true, // 是否可編輯
        addUserAction: null,
        complete: function ( ui ) {} // ui: element of flow chart
    };

    function FlowChart($container, opts) {
        this.data = opts.flowData;
        this.userData = opts.userData;
        this.opts = opts;
        this.$container = $container;
        var self = this;

        this.draw = function() {
            $container.empty().append(self.render());

            if(self.opts.complete !== undefined){
                self.opts.complete($container);
            }
        }

        // 產生layer卡片
        this.createLayer = function() {
            var layerIndex = $container.find(".ui-flow-layer").length + 1;

            var layerArea = $("<div class='ui-flow-layer'>");

            var layer = $("<div class='layer'>").append(
                $("<div>").text("第 " + layerIndex + " 層"),
                $("<div class='ui-flow-btn-area'>").append(
                    $("<div class='ui-flow-btn pull-right delete-layer-btn'>").append(
                        $("<i class='fa fa-trash-o'>")
                    ),
                    $("<div class='ui-flow-btn pull-right add-person-btn'>").append(
                        $("<i class='fa fa-user-plus'>")
                    )
                )
            );

            var peopleArea = $("<div class='ui-flow-person'>");

            var addLayerBtn = $("<div class='ui-flow-btn pull-left add-layer-btn'>").append(
                $("<i class='fa fa-plus'>")
            );

            layerArea.append(layer, peopleArea, addLayerBtn);

            if (!self.opts.isEdit) {
                $(layerArea).find(".ui-flow-btn").remove();
            }else{
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
            }

            return layerArea;
        }

        // 產生person卡片
        this.createPerson = function(person) {
            if(person === undefined) person = { };

            var personArea = $("<div class='person'>").append(
                $("<div>").append(
                    $("<span class='person-org'>").text(person.org_name),
                    $("<span class='person-name'>").text(person.name),
                    $("<span class='ui-flow-btn pull-right delete-user-btn'>").append(
                        $("<i class='fa fa-trash-o'>")
                    )
                ),
                $("<div>").append(
                    $("<div class='select-btn pull-left'>").append(
                        $("<div class='ui-flow-btn'>").append(
                            $("<i class='fa fa-square-o'>")
                        )
                    ),
                    $("<div class='pull-left'>").text("是否需通過此人")
                )
            );

            if (!self.opts.isEdit) {
                $(personArea).find(".ui-flow-btn").remove();
            } else {
                // 刪除人員
                $(personArea).find(".delete-user-btn").click(function(){
                    var layerIndex = $(this).parents(".ui-flow-layer").index() / 2 + 1;
                    var personIndex = $(this).parents(".person").index() + 1;
                    self.delPerson(layerIndex, personIndex);

                    $(this).parents(".person").remove();
                });

                // 需通過此人
                $(personArea).find(".select-btn").click(function(){
                    var layerIndex = $(this).parents(".ui-flow-layer").index() / 2;
                    var personIndex = $(this).parents(".person").index();

                    var isNeeded = false;
                    if($(this).children("i").hasClass("fa-square-o")){
                        $(this).children("i").removeClass("fa-square-o").addClass("fa-check-square-o");
                        isNeeded = true;
                    }else{
                        $(this).children("i").removeClass("fa-check-square-o").addClass("fa-square-o");
                        isNeeded = false;
                    }

                    self.data[layerIndex][personIndex]["need"] = isNeeded;
                });
            }

            return personArea;
        }

        // 產生初始新增按鈕
        this.init = function() {
            var rootNode = $("<div class='root'>").append(
                $("<i class='fa fa-plus'>")
            );

            $(rootNode).click(function() {
                $(this).hide();
                self.addLayer(true);
            });

            $container.append(rootNode);
        }

        // flowData add one data of layer
        this.addLayer = function(isFirst) {
            self.data.push([]);
            self.render();
        }

        // flowData delete given data of layer
        this.delLayer = function(layerIndex) {
            self.data.splice(layerIndex-1, 1);
            self.render();
        }

        // flowData add one data of person of layer
        this.addPerson = function(layerIndex) {
            var userData = self.userData;
            var selectData = [];
            var putArea = $container.find(".ui-flow-layer").eq(layerIndex-1).find(".ui-flow-person");
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
                            $("#userSelectDailog").bsDialogSelect("close");
                            if(userIDList){
                                var userIdArr = userIDList.split(",");
                                $.each(userIdArr, function(index, userId){
                                    var person = userData.find(function(e){return e.uid == parseInt(userId);});
                                    var personArea = self.createPerson(person);
                                    $(personArea).appendTo(putArea);
                                    self.data[layerIndex-1].push(person);
                                });

                            }else{
                                msgDialog("尚未選擇使用者");
                            }
                        }
                    }
                ]
            });
        }

        // flowData delete given data of person of layer
        this.delPerson = function(layerIndex, personIndex) {
            self.data[layerIndex-1].splice(personIndex-1, 1);
            self.render();
        }

        // create UI
        this.render = function() {
            $container.empty();
            var flowData = self.data;

            if(flowData.length > 0){
                $.each(flowData, function(layerIndex, layerData) {
                    var layerArea = self.createLayer();
                    $container.append(layerArea);

                    if (flowData[layerIndex + 1] != undefined) {
                        $(layerArea).find(".add-layer-btn").remove();
                        $container.append($("<div class='ui-flow-line'>").append($("<div class='line'>")));
                    }

                    if (layerData.length > 0) {
                        var peopleArea = $(layerArea).find(".ui-flow-person");

                        $.each(layerData, function(personIndex, personData) {
                            var person = self.createPerson(personData);
                            $(peopleArea).append(person);
                        });
                    }
                });
            }else{
                self.init();
            }
        }

        // 取得目前設定的 flowData
        this.getSettingData = function () {
            return self.data;
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