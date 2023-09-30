
require('dotenv').config();
const OpenAI = require("openai");
const express=require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser=require('body-parser')

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY 
});

const app=express()
app.use(express.json());
app.use(bodyParser.json());
const port=3001
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/Story', {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => console.log("Connected to MongoDBn")).catch(console.error);

const Story = require('./models/Stories');

app.post('/', async (req, res) => {
  const { message } = req.body;
  try {
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `${message}`+"Complete this story",
      max_tokens: 500,
      temperature: 0.5,
    });
    const story = new Story({
      Prompt: `${message}`,
      Story: completion.choices[0].text,
    });

    const result=await story.save(); 

    res.json({
      message: completion.choices[0].text,
    });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.post('/update', async (req, res) => {
  const { Story: storyToUpdate } = req.body; 
  console.log(storyToUpdate);

  try {
   
    const query = { Story: storyToUpdate };
  
    const update = { $inc: { UpVote: 1 } };

    const updatedDocument = await Story.findOneAndUpdate(query, update, {
      new: true,
    });

    if (updatedDocument) {
      console.log(`Successfully updated the UpVote for ${storyToUpdate}`);
      res.json({ message: 'UpVote successfully updated' });
    } else {
      console.error(`Document with Story "${storyToUpdate}" not found`);
      res.status(404).json({ error: 'Document not found' });
    }
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/Stories',async(req,res)=>{
  try{
    const result=await Story.find({})
    res.json(result)
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
})

app.get('/LeaderBoard', async (req, res) => {
  try {
    const result = await Story.find({}).sort({ UpVote: -1 }).limit(10);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(port,()=>{
  console.log(`listening: localhost:${port}`);
})