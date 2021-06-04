class Trades {
  async create(req,res) {
    try {
        const userCollection = await User
        .create({
            email : req.body.email,
        });

        res.status(201).send(userCollection);
    }
    catch(e){
        console.log(e);
        res.status(400).send(e);
    }              
  }
}