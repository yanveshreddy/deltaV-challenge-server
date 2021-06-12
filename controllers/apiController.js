const time = require("../libs/timeLib");
const apiResponseFormat = require("../libs/responseLib");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const dbPath = path.join(__dirname, "../deltavrobo.db");

let db = null;

const initializeDB = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

const createTreeFormData = async (request, response) => {
  await initializeDB();
  const { userName, parentId } = request.body;
  console.log(userName);
  try {
    const createQuery = `
                      INSERT INTO
                      family_details (name)
                      VALUES
                      (
                          '${userName}'
                      )`;
    console.log(createQuery);
    const dbResponse = await db.run(createQuery);
    // const newUserId = dbResponse.lastID;
    let apiResponse = apiResponseFormat.generate(
      false,
      "data succesfully inserted",
      200,
      dbResponse
    );
    response.send(apiResponse);
    // await db.close();
  } catch (error) {
    console.log(error);
    response.send(error);
    // await db.close();
  }
};

const getParentData = async (request, response) => {
  await initializeDB();
  const getParentDataQuery = `
    SELECT
      *
    FROM
    family_details;`;
  try {
    const dbResponse = await db.all(getParentDataQuery);
    console.log(dbResponse);
    let apiResponse = apiResponseFormat.generate(
      false,
      "Parent details retrieved successfully",
      200,
      dbResponse
    );
    // console.log(apiResponse);
    response.send(apiResponse);
    // await db.close();
  } catch (error) {
    console.log(error);
    response.send(error);
    // await db.close();
  }
};

module.exports = {
  createTreeFormData: createTreeFormData,
  getParentData: getParentData,
};
