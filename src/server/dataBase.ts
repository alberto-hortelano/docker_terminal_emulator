import { MongoClient } from "mongodb";

/**
 * Connects to mongo and returns a mongo DB object
 */
export const getDB = async (url: string) => {
	try {
		const client = await MongoClient.connect(url, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});

		return client.db();
	} catch (err) {
		console.error(err);
	}
}