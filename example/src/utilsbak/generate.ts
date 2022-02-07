/*!
 * @author xieyifeng
 * @date 2022/1/24
 */

/**
 * 生成随机ID
 * @param [length] {number} 可选，输出的id长度，默认为12
 * @return {string}
 */
export function generateId(length = 12) {
	let result = '';
	const baseLength = 4;
	for (let i = 0; i < ~~(length / baseLength); i++) {
		result += Math.random().toString(32).substr(2, baseLength);
	}
	const more = length % baseLength;
	if (more > 0) {
		result += Math.random()
			.toString(32)
			.substr(2, more + 2);
	}
	return result;
}

/**
 * uuid
 * @return {string}
 */
export function uuid() {
	return generateId(8) + '-' + generateId(4) + '-' + generateId(4) + '-' + generateId(4) + '-' + generateId(12);
}
