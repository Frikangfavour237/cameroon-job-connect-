# MongoDB Quick Reference for Kamerwork Developers

This guide provides quick reference for common MongoDB operations and MongoDB Compass usage for the Kamerwork project.

## Table of Contents
- [MongoDB Shell Commands](#mongodb-shell-commands)
- [MongoDB Compass GUI Guide](#mongodb-compass-gui-guide)
- [Kamerwork Collections](#kamerwork-collections)
- [Common Queries](#common-queries)
- [Data Management](#data-management)
- [Backup and Restore](#backup-and-restore)
- [Troubleshooting](#troubleshooting)

---

## MongoDB Shell Commands

### Connecting to MongoDB

```bash
# Open MongoDB shell (local)
mongosh

# Connect to specific database
mongosh --uri "mongodb://localhost:27017/kamerwork"

# Connect to MongoDB Atlas (cloud)
mongosh "mongodb+srv://<username>:<password>@cluster.mongodb.net/kamerwork"
```

### Database Operations

```bash
# Show all databases
show dbs

# Use a database
use kamerwork

# Show current database
db

# Delete current database
db.dropDatabase()

# Create database (implicit with first collection)
use newdatabase
db.newcollection.insertOne({ name: "test" })
```

### Collection Operations

```bash
# Show all collections
show collections

# Get collection count
db.users.countDocuments()

# Get collection size
db.users.stats()

# Drop collection
db.users.drop()

# Create collection with validation
db.createCollection("users", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["email", "password"],
            properties: {
                email: { bsonType: "string" },
                password: { bsonType: "string" }
            }
        }
    }
})
```

### Document Operations

```bash
# Insert one document
db.users.insertOne({
    email: "user@example.com",
    password: "hashed_password",
    role: "USER",
    createdAt: new Date()
})

# Insert multiple documents
db.users.insertMany([
    { email: "user1@example.com", role: "USER" },
    { email: "user2@example.com", role: "EMPLOYER" }
])

# Find all documents
db.users.find()

# Find with query
db.users.find({ role: "EMPLOYER" })

# Find one document
db.users.findOne({ email: "user@example.com" })

# Count matching documents
db.users.countDocuments({ role: "EMPLOYER" })

# Update one document
db.users.updateOne(
    { email: "user@example.com" },
    { $set: { role: "ADMIN" } }
)

# Update multiple documents
db.users.updateMany(
    { role: "USER" },
    { $set: { isActive: true } }
)

# Delete one document
db.users.deleteOne({ email: "user@example.com" })

# Delete multiple documents
db.users.deleteMany({ role: "INACTIVE" })
```

### Query Operations

```bash
# Find with filter
db.audit_logs.find({ email: "user@example.com" })

# Find with conditions
db.audit_logs.find({
    action: "LOGIN",
    createdAt: { $gte: new Date("2026-04-01") }
})

# Find with projection (select fields)
db.users.find(
    { role: "EMPLOYER" },
    { email: 1, name: 1, createdAt: 1 }
)

# Find with sorting
db.audit_logs.find().sort({ createdAt: -1 }).limit(10)

# Find with limit and skip (pagination)
db.users.find().skip(10).limit(5)

# Pretty print results
db.users.find().pretty()
```

### Index Operations

```bash
# Create index on email
db.users.createIndex({ email: 1 })

# Create unique index
db.users.createIndex({ email: 1 }, { unique: true })

# Create compound index
db.audit_logs.createIndex({ email: 1, createdAt: -1 })

# List all indexes
db.users.getIndexes()

# Drop index
db.users.dropIndex({ email: 1 })

# Drop all indexes (except _id)
db.users.dropIndexes()
```

### Aggregation

```bash
# Count by role
db.users.aggregate([
    { $group: { _id: "$role", count: { $sum: 1 } } }
])

# Get average login duration
db.audit_logs.aggregate([
    { $match: { action: "LOGIN" } },
    { $group: {
        _id: null,
        avgDuration: { $avg: "$duration" }
    }}
])

# Get top actions
db.audit_logs.aggregate([
    { $group: { _id: "$action", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 }
])
```

---

## MongoDB Compass GUI Guide

### Opening MongoDB Compass

**Windows:**
- Start Menu → MongoDB Compass
- Or open application directly

**macOS:**
- Applications → MongoDB Compass
- Or use Spotlight (Cmd + Space) and search "Compass"

**Linux:**
```bash
mongodb-compass
```

### Connecting to Database

#### Local MongoDB
1. Click "New Connection"
2. Enter: `mongodb://localhost:27017`
3. Click "Connect"
4. See databases in left sidebar

#### MongoDB Atlas (Cloud)
1. Go to MongoDB Atlas → Cluster → Connect
2. Select "Connect with MongoDB Compass"
3. Copy connection string
4. In Compass: Click "New Connection"
5. Paste connection string
6. Click "Connect"

### Viewing Collections

1. Click `kamerwork` database in left sidebar
2. See all collections listed
3. Click on collection to view documents
4. Documents appear in tabular format
5. Click on document to expand and see all fields

### Searching/Filtering Data

#### Apply Filter
1. Click collection name
2. Click "ADD FILTER" button
3. Enter MongoDB query:
   ```json
   { "email": "user@example.com" }
   ```
4. Click "Find"

#### Common Filters
```javascript
// Find all employers
{ "role": "EMPLOYER" }

// Find users created after date
{ "createdAt": { "$gte": new Date("2026-04-01") } }

// Find failed logins
{ "action": "FAILED_LOGIN" }

// Find active sessions
{ "isActive": true }

// Combine conditions (AND)
{ "role": "USER", "isActive": true }
```

### Inserting Documents

1. Click collection
2. Click "+ INSERT DOCUMENT" button
3. Enter JSON:
   ```json
   {
     "email": "newuser@example.com",
     "password": "hashed_password",
     "role": "USER",
     "createdAt": new Date(),
     "isActive": true
   }
   ```
4. Click "Insert"

### Editing Documents

1. Find document in collection
2. Click the document row
3. Click "Edit" button
4. Modify field values
5. Click "Update"

### Deleting Documents

1. Right-click on document
2. Select "Delete Document"
3. Confirm deletion

### Exporting Data

1. Right-click on collection
2. Select "Export Collection"
3. Choose format:
   - **JSON**: For backup or analysis
   - **CSV**: For spreadsheet programs
4. Select export location
5. Click "Export"

### Importing Data

1. Right-click on database
2. Select "Import Collection"
3. Choose file (JSON or CSV)
4. Click "Import"

### Running Aggregations

1. Click collection
2. Click "AGGREGATIONS" tab
3. Add pipeline stages:
   ```json
   [
     { "$match": { "role": "EMPLOYER" } },
     { "$group": { "_id": null, "count": { "$sum": 1 } } }
   ]
   ```
4. Click "Execute Pipeline"

---

## Kamerwork Collections

### Users Collection

**Collection Name:** `users`

**Fields:**
```javascript
{
  "_id": ObjectId,
  "email": "user@example.com",        // Unique
  "password": "hashed_password",       // Never store plain text
  "name": "User Name",
  "role": "USER|EMPLOYER|SUPERADMIN",
  "phone": "+1234567890",
  "profilePicture": "url_or_path",
  "bio": "User biography",
  "companyName": "Company Inc",        // For employers
  "industry": "Technology",            // For employers
  "isActive": true,
  "emailVerified": false,
  "lastLogin": new Date(),
  "createdAt": new Date(),
  "updatedAt": new Date()
}
```

**Useful Queries:**
```javascript
// Find all employers
db.users.find({ role: "EMPLOYER" })

// Find active users
db.users.find({ isActive: true })

// Find by email
db.users.findOne({ email: "user@example.com" })

// Count users by role
db.users.aggregate([
  { $group: { _id: "$role", count: { $sum: 1 } } }
])

// Find users created in April 2026
db.users.find({
  createdAt: {
    $gte: new Date("2026-04-01"),
    $lt: new Date("2026-05-01")
  }
})
```

### Audit Logs Collection

**Collection Name:** `audit_logs`

**Fields:**
```javascript
{
  "_id": ObjectId,
  "email": "user@example.com",
  "userId": "user_id_reference",
  "action": "LOGIN|LOGOUT|REGISTER|PAGE_VISIT|PASSWORD_RESET|FAILED_LOGIN",
  "sessionId": "session_identifier",
  "ipAddress": "192.168.1.1",
  "userAgent": "Mozilla/5.0...",
  "status": "SUCCESS|FAILED|ERROR",
  "errorMessage": "Error description if any",
  "duration": 1234,                  // Duration in milliseconds
  "url": "/page/endpoint",
  "timestamp": new Date(),
  "createdAt": new Date()
}
```

**Useful Queries:**
```javascript
// Get all logins for a user
db.audit_logs.find({ email: "user@example.com", action: "LOGIN" })

// Get failed login attempts
db.audit_logs.find({ action: "FAILED_LOGIN" })

// Get logs for a session
db.audit_logs.find({ sessionId: "session_id" })

// Get recent activities (last 7 days)
db.audit_logs.find({
  createdAt: { $gte: new Date(Date.now() - 7*24*60*60*1000) }
}).sort({ createdAt: -1 })

// Count actions by type
db.audit_logs.aggregate([
  { $group: { _id: "$action", count: { $sum: 1 } } }
])

// Get average login duration
db.audit_logs.aggregate([
  { $match: { action: "LOGIN", status: "SUCCESS" } },
  { $group: {
    _id: null,
    avgDuration: { $avg: "$duration" },
    totalLogins: { $sum: 1 }
  }}
])
```

---

## Common Queries

### User Queries

```javascript
// Find user by email
db.users.findOne({ email: "user@example.com" })

// Find all employers in Technology industry
db.users.find({ role: "EMPLOYER", industry: "Technology" })

// Find users who haven't logged in recently
db.users.find({
  lastLogin: { $lt: new Date(Date.now() - 30*24*60*60*1000) }
})

// Update user role
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "EMPLOYER" } }
)

// Delete inactive user
db.users.deleteOne({ _id: ObjectId("..."), isActive: false })
```

### Activity Queries

```javascript
// Get user's activity timeline
db.audit_logs.find({ email: "user@example.com" }).sort({ createdAt: -1 })

// Get login count per day
db.audit_logs.aggregate([
  { $match: { action: "LOGIN" } },
  { $group: {
    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
    count: { $sum: 1 }
  }},
  { $sort: { _id: -1 } }
])

// Find users with most failed logins
db.audit_logs.aggregate([
  { $match: { action: "FAILED_LOGIN" } },
  { $group: {
    _id: "$email",
    failureCount: { $sum: 1 }
  }},
  { $sort: { failureCount: -1 } },
  { $limit: 10 }
])

// Get average session duration
db.audit_logs.aggregate([
  { $match: { action: "LOGIN" } },
  { $group: {
    _id: "$email",
    avgSessionDuration: { $avg: "$duration" }
  }}
])
```

---

## Data Management

### Backup Operations

#### Backup Entire Database

```bash
# Backup to directory
mongodump --uri="mongodb://localhost:27017/kamerwork" --out=./backup

# Backup specific collection
mongodump --uri="mongodb://localhost:27017/kamerwork" --collection=users --out=./backup
```

#### Using MongoDB Compass
1. Right-click collection
2. Select "Export Collection"
3. Choose JSON format
4. Save to backup location

### Restore Operations

```bash
# Restore entire database
mongorestore --uri="mongodb://localhost:27017/kamerwork" ./backup/kamerwork

# Restore specific collection
mongorestore --uri="mongodb://localhost:27017/kamerwork" --collection=users ./backup/kamerwork/users.bson
```

### Data Cleanup

```javascript
// Remove old audit logs (older than 90 days)
db.audit_logs.deleteMany({
  createdAt: { $lt: new Date(Date.now() - 90*24*60*60*1000) }
})

// Remove failed login attempts older than 30 days
db.audit_logs.deleteMany({
  action: "FAILED_LOGIN",
  createdAt: { $lt: new Date(Date.now() - 30*24*60*60*1000) }
})

// Archive logs to separate collection
db.audit_logs_archive.insertMany(
  db.audit_logs.find({
    createdAt: { $lt: new Date(Date.now() - 90*24*60*60*1000) }
  }).toArray()
)

db.audit_logs.deleteMany({
  createdAt: { $lt: new Date(Date.now() - 90*24*60*60*1000) }
})
```

---

## Troubleshooting

### MongoDB Connection Issues

**Problem:** Cannot connect to MongoDB

**Solutions:**
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB (if not running)
mongod

# Windows service
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Database Access Issues

**Problem:** Permission denied or authentication failed

```bash
# If using MongoDB with authentication:
mongosh "mongodb://username:password@localhost:27017/kamerwork"

# Create user (if needed)
db.createUser({
  user: "kamerwork_user",
  pwd: "secure_password",
  roles: [{ role: "readWrite", db: "kamerwork" }]
})
```

### Performance Issues

```javascript
// Check slow queries
db.setProfilingLevel(1, { slowms: 100 })

// View profiling data
db.system.profile.find().sort({ ts: -1 }).limit(10).pretty()

// Create indexes for better performance
db.users.createIndex({ email: 1 })
db.audit_logs.createIndex({ email: 1, createdAt: -1 })

// Check query execution plan
db.audit_logs.find({ email: "user@example.com" }).explain("executionStats")
```

### Storage Issues

```javascript
// Check database size
db.stats()

// Check collection size
db.users.stats()

// Remove duplicate documents
db.users.aggregate([
  { $group: { _id: "$email", doc: { $first: "$$ROOT" } } },
  { $replaceRoot: { newRoot: "$doc" } }
])

// Compact database
db.runCommand({ compact: "users" })
```

---

## Tips and Best Practices

### Performance
- Create indexes on frequently queried fields
- Use projections to select only needed fields
- Limit large result sets with pagination
- Archive old logs to improve query performance

### Data Integrity
- Validate data before insertion
- Use unique indexes for critical fields (email)
- Implement soft deletes for audit trail
- Regular backups of important collections

### Security
- Never store plain text passwords
- Use hashed and salted passwords
- Restrict database access
- Audit all data modifications
- Regular security audits

### Development
- Use MongoDB Compass for data exploration
- Test queries in shell before using in code
- Document complex queries
- Keep database schema clean and organized

---

## Useful Links

- **MongoDB Documentation**: https://docs.mongodb.com/manual/
- **MongoDB Compass Guide**: https://docs.mongodb.com/compass/
- **MongoDB Shell Reference**: https://docs.mongodb.com/manual/reference/method/
- **Aggregation Pipeline**: https://docs.mongodb.com/manual/reference/operator/aggregation/

---

**Last Updated**: April 2026
**Version**: 1.0
