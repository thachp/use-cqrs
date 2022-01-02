export const isFunction = function (obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
};

export default isFunction;
