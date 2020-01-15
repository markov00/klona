export default function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		tmp = {};
		for (k in x) {
			if (k === '__proto__') {
				Object.defineProperty(tmp, k, {
					value: klona(x[k]),
					configurable: 1,
					enumerable: 1,
					writable: 1,
				});
			} else {
				tmp[k] = klona(x[k]);
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=new Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set();
		for(var val of x) {
			tmp.add(klona(val));
		};
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map();
		for(var valKey of x) {
			tmp.set(klona(valKey[0]), klona(valKey[1]));
		};
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}
