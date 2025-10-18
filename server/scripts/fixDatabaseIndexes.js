// Script to fix database index issues
// Run this script if you're getting duplicate key errors

import mongoose from 'mongoose';
import Event from '../models/eventSchema.js';

const fixDatabaseIndexes = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI_01);
    console.log('Connected to MongoDB');

    // Get the events collection
    const eventsCollection = mongoose.connection.db.collection('events');

    // List all indexes
    console.log('Current indexes:');
    const indexes = await eventsCollection.indexes();
    indexes.forEach(index => {
      console.log(JSON.stringify(index, null, 2));
    });

    // Check if there's a problematic index on 'id' field
    const idIndex = indexes.find(index => 
      index.key && index.key.id !== undefined
    );

    if (idIndex) {
      console.log('\nFound problematic index on id field:');
      console.log(JSON.stringify(idIndex, null, 2));
      
      // Drop the problematic index
      try {
        await eventsCollection.dropIndex(idIndex.name);
        console.log(`\n✅ Dropped index: ${idIndex.name}`);
      } catch (error) {
        console.log(`\n❌ Error dropping index: ${error.message}`);
      }
    } else {
      console.log('\n✅ No problematic index found on id field');
    }

    // List indexes again to confirm
    console.log('\nUpdated indexes:');
    const updatedIndexes = await eventsCollection.indexes();
    updatedIndexes.forEach(index => {
      console.log(JSON.stringify(index, null, 2));
    });

    console.log('\n✅ Database index fix completed');
    
  } catch (error) {
    console.error('❌ Error fixing database indexes:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the script
fixDatabaseIndexes();