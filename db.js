const mongoose = require("mongoose"); 

module.exports = () => {
	try {
		mongoose.connect(process.env.DB); // No need for connection parameters anymore
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect to database!");
	}
};
