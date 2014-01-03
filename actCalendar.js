 /*
 * 日历插件
 * @author GongYunyun(gongyy999@126.com)
 * @date    2013-12-25 23:11:24
 * @version V1.0
  +----------------------------------------------------------
 * @param option['date']   		--初始化日期(例2013-12-17)[可选]
 * @param option['box']   		--日历容器[可选]
 * @param option['eventDay']   	--点击日期执行的代码[可选]
 * @param option['callback']   	--加载当月日期后执行回调[可选]
  +----------------------------------------------------------
 */

function actCalendar(option){
	var date=option['date']?option['date'].split("-"):[new Date().getFullYear(),new Date().getMonth()+1],
		dayFunction=option['eventDay'],
		_this=this;

	this.year=date[0];
	this.month=date[1]-1;
	this.day=date[2]?date[2]:new Date().getDate();
	this.obj=$(option['box'])||$("#actCalendar");
	this.daysDom=this.obj.find(".days");
	this.nowDom=this.obj.find(".nowDate");
	this.monthList=this.obj.find("ul.monthList");
	this.yearList=this.obj.find("div.yearList");
	this.timeout=option['time']||400;	//用于保存输出日期后执行settimeout值
	this.callBack=option['callback'];	//输出日期后执行回调函数


	this.init=function(){
		this.nowDom.find(".prevMonth").click(function(){
			_this.prevMonth();
		});
		this.nowDom.find(".nextMonth").click(function(){
			_this.nextMonth();
		});
		this.nowDom.find(".prevYear").click(function(){
			_this.prevYear();
		});
		this.nowDom.find(".nextYear").click(function(){
			_this.nextYear();
		});

		/*显示选择年月框*/
		this.nowDom.find("span").click(function(e){

			var element=e.target;
			if(element.className==="year"){
				if(_this.yearList.is(":hidden")){
					_this.printYear();
					_this.yearList.show();
					_this.monthList.hide();
					return ;
				}
				_this.yearList.hide();
			}else if(element.className==="month"){
				if(_this.monthList.is(":hidden")){
					_this.monthList.show();
					_this.yearList.hide();
					return ;
				}
				_this.monthList.hide();
			}
		})

		/*选择月*/
		this.monthList.click(function(e){
			var element=$(e.target);
			if(_this.month==element.attr("data-value")){
				$(this).hide();
				return ;
			}
			element.addClass("current").siblings("li").removeClass("current");
			_this.month=element.attr("data-value");
			_this.printDate();
			$(this).hide();
		}).find("li[data-value='"+this.month+"']").addClass("current");


		/*选择年*/
		this.yearList.click(function(e){
			var element=e.target;
			if(element.tagName==="LI"){
				_this.year=element.getAttribute("data-value");
				_this.printDate();
				_this.yearList.hide();
			}else if(element.tagName==="A"){
				switch (element.className){
					case "prev":
						_this.printYear(_this.yearList.find("li:eq(0)").attr("data-value")-5);
						break;
					case "next":
						_this.printYear(_this.yearList.find("li:last").attr("data-value")*1+5);
						break;
					case "close":
						_this.yearList.hide();
						break;
					default:
						return ;
				}
			}
		})

		if(typeof dayFunction ==="function"){
			this.daysDom.click(function(e){
				var element=e.target.tagName!="LI"?e.target.parentNode:e.target,
					attr=element.getAttribute("data-date");

				if(_this.day==attr.split("/")[2]){
					$(element).addClass("current").siblings("li").removeClass("current");
				}
				_this.day=attr.split("/")[2];
				dayFunction(element,attr);
			})
		}
		this.printDate();
	};
	this.init();
}

 /*输出月数据
  +----------------------------------------------------------
 * @param 
  +----------------------------------------------------------
 */
actCalendar.prototype.printDate=function(y,m){
	var tpl="<b class=\"year\">{%year}</b>年<b class=\"month\">{%month}</b>月"
	this.year=typeof y!="undefined"?y:this.year;
	this.month=typeof m!="undefined"?m:this.month;
	this.nowDom.find("span").html(tpl.replace(/\{%year\}/,this.year).replace(/\{%month\}/,this.month*1+1));
	this.daysDom[0].innerHTML=this.getMonthHtml();

	/*如存在回调函数则执行回调，使用setTimeout避免快速切换日期时执行多余的回调，*/
	if(typeof this.callBack==="function"){
		var _this=this;
		clearTimeout(this.timeout);
		this.timeout=setTimeout(function(){
			_this.callBack(_this.daysDom,_this.year,_this.month<9?0+(_this.month*1+1):(_this.month*1+1));
		},_this.timeout);
	}
}


 /*输出可选年列表数据
  +----------------------------------------------------------
 * @param 
  +----------------------------------------------------------
 */
actCalendar.prototype.printYear=function(y){
	var list=[],
		html="",
		i=4,
		year=typeof y==="undefined"?this.year:y;
	tpl="<li data-value=\"{%y}\">{%y}</li>";
	while(i){
		html+=tpl.replace(/\{%y\}/g,function(){
			return year-i;
		})
		i--;
	}
	if(year==this.year){
		html+="<li class=\"current\" data-value=\""+year+"\">"+year+"</li>";
		i=1;
	}else{
		i=0;
	}
	
	while(i<5){
		html+=tpl.replace(/\{%y\}/g,function(){
			return +year+i;
		})
		i++
	}
	this.yearList.find("ul").html(html);

}

 /*上月
  +----------------------------------------------------------
 * @param 
  +----------------------------------------------------------
 */
actCalendar.prototype.prevMonth=function(m){
	if(typeof m!=="undefined"){
		this.month=m;
	}
	switch (this.month){
		case 0:
			this.year--;
			this.month=11;
			break;
		default:
			this.month--;
	}
	this.printDate();
}

 /*下月
  +----------------------------------------------------------
 * @param 
  +----------------------------------------------------------
 */
actCalendar.prototype.nextMonth=function(){
	switch (this.month){
		case 11:
			this.year++;
			this.month=0;
			break;
		default:
			this.month++;
	}
	this.printDate();
}

/*上年
  +----------------------------------------------------------
 * @param 
  +----------------------------------------------------------
 */
actCalendar.prototype.prevYear=function(){
	this.year--;
	this.printDate();
}

 /*下年
  +----------------------------------------------------------
 * @param 
  +----------------------------------------------------------
 */
actCalendar.prototype.nextYear=function(){
	this.year++;
	this.printDate();
}


 /*获取月天数
  +----------------------------------------------------------
 * @param y     哪年
 * @param m     哪月
  +----------------------------------------------------------
 */
actCalendar.prototype.getMonthDay=function(y,m){
	y=typeof y!="undefined"?y:this.year;
	m=typeof m!="undefined"?m:this.month;

	var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; 
	//判断是否是闰月 
    if ((y % 40 == 0 && y % 100 != 0) || y % 400 == 0){
        days[1] = 29; 
    }
    return days[m]; 
}


 /*获取当月DOM结构
  +----------------------------------------------------------
 * @param 
  +----------------------------------------------------------
 */
actCalendar.prototype.getMonthHtml=function(){
	var i=0,
		html="",
		yearMonth="",	//生成模板时使用
		tmpClass="",	//记录当前月class属性
		_this=this,
		days=this.getMonthDay(),
		firstDayWeek=(new Date(this.year,(this.month),1)).getDay(),	//当月第1天星期数
		weekCount=firstDayWeek,	//用于判断当月休息日
		complementNextDays=7-(days+firstDayWeek)%7;	//下月补全天数
		

	/*补全上月日期*/
	var	prevMonthDate=(this.month==0?(this.year-1)+",12":this.year+","+(this.month)).split(","),	//上月日期
		prevMonthDays=this.getMonthDay(prevMonthDate[0],prevMonthDate[1]-1);
	while(firstDayWeek--){
		html=tpl(getYearMonth("prev")+(prevMonthDays),firstDayWeek<1?"gray sun":"gray",prevMonthDays--)+html;	//补全的上月最后一天为休息日
	};

	/*当月数据*/
	for(i=0;i<days;i++){
		tmpClass=((weekCount+i)%7===0||(weekCount+i)%7===6)?"sun":"";
		if((i+1)==this.day){	//日期等于当天
			tmpClass+=" current";
		}
		html+=tpl(getYearMonth()+(i+1),tmpClass,i+1);
	};


	/*当月末日为星期六则不补全下月*/
	if((weekCount+days)%7!==0){

		/*补全下月日期*/
		i=1;
		while(complementNextDays--){
			html+=tpl(getYearMonth("next")+(i),complementNextDays<1?"gray sun":"gray",i++);
		};
	};
	html=html.replace(/-(\d+)/g,function(){	//日期补全（0）
		return arguments[1].length<2?"-0"+arguments[1]:"-"+arguments[1];
	})	
	return html;

	 /*模板生成
	  +----------------------------------------------------------
	 * @param arguments[0]	年-月-日
	 * @param arguments[1]	class属性值
	 * @param arguments[2]	当前日期
	  +----------------------------------------------------------
	 */
	function tpl(){
		var i=0,
			args=arguments;
			dom="<li data-date=\"{%s}\" class=\"{%s}\"><span></span><s class=\"d\">{%s}</s></li>";
		return dom.replace(/\{%s\}/g,function(){
			return args[i++];
		})
	}

	function getYearMonth(type){
		if(type==="prev"){
			return _this.month===0?(_this.year-1)+"-12-":_this.year+"-"+(_this.month)+"-";
		}else if(type==="next"){
			return _this.month===11?(_this.year*1+1)+"-1-":_this.year+"-"+(_this.month*1+2)+"-";
		}else{
			return _this.year+"-"+(_this.month*1+1)+"-";
		}

	}
}



