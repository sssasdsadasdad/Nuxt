/**
 * [getDayPrevAfter 获得n天前/后的日期]
 * @param {[String]} date [日期，非必填参数，表示调用时的时间]
 * @param {[String]} type [前一天还是后一天，非必填参数，默认后一天]
 * @param {[Int]} daysNum [天数，非必填参数，默认一天]
 * @return {[Date]} [description]
 */
export function getDayPrevAfter( date, type, daysNum ) {
	date = date ? date : new Date();
	type = type ? type : 'after';
	daysNum = daysNum ? daysNum : 1;
	if ( !( date instanceof Date ) ) {
		if ( date.indexOf( '-' ) != -1 ) {
			date.replace( /\-/g, '/' );
		}
		date = new Date( date );
	}
	let returnDate = date;
	if ( type === 'prev' ) {
		returnDate = new Date( date.getTime() - ( daysNum * 24 * 60 * 60 * 1000 ) );
	} else if ( type === 'after' ) {
		returnDate = new Date( date.getTime() + ( daysNum * 24 * 60 * 60 * 1000 ) );
	}
	return returnDate;
}
/**
 * [getFormatDateStr 获得指定日期格式的字符串]
 * @param {[String or Date]} date [要转换的日期，必填]
 * @param {[String]} dateFormatStr [要转化的目标格式，必填，2016-11-22之间的分隔符可任意，可选项：
 * 'yyyy-mm-dd hh:mm:ss','yyyy/mm/dd hh:mm:ss','yyyy.mm.dd hh:mm:ss','yyyy年mm月dd hh:mm:ss',
 * 'yyyy-mm-dd hh:mm',
 * 'mm-dd hh:mm',
 * 'yyyy-mm-dd',
 * 'mm-dd',
 * 'hh:mm:ss',
 * 'hh:mm'
 * ]
 * @return {[String]} [时间格式字符串]
 */
export function getFormatDateStr( date, dateFormatStr ) {
	if ( !( date instanceof Date ) ) {
		if ( date.indexOf( '-' ) != -1 ) {
			date.replace( /\-/g, '/' );
		}
		date = new Date( date );
	}
	dateFormatStr = dateFormatStr.toLowerCase();
	if ( !dateFormatStr ) {
		return false;
	}
	let returnStr = '',
		separator = _getDateStrSeparator( dateFormatStr ),
		year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate(),
		hour = date.getHours(),
		minute = date.getMinutes(),
		second = date.getSeconds();
	if ( /^yyyy(.{1})mm(.{1})dd hh:mm:ss$/.test( dateFormatStr ) ) {
		if ( _isDateStrSeparatorCh( dateFormatStr ) ) {
			returnStr = `${year}年${zeroPadding(month)}月${zeroPadding(day)}日`;
		} else {
			separator =
				returnStr = `${year}${separator}${zeroPadding(month)}${separator}${zeroPadding(day)}`;
		}
		returnStr += ` ${zeroPadding(hour)}:${zeroPadding(minute)}:${zeroPadding(second)}`;
	} else if ( /^yyyy(.{1})mm(.{1})dd hh:mm$/.test( dateFormatStr ) ) {
		if ( _isDateStrSeparatorCh( dateFormatStr ) ) {
			returnStr = `${year}年${zeroPadding(month)}月${zeroPadding(day)}日`;
		} else {
			returnStr = `${year}${separator}${zeroPadding(month)}${separator}${zeroPadding(day)}`;
		}
		returnStr += ` ${zeroPadding(hour)}:${zeroPadding(minute)}`;
	} else if ( /^mm(.{1})dd hh:mm$/.test( dateFormatStr ) ) {
		if ( _isDateStrSeparatorCh( dateFormatStr ) ) {
			returnStr = `${zeroPadding(month)}月${zeroPadding(day)}日`;
		} else {
			separator = _getDateStrSeparator( dateFormatStr, 2, 3 );
			returnStr = `${zeroPadding(month)}${separator}${zeroPadding(day)}`;
		}
		returnStr += ` ${zeroPadding(hour)}:${zeroPadding(minute)}`;
	} else if ( /^yyyy(.{1})mm(.{1})dd$/.test( dateFormatStr ) ) {
		if ( _isDateStrSeparatorCh( dateFormatStr ) ) {
			returnStr = `${year}年${zeroPadding(month)}月${zeroPadding(day)}日`;
		} else {
			returnStr = `${year}${separator}${zeroPadding(month)}${separator}${zeroPadding(day)}`;
		}
	} else if ( /^mm(.{1})dd$/.test( dateFormatStr ) ) {
		if ( _isDateStrSeparatorCh( dateFormatStr ) ) {
			returnStr = `${zeroPadding(month)}月${zeroPadding(day)}日`;
		} else {
			separator = _getDateStrSeparator( dateFormatStr, 2, 3 );
			returnStr = `${zeroPadding(month)}${separator}${zeroPadding(day)}`;
		}
	} else if ( /^hh:mm:ss$/.test( dateFormatStr ) ) {
		returnStr = `${zeroPadding(hour)}:${zeroPadding(minute)}:${zeroPadding(second)}`;
	} else if ( /^hh:mm$/.test( dateFormatStr ) ) {
		returnStr = `${zeroPadding(hour)}:${zeroPadding(minute)}`;
	}
	return returnStr;
}
/**
 * [zeroPadding 小于10的数字补0，必填]
 * @param {[Int]} value [description]
 * @return {[String]} [description]
 */
export function zeroPadding( value ) {
	return value < 10 ? `0${value}` : value;
}
/**
 * [_isDateStrSeparatorCh 判断日期格式字符串的分隔符是否是中文]
 * @param {[String]} str [必填]
 * @return {[String]} [分隔符]
 */
function _getDateStrSeparator( str, startIndex, endIndex ) {
	startIndex = startIndex ? startIndex : 4;
	endIndex = endIndex ? endIndex : 5;
	let separator = str.slice( startIndex, endIndex );
	if ( separator === '年' || separator === '月' ) {
		separator = 'Ch';
	}
	return separator;
}
/**
 * [_isDateStrSeparatorCh 判断日期格式字符串的分隔符是否是中文]
 * @param {[String]} str [必填]
 * @return {[String]} [分隔符]
 */
function _isDateStrSeparatorCh( str ) {
	if ( str.indexOf( '年' ) != -1 || str.indexOf( '月' ) != -1 ) {
		return true;
	}
	return false;
}

/**
 * [countDownBySecond 倒计时]
 * @param {[Int]} restSeconds [剩余秒数，必填]
 * @param {[Int]} timeInterval [时间间隔，非必填，默认1000ms]
 * @param {[Function]} func [每倒计时一次，就需要执行一次的回调函数名，非必填]
 * @param {[Function]} endFun [倒计时结束需要执行的函数名，非必填]
 * @return {[null]} [无返回值]
 */
export function countDownBySecond( restSeconds, timeInterval, func, endCallback ) {
	let timer = null;
	let total = restSeconds;
	timeInterval = timeInterval ? timeInterval : 1000;
	timer = setInterval( function () {
		--total;
		if ( total <= 0 ) {
			clearInterval( timer );
			endCallback && endCallback();
		}
		func && func( total );
	}, timeInterval );
}

/**
 * 获取一个数字有多少时间
 * @param  {[type]} number [description]
 * @return {[type]}        [description]
 */
export function getDateByNumber( number ) {
	if ( number <= 0 ) return '';

	let seconds, minutes, hours

	hours = Math.floor( number / 3600 )
	minutes = Math.floor( ( number - hours * 3600 ) / 60 )
	seconds = Math.floor( ( number - hours * 3600 - minutes * 60 ) )

	return { hours, minutes, seconds }
}
