const express = require("express");
const multer = require("multer");
const cors = require("cors");
const sql = require("mssql/msnodesqlv8");
const { Request } = require("mssql/msnodesqlv8");
const app = express();
const jwt = require("jsonwebtoken");
const secretkey = "webwave";
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Enable CORS for all routes
app.use(cors());

var config = {
  server: "LAPTOP-APO8DDQJ\\SQLEXPRESS",
  database: "MindLens_DB",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
  },
};

// Connect to the database
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to SQL Server");
    return pool;
  })
  .catch((err) => console.log("Database Connection Failed! Bad Config: ", err));

// Define your API endpoint
app.get("/api/mergedData", async (req, res) => {
  try {
    const pool = await poolPromise;

    // Execute SELECT queries for option, Category and Questions tables
    const categoryQuery = `select Category_ID as CategoryID, Category_name as CategoryName from Category`;
    const questionsQuery = `select Question_ID as QuestionID, Category_ID as CategoryID, Question_name as QuestionName from Questions`;
    const optionQuery = `select Option_ID as OptionID, Question_ID as QuestionID , Options_DESCR as OptionDescr from Options`;

    const categoryRequest = pool.request();
    const categoryResults = await categoryRequest.query(categoryQuery);
    console.log("Category Results:", categoryResults.recordset); // Log category results

    const questionsRequest = pool.request();
    const questionsResults = await questionsRequest.query(questionsQuery);
    console.log("Questions Results:", questionsResults.recordset); // Log questions results

    const optionRequest = pool.request();
    const optionResults = await optionRequest.query(optionQuery);
    console.log("Option Results:", optionResults.recordset); // Log option results

    // Merge the data based on the common categoryID
    const mergedData = mergeData(
      categoryResults.recordset,
      questionsResults.recordset,
      optionResults.recordset
    );
    console.log("Merged Data:", mergedData); // Log merged data

    // Send the merged data as JSON response
    res.json(mergedData);
  } catch (err) {
    console.error("Error executing queries:", err);
    res.status(500).send("Internal server error");
  }
});

// Function to merge data based on the common categoryID
function mergeData(categoryData, questionsData, optionsData) {
  const mergedData = [];

  // Loop through each category
  categoryData.forEach((category) => {
    const categoryInfo = {
      categoryID: category.CategoryID,
      categoryName: category.CategoryName,
      questions: [],
    };

    // Loop through questions to find matching categoryID
    questionsData.forEach((question) => {
      if (question.CategoryID === category.CategoryID) {
        const questionInfo = {
          questionID: question.QuestionID,
          questionName: question.QuestionName,
          options: [], // Initialize options array for each question
        };

        // Loop through options to find matching QuestionID
        optionsData.forEach((option) => {
          if (option.QuestionID === question.QuestionID) {
            // Check for matching QuestionID
            questionInfo.options.push({
              OptionID: option.OptionID,
              OptionDescr: option.OptionDescr, // Corrected property name
            });
          }
        });

        categoryInfo.questions.push(questionInfo);
      }
    });

    // Push categoryInfo to mergedData
    mergedData.push(categoryInfo);
  });

  return mergedData;
}

app.post("/api/saveQuesion", upload.none(), async (req, res) => {
  try {
    const pool = await poolPromise;
    const formData = req.body; // FormData from the request
    const quesion = formData.questionname; // Assuming category is one of the form fields
    const categoryID = formData.categoryID;
    // Connect to MSSQL
    await sql.connect(config);

    // // Execute query to get the next available Category_ID
    // const ExistCategoryID = await pool.query(
    //   `SELECT Category_ID AS CategoryID FROM Category WHERE Category_name = '${categoryName}'`
    // );

    // Execute query to get the next available Question_ID
    const NewQuestionID = await pool.query(
      "SELECT MAX(Question_ID)+1 AS NextID FROM Questions"
    );
    const nextId = NewQuestionID.recordset[0].NextID;
    // Insert query
    const result =
      await pool.query`INSERT INTO Questions (Question_ID,Category_ID,Question_name) VALUES (${nextId},${categoryID},${quesion})`;

    // Respond with success message or inserted data
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    sql.close();
  }
});

app.post("/api/saveCategory", upload.none(), async (req, res) => {
  try {
    const pool = await poolPromise;
    const formData = req.body;
    const category = formData.category;
    console.log("aaaaa", req.body);
    // Connect to MSSQL
    await sql.connect(config);

    // Execute query to get the next available Category_ID
    const nextIdQuery = "SELECT MAX(Category_ID)+1 AS NextID FROM Category";
    const resultID = await pool.query(nextIdQuery);
    const nextId = resultID.recordset[0].NextID;
    // Insert query
    const result =
      await pool.query`INSERT INTO Category (Category_ID,Category_name) VALUES (${nextId},${category})`;

    // Respond with success message or inserted data
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    sql.close();
  }
});

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
