module.exports = function (start, end) {
    start = Math.max(start, 0)
    const newEnd = Math.min(this.start + end, this.end)
    if (start === 0 && newEnd === this.end) {
        return this
    }
    const obj = Object.create(this.constructor.prototype)
    obj.start = this.start + start
    obj.end = newEnd
    obj.iterable = this.iterable
    return obj
}
