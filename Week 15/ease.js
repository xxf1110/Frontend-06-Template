export const linear = v => v

export function cubicBezier(x1, y1, x2, y2, precision) {
    precision = precision || 0.00001;

    var pow = Math.pow,
        abs = Math.abs;
    function yFn(t) {
        return (3 * y1 - 3 * y2 + 1) * pow(t, 3) + (3 * y2 - 6 * y1) * pow(t, 2) + 3 * y1 * t;
    }
    function xFn(t) {
        return (3 * x1 - 3 * x2 + 1) * pow(t, 3) + (3 * x2 - 6 * x1) * pow(t, 2) + 3 * x1 * t;
    }
    function resolveT(x) {
        var left = 0,
            right = 1,
            t,
            approximateX;
        // 夹逼法求t的近似解
        while (left < right) {
            t = (left + right) / 2;
            approximateX = xFn(t);
            if (abs(x - approximateX) < precision) {
                return t;
            } else if (x < approximateX) {
                right = t;
            } else {
                left = t;
            }
        }

        return t;
    }
    return function (x) {
        if (x <= 0) {
            return 0;
        }

        if (x >= 1) {
            return 1;
        }

        return yFn(resolveT(x));
    };
}


export const ease = cubicBezier(0.25, 0.1, 0.25, 1)
export const easeIn = cubicBezier(0.42, 0, 1, 1)
export const easeOut = cubicBezier(0, 0, 0.58, 1)
export const easeInOut = cubicBezier(0.42, 0, 0.58, 1)