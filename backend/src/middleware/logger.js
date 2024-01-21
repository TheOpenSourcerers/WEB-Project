export const logger = (req, res, next) => {
    console.log("->", req.method, req.url);
    console.log("<-", res.statusCode);
    console.log(req.body);

    next();
};
