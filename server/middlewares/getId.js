const HandleGetID = (DB) => {
    return async (req, res, next) => {
        let Id = "";
        const data = await DB.find();

        for(let item of data){
            if(!item.ProcessInAction){
                Id = item._id
                break
            }
        }

        req.ID = Id;
        next();
    }
}

module.exports = HandleGetID;