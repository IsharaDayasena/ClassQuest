const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.PAYMENT_SECRET);

const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//mongodb connection

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@class.mvqea.mongodb.net/?retryWrites=true&w=majority&appName=Class`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //create a database and collections
    const database = client.db("Class");
    const userCollection = database.collection("users");
    const classesCollection = database.collection("classes");
    const cartCollection = database.collection("cart");
    const paymentCollection = database.collection("payments");
    const enrolledCollection = database.collection("enrolled");
    const appliedCollection = database.collection("applied");

    //classes routes here
    app.post("/new_class", async (req, res) => {
      const newClass = req.body;
      newClass.availableSeats = parseInt(newClass.availableSeats);
      const result = await classesCollection.insertOne(newClass);
      res.send(result);
    });
    app.get("/classes", async (req, res) => {
      const query = { status: "approved" };
      const result = await classesCollection.find().toArray();
      res.send(result);
    });
    app.get("/classes/:email", async (req, res) => {
      const email = req.params.email;
      const query = { instructorEmail: email };
      const result = await classesCollection.find(query).toArray();
      res.send(result);
    });

    //manage classes
    app.get("/classes_manage", async (req, res) => {
      const result = await classesCollection.find().toArray();
      res.send(result);
    });
    //update classes status and reason
    app.patch("/change_status/:id", async (req, res) => {
      const id = req.params.id;
      const status = req.body.status;
      const reason = req.body.reason;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          status: status,
          reason: reason,
        },
      };
      const result = await classesCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    app.get("/approved_classes", async (req, res) => {
      const query = { status: "approved" };
      const result = await classesCollection.find(query).toArray();
      res.send(result);
    });

    //get single class details
    app.get("/class/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await classesCollection.findOne(query);
      res.send(result);
    });
    //update class details
    app.put("/update_class/:id", async (req, res) => {
      const id = req.params.id;
      const updateClass = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: updateClass.name,
          description: updateClass.description,
          price: updateClass.price,
          availableSeats: parseInt(updateClass.availableSeats),
          videoLink: updateClass.videoLink,
          status: "pending",
        },
      };
      const result = await classesCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    //cart routes
    app.post("/add_to_cart", async (req, res) => {
      const newCartItem = req.body;

      const result = await cartCollection.insertOne(newCartItem);
      res.send(result);
    });
    //get cart items
    app.get("/cart_item/:id", async (req, res) => {
      const id = req.params.id;
      const email = req.body.email;
      const query = {
        class_id: id,
        userEmail: email,
      };
      const projection = { class_id: 1 };
      const result = await cartCollection.findOne(query, {
        projection: projection,
      });
      res.send(result);
    });

    //cart info by user email
    app.get("/cart/:email", async (req, res) => {
      const email = req.body.email;
      const query = {
        userEmail: email,
      };
      const projection = { class_id: 1 };
      const carts = await cartCollection.find(query, {
        projection: projection,
      });
      const class_ids = carts.map((cart)=> new ObjectId(cart.class_id))
      const query2 = {_id: {$in: class_ids}};
      const result = await cartCollection.find(query2).toArray();

      res.send(result);
    });

    //delete cart item
    app.delete("/delete_cart_item/:id", async (req, res) => {
        const id = req.params.id;
        const query = {class_id: id};
  
        const result = await cartCollection.deleteOne(query);
        res.send(result);
      });

    //payment routes
    app.post("/create-payment-intent", async (req, res) => {
        const { price } = req.body;
        const amount = parseInt(price)*100
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            payment_method_types: ["card"],
        })
        res.send({
            clientSecret: paymentIntent.client_secret,
         });
    })

    //post payment info to db
    app.post("/create-payment-intent", async (req, res) => {
        const paymentInfo = req.body;
        const classesId = paymentInfo.class_id;
        const userEmail = paymentInfo.userEmail;
        const singleClassId = req.query.class_id
        let query;
        if(singleClassId){
            query = { class_id: singleClassId, userMail: userEmail}
        }else{
            query = { class_id: {$in: classesId}}
       }
       const classesQuery = {_id:{$in : classesId.map( id => new ObjectId(id))}}
       const classes = await classesCollection.find(classesQuery).toArray();
       const newEnrolledData = {
        userEmail:userEmail,
        class_id: singleClassId,
        classes: classes,
       }
    })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
