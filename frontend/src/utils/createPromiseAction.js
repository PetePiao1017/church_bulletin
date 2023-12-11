export const createPromiseAction = (actionType) => {
    return (payload, resolve, reject) => ({
        type: actionType,
        payload,
        resolve,
        reject,
    })
}