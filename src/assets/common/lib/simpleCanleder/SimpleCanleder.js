(function ($) {
    var first=''
    $.simpleCanleder = function (box, options) {
        window.boxElement=''
        var boxbegin=box
        var _canlederBox = "#SimpleCanleder_Year_Month";
        var _title_ul_li = ".title li";
        box = $(box);
        var box_height = parseFloat(box.height());
        var box_width = parseFloat(box.width());
        var boxOffset = box.offset();

        var canlederBox = null;
        box.click(function () {
            boxElement=boxbegin.id
            canlederBox = $(_canlederBox);
            if (canlederBox.length > 0) {
                canlederBox.show();
            } else {
                _buildCanlederBox();
                $("body").append(canlederBox);

                $(document).click(function (e) {
                    var pointX = e.pageX;
                    var pointY = e.pageY;
                    var $box = canlederBox.data("box");

                    var isCanlederBox = $(e.target).parents(_canlederBox);
                    if (canlederBox.is(":visible") && $box && e.target != $box[0] && isCanlederBox.length <= 0) {
                        var offset = canlederBox.offset();
                        var top = offset.top - 4;
                        var left = offset.left - 4;
                        var height = top + parseFloat(canlederBox.outerHeight()) + 4;
                        var width = left + parseFloat(canlederBox.outerWidth()) + 4;
                        if (pointX > left && pointY > top &&
                                pointX < width && pointY < height) {

                        } else {
                            canlederBox.hide();
                        }
                    }
                });
            }


            canlederBox.css({ "top": boxOffset.top + box_height + 6, "left": boxOffset.left });
            canlederBox.data("box", box);

            _init();

        });




        function _init() {
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            if (box.val()) {
                year = box.val().split("/")[0] * 1;
                month = box.val().split("/")[1] * 1;
            }

            canlederBox.find(_title_ul_li).eq(1).find("div.inner").html(_getSelect(year));
            canlederBox.find(".body li").each(function () {
                if ($(this).text() == month) {
                    $(this).addClass("cur");
                } else {
                    $(this).removeClass("cur");
                };
            });
        }

        function _buildCanlederBox() {
            canlederBox = $("<div/>");
            canlederBox.attr("id", "SimpleCanleder_Year_Month");

            _buildTitle(canlederBox);
            _buildBody(canlederBox);
            canlederBox.append($("<div/>").addClass("clear"));
            _buildBottom(canlederBox);

        };


        function _buildTitle(canlederBox) {
            var $title = $("<div/>").addClass("title").append("<ul/>").appendTo(canlederBox);
            var $title_ul = $title.find("ul");
            for (var i = 0; i < 3; i++) {
                var $li = $("<li/>").append($("<div/>").addClass("inner"));

                $li.hover(function () {
                    $(this).addClass("over");
                }, function () {
                    $(this).removeClass("over");
                });

                $title_ul.append($li);
            }
            var $title_ul_li = $title_ul.find("li");

            $title_ul_li.eq(0).click(function () {
                var year = $select.val();	//$select 在_getSelect()有定义
                canlederBox.find(_title_ul_li).eq(1).find("div.inner").html(_getSelect(--year));
            }).find("div.inner").text(" < ");

            $title_ul_li.eq(1).addClass("middle").click(function () {

            })
			.find("div.inner").addClass("paddingTop").html(_getSelect());

            $title_ul_li.eq(2).click(function () {
                var year = $select.val();	//$select 在_getSelect()有定义
                canlederBox.find(_title_ul_li).eq(1).find("div.inner").html(_getSelect(++year));
            }).find("div.inner").text(" > ");
        };

        function _buildBody(canlederBox) {
            var $body = $("<div/>").addClass("body").append("<ul/>").appendTo(canlederBox);
            var $body_ul = $body.find("ul");
            for (var i = 0; i < 12; i++) {
                var $inner = $("<div/>").addClass("inner").text(i + 1);
                var $li = $("<li/>").append($inner).click(function () {
                    var year = canlederBox.find(_title_ul_li).eq(1).find("select").val();
                    var month = $(this).find("div.inner").text() * 1;
                    month = month < 10 ? "0" + month : month;
                    var datas=year + "/" + month
                    canlederBox.data("box").val(datas);
                    options.callback&&options.callback(datas,boxElement)
                    canlederBox.hide();
                });

                $li.hover(function () {
                    $(this).addClass("over");
                }, function () {
                    $(this).removeClass("over");
                });

                $body_ul.append($li);
            }
        };

        function _buildBottom(canlederBox) {
            var $button_clear = $("<button/>").addClass("clear").click(function () {
                options.callback&&options.callback('',boxElement)
                canlederBox.data("box").val("");
                canlederBox.hide();
            }).text("清空");
            var $bottom = $("<div/>").addClass("bottom").append($button_clear);
            canlederBox.append($bottom);

        };


        var $select = null;
        function _getSelect(year) {
            if (!year) {
                year = new Date().getFullYear();
            }

            $select = $("<select/>");
            for (var i = 10; i >= 0; i--) {
                $select.append($("<option/>").text(year - i));
            }
            for (var i = 1; i <= 20; i++) {
                $select.append($("<option/>").text(year + i));
            }
            $select.find("option").each(function () {
                if ($(this).text() == year) {
                    $(this).attr("selected", "selected");
                }
            });
            return $select;
        };



    };

    $.fn.extend({
        simpleCanleder: function (options) {
            options = $.extend({}, options);
            this.each(function () {
                new $.simpleCanleder(this, options);
            });
            return this;
        }
    });
})(jQuery);
