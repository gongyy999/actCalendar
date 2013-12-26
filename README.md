actCalendar
===========

不一样的日历插件，可自由在日历上输出数据，如用户生日、站点活动等。如自由控制用户点击日期后所执行的事件。如记录事务、往某个输入框插入时间格式数据等。

<p>最近很喜欢把一些东西做成模块，也算是一劳永逸吧。</p>
<p>忙中偷闲，做了个日历插件，不善长起名，暂起就叫actCalendar吧，因为起初是想在一些活动中可以运用。不过这货不是用来在form里输入时间格式的，而是运用在需要在日历上输出些自己的数据，又或者让用户在日历上记录数据。当然你也可以通过它的回调来实现日期格式数据的输入。你可以随意控制它来完成你独特的需求。</p>

<h2>使用actCalendar</h2>
<h3>DOM结构</h3>
<p>这个使用起来要比之前写的FormValidate简单很多，毕竟功能要简单很多。</p>
<p>在DOM结构上，还是和本人的其他插件一样，主张直接写在页面上。本人不太喜欢把固定的DOM结构交给JS来输出。以下是DOM结构</p>
<pre class="brush:html;">
	&lt;div class="calendar"&gt;
    &lt;p class="nowDate"&gt;
        &lt;a href="javascript:void(0)" class="prevYear"&gt;&lt;&lt;&lt;/a&gt;
        &lt;a href="javascript:void(0)" class="prevMonth"&gt;&lt;&lt;/a&gt;
        &lt;span&gt;1&lt;/span&gt;
        &lt;a href="javascript:void(0)" class="nextMonth"&gt;&gt;&lt;/a&gt;
        &lt;a href="javascript:void(0)" class="nextYear"&gt;&gt;&gt;&lt;/a&gt;
    &lt;/p&gt;
    &lt;p class="week"&gt;
        &lt;span class="sun"&gt;日&lt;/span&gt;&lt;span&gt;一&lt;/span&gt;&lt;span&gt;二&lt;/span&gt;&lt;span&gt;三&lt;/span&gt;&lt;span&gt;四&lt;/span&gt;&lt;span&gt;五&lt;/span&gt;&lt;span class="sun"&gt;六&lt;/span&gt;
    &lt;/p&gt;
    &lt;div class="yearList"&gt;
        &lt;ul&gt;&lt;/ul&gt;
        &lt;p&gt;&lt;a href="javascript:void(0)" class="prev"&gt;←&lt;/a&gt;&lt;a href="javascript:void(0)" class="next"&gt;→&lt;/a&gt;&lt;a href="javascript:void(0)" class="close"&gt;×&lt;/a&gt;&lt;/p&gt;
    &lt;/div&gt;
    &lt;ul class="monthList"&gt;
        &lt;li data-value="0"&gt;一月&lt;/li&gt;&lt;li data-value="1"&gt;二月&lt;/li&gt;&lt;li data-value="2"&gt;三月&lt;/li&gt;
        &lt;li data-value="3"&gt;四月&lt;/li&gt;&lt;li data-value="4"&gt;五月&lt;/li&gt;&lt;li data-value="5"&gt;六月&lt;/li&gt;
        &lt;li data-value="6"&gt;七月&lt;/li&gt;&lt;li data-value="7"&gt;八月&lt;/li&gt;&lt;li data-value="8"&gt;九月&lt;/li&gt;
        &lt;li data-value="9"&gt;十月&lt;/li&gt;&lt;li data-value="10"&gt;十一月&lt;/li&gt;&lt;li data-value="11"&gt;十二月&lt;/li&gt;
    &lt;/ul&gt;
    &lt;ul class="days"&gt;&lt;/ul&gt;
&lt;/div&gt;
</pre>

<p>最外层DIV的class可以修改，只要在实例化的时候带上能获取容器最外层的选择器即可。样式也可以随便控制，当然也可以使用下面DEMO的样式。</p>
<h3>实例化actCalendar</h3>
<p>首先当然是引入插件文件，之后就可以实例化插件来实现调用了。当然你可以实例化多个日历来满足你的需求。使用时，需要传入一个JSON对象，分别是：</p>
<ul>
	<li><b>date：</b>初始化日期，格式为YYYY-M-D，如：2013-12-24 [可选]</li>
	<li><b>box：</b>日历DOM结构最外层对象。插件会通过该对象查找其子节点来实现功能。使用JQUERY选择器的写法即可，如：“#actCalendar”</li>
	<li><b>eventDay：</b>点击日期后执行的回调，会往回调传入两个实参：点击的日期DOM对象和日期（YYYY-M-D）。你可以使用该回调，往相应的日期里记录数据。[可选]</li>
	<li><b>callback：</b>输出月数据后执行的回调，会往回调传入三个实参：日期列表DOM对象（如下图黑框区域）、当前年（YYYY）和当前月（M），你可以使用该回调，往日历上输出些标记。[可选]<br />
		<img src="http://www.itooy.com/Uploads/20131226/actCalendar.png" alt="" style="margin:10px;border:2px solid #e0e0e0">
	</li>
	<li><b>time：</b>当你设置了callback后，可以通过该参数设置执行回调的延时时间。可以通过该参数，减少用户在连续切换日期时带来的不必要的运算。默认为400。[可选]</li>
</ul>
<pre class="brush:javascript;">
	 &lt;script type="text/javascript" src="./actCalendar.js"&gt;&lt;/script&gt;
     var myDatePicker=new actCalendar({
     	"date":"2013-12-24",
        "eventDay":printDate.actList,
        "callback":printDate.monthData,
        "box":"#calendar",
        "time":400
    });
</pre>

<h3>发展方向</h3>
<p>目前还没头绪，有可能会加入from里输入日期格式的功能。不过在目前基础上使用eventDay回调已经很容易实现，当初制作初忠就是想做个不一样的日历插件。</p>
<p>也有可能会加入万年历或者，但又好像应用范围不广。</p>
<p>更有可能的是本人跑去写别的插件了。</p>
<p>所以，对于actCalendar未来发展方向最有可能的应该就是使用者们提出的使用范围更广的需求了。如果您有什么好的点子，来强化actCalendar，一定要联系我。</p>
