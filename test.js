const test = require('tape')
const tapSpec = require('tap-spec')

const sliceMethod = require('./')

let result

test('slice method', function (t) {
    t.test('no sliced object', function (st) {
        const obj = Object.freeze({
            start: 0,
            end: 6,
            iterable: [1, 3]
        })
        result = sliceMethod.call(obj, 0, 8)
        st.equal(result, obj)

        result = sliceMethod.call(obj, 0, 4)
        st.deepEqual(result, {
            start: 0,
            end: 4,
            iterable: obj.iterable
        })

        result = sliceMethod.call(obj, 2, 4)
        st.deepEqual(result, {
            start: 2,
            end: 4,
            iterable: obj.iterable
        })

        result = sliceMethod.call(obj, -2, 5)
        st.deepEqual(result, {
            start: 0,
            end: 5,
            iterable: obj.iterable
        })

        result = sliceMethod.call(obj, 5, 6)
        st.deepEqual(result, {
            start: 5,
            end: 6,
            iterable: obj.iterable
        })

        result = sliceMethod.call(obj, 6, 10)
        st.ok(result.start >= result.end)

        result = sliceMethod.call(obj, 4, 2)
        st.ok(result.start >= result.end)

        result = sliceMethod.call(obj, 0, 0)
        st.ok(result.start >= result.end)

        result = sliceMethod.call(obj, 3, 3)
        st.ok(result.start >= result.end)

        st.end()
    })

    t.test('non empty sliced object', function (st) {
        const obj = Object.freeze({
            start: 2,
            end: 5,
            iterable: [8, 2]
        })
        result = sliceMethod.call(obj, 0, 8)
        st.equal(result, obj)

        result = sliceMethod.call(obj, 0, 2)
        st.deepEqual(result, {
            start: 2,
            end: 4,
            iterable: obj.iterable
        })

        result = sliceMethod.call(obj, 1, 4)
        st.deepEqual(result, {
            start: 3,
            end: 5,
            iterable: obj.iterable
        })

        result = sliceMethod.call(obj, 1, 2)
        st.deepEqual(result, {
            start: 3,
            end: 4,
            iterable: obj.iterable
        })

        result = sliceMethod.call(obj, 2, 3)
        st.deepEqual(result, {
            start: 4,
            end: 5,
            iterable: obj.iterable
        })

        result = sliceMethod.call(obj, 3, 4)
        st.ok(result.start >= result.end)

        result = sliceMethod.call(obj, 1, 1)
        st.ok(result.start >= result.end)

        st.end()
    })

    t.test('start === end sliced object', function (st) {
        const obj = Object.freeze({
            start: 2,
            end: 2,
            iterable: [5, 4]
        })
        result = sliceMethod.call(obj, 0, 8)
        st.equal(result, obj)

        result = sliceMethod.call(obj, 0, 2)
        st.equal(result, obj)

        result = sliceMethod.call(obj, 1, 4)
        st.ok(result.start >= result.end)

        result = sliceMethod.call(obj, 1, 2)
        st.ok(result.start >= result.end)

        result = sliceMethod.call(obj, 2, 3)
        st.ok(result.start >= result.end)

        result = sliceMethod.call(obj, 3, 4)
        st.ok(result.start >= result.end)

        st.end()
    })

    t.test('start > end sliced object', function (st) {
        const obj = Object.freeze({
            start: 4,
            end: 2,
            iterable: [2, 7]
        })
        result = sliceMethod.call(obj, 0, 8)
        st.ok(result.start >= result.end)

        result = sliceMethod.call(obj, 0, 2)
        st.ok(result.start >= result.end)

        result = sliceMethod.call(obj, 1, 4)
        st.ok(result.start >= result.end)

        result = sliceMethod.call(obj, 1, 2)
        st.ok(result.start >= result.end)

        result = sliceMethod.call(obj, 2, 3)
        st.ok(result.start >= result.end)

        result = sliceMethod.call(obj, 3, 4)
        st.ok(result.start >= result.end)

        st.end()
    })

    t.test('returns the same type', function (st) {
        function Foo () {
            this.start = 3
            this.end = 5
        }

        result = sliceMethod.call(new Foo(), 0, 1)
        st.equal(Object.getPrototypeOf(result), Foo.prototype)
        st.end()
    })
})

test.createStream()
    .pipe(tapSpec())
    .pipe(process.stdout)
