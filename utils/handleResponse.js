import _ from 'lodash';
export function handleQuerySuccess(ctx, msg, opts) {
    ctx.status = 200;
    ctx.body = Object.assign({
        status: 200,
        message: msg,
    }, {
        result: opts
    })
}

export function handleFail (ctx, errcode, errmsg, data = undefined) {
    ctx.status = errcode;
    ctx.body = Object.assign({
        status: errcode,
        message: errmsg,
    }, {
        result: data,
    })
}

export function handleEmptyParams (ctx, params) {
    for (key in params) {
        if (_.isUndefined(params[key])) {
            handleFail(ctx, 400, `need ${key} param`)
        }
    }
}