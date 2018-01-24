// 日历组件
 function DatePicker() {
            this.contentBox = null;    //日历容器
            this.contentBoxTable = null;
            this.toolbarBox = null;    //底部工具栏

            this.year = 0;
            this.month = 0;
            this.date = 0;

            this.weekList = ['日','一','二','三','四','五','六'];
            this.monthDate = [31,28,31,30,31,30,31,31,30,31,30,31]; // 每月的天数

            this.eventHandler = {
                'choosedate' : [],
                'hide' : [],
                'show' : []
            }

            this.init();
        }
        DatePicker.prototype = {
            constructor : DatePicker,
            init : function() {
                var oDate = new Date();
                this.year = oDate.getFullYear();
                this.month = oDate.getMonth();
                this.date = oDate.getDate();

                this.createContentBox();
                this.createHeaderBox();
                this.createListBox();
            },
            createContentBox : function() {
                this.contentBox = document.createElement('div');
                this.contentBox.className = 'datePickerBox';

                this.contentBoxTable = document.createElement('table');
                this.contentBox.appendChild(this.contentBoxTable);

                document.body.appendChild(this.contentBox);
            },
            createHeaderBox : function() {

                var _this = this;

                var html = '<thead><tr>';

                for (var i=0; i<this.weekList.length; i++) {
                    html += '<td>'+this.weekList[i]+'</td>';
                }

                html += '</thead></tr><tbody></tbody>';
                this.contentBoxTable.innerHTML = html;

                this.contentBoxTable.tBodies[0].onclick = function(ev) {

                    _this.trigger('choosedate', {
                        y : _this.year,
                        m : _this.month,
                        d : ev.target.innerHTML
                    });

                }
            },
            createListBox : function() {

                var rows = Math.ceil(( this.getWeekByfirstDay() + this.getDays() ) / 7);

                var html = '<tbody><tr>';

                for (var i=1; i<=rows*7; i++) {

                    var d = i - this.getWeekByfirstDay();

                    if (d >= 1 && d <= this.getDays()) {
                        if (d == this.date) {
                            html += '<td style="color:red">'+ d +'</td>';
                        } else {
                            html += '<td>'+ d +'</td>';
                        }
                    } else {
                        html += '<td></td>';
                    }

                    if (i % 7 == 0) {
                        html += '</tr><tr>';
                    }
                }

                html += '</tr></tbody>';

                this.contentBoxTable.tBodies[0].innerHTML = html;

            },
            isLeapYear : function() {
                return (this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0;
            },
            getDays : function() {
                if (this.month == 1 && this.isLeapYear()) {
                    return 29;
                }
                return this.monthDate[this.month];
            },
            getWeekByfirstDay : function() {
                var oDate = new Date();
                oDate.setFullYear(this.year);
                oDate.setMonth(this.month);
                oDate.setDate(1);
                return oDate.getDay();
            },
            setDate : function(y, m, d) {
                var oDate = new Date();
                this.year = y;
                this.month = m;
                this.date = d;

                this.createListBox();
            },
            show : function(obj) {

                var scrollLeft = document.documentElement.scrollLeft;
                var scrollTop = document.documentElement.scrollTop;

                var p = obj.getBoundingClientRect();

                var l = p.left + scrollLeft;
                var t = p.top + scrollTop;

                this.contentBox.style.left = l + 'px';
                this.contentBox.style.top = t + obj.offsetHeight + 'px';

                this.contentBox.style.display = 'block';
            },
            hide : function() {
                var _this = this;
                setTimeout(function() {
                    _this.contentBox.style.display = 'none';
                }, 100)
            },
            on : function(evname, callback) {
                this.eventHandler[evname].push(callback);
            },
            trigger : function(evname, ev) {
                var arr = this.eventHandler[evname];
                for (var i=0; i<arr.length; i++) {
                    arr[i].call(this, ev);
                }
            }
        }