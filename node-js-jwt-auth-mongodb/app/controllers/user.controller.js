exports.userAccess = (req, res) => {
    res.status(200).send("user payment");
};

exports.merchantAccess = (req, res) => {
    res.status(200).send("merchant payment");
};