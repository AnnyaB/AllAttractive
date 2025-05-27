const mongoose = require('mongoose');
const User = require('./models/User');  // Adjust path if needed

const MONGO_URI = 'mongodb://127.0.0.1:27017/krishna_users'; // your DB URI

async function removeDuplicates() {
  await mongoose.connect(MONGO_URI);

  console.log('Connected to MongoDB');

  // Find duplicate emails
  const duplicateEmails = await User.aggregate([
    { $group: { _id: "$email", count: { $sum: 1 }, ids: { $push: "$_id" } } },
    { $match: { count: { $gt: 1 } } }
  ]);

  console.log(`Found ${duplicateEmails.length} emails with duplicates.`);

  for (const dup of duplicateEmails) {
    // Keep the first, remove others
    const [keepId, ...removeIds] = dup.ids;
    await User.deleteMany({ _id: { $in: removeIds } });
    console.log(`Removed ${removeIds.length} duplicate users with email: ${dup._id}`);
  }

  // Similarly, check duplicates by username
  const duplicateUsernames = await User.aggregate([
    { $group: { _id: "$username", count: { $sum: 1 }, ids: { $push: "$_id" } } },
    { $match: { count: { $gt: 1 } } }
  ]);

  console.log(`Found ${duplicateUsernames.length} usernames with duplicates.`);

  for (const dup of duplicateUsernames) {
    // Keep the first, remove others
    const [keepId, ...removeIds] = dup.ids;
    await User.deleteMany({ _id: { $in: removeIds } });
    console.log(`Removed ${removeIds.length} duplicate users with username: ${dup._id}`);
  }

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}

removeDuplicates().catch(err => {
  console.error(err);
  mongoose.disconnect();
});
