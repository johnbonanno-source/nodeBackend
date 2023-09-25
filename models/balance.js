const { Mongoose } = require("mongoose");

const balanceSchema = new Mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
          },
        balance: {type: Number, required: true}
    }
)