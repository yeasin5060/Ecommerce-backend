const register = async (req ,res) => {

    const {username , fullname , email , password} = req.body

    if([username , fullname , email , password].some((field) => field?.trim() === "")){
        console.log("all filed is require");
        res.json()
    }
}