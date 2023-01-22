require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

module.exports = {
	MONGODB_URL,
	PORT,
};
