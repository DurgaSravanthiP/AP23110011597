# Notification System Design

## Stage 1: API Design

The notification system provides APIs to manage user notifications such as events, placements, and results. These APIs are designed to be simple, consistent, and easy to use.

### Endpoints:

### 1. GET /notifications

- Description: Fetch all notifications for a user
- Response:

```
{
  "notifications": [
    {
      "id": "string",
      "type": "Event | Placement | Result",
      "message": "string",
      "timestamp": "datetime"
    }
  ]
}
```

### 2. POST /notifications

- Description: Create a new notification
- Request:

```
{
  "type": "string",
  "message": "string"
}
```

### 3. PUT /notifications/:id

- Description: Mark a notification as read

This design ensures clean structure and supports real-time notification systems.

---

## Stage 2: Database Design

A relational database such as PostgreSQL is suitable for storing notifications.

### Table: notifications

- id (Primary Key)
- studentId
- type
- message
- isRead (boolean)
- createdAt (timestamp)

### Challenges at Scale:

- Large number of records (millions of notifications)
- Slow query performance

### Solutions:

- Use indexing on important fields like studentId and isRead
- Implement pagination (limit, offset)
- Archive old notifications if needed

---

## Stage 3: Query Optimization

Given Query:

```
SELECT * FROM notifications
WHERE studentID = 1042 AND isRead = false
ORDER BY createdAt DESC;
```

### Issues:

- Performs full table scan when dataset grows
- Slow due to lack of proper indexing

### Important Note:

Adding indexes on every column is not effective because:

- Increases storage usage
- Slows down insert and update operations
- Not all columns are required for filtering

### Optimized Approach:

Use a composite index on:

```
(studentID, isRead, createdAt)
```

### Improved Query:

```
SELECT * FROM notifications
WHERE studentID = 1042
AND isRead = false
AND createdAt >= NOW() - INTERVAL '7 days'
AND notificationType = 'Placement'
ORDER BY createdAt DESC;
```

This improves performance significantly by reducing scanned data.

---

## Stage 4: Performance Improvement

### Problem:

Notifications are fetched completely on every page load, which causes:

- Increased database load
- Slow response time
- Poor user experience

### Solutions:

- Use pagination (limit, offset)
- Load only unread notifications initially
- Cache frequently accessed notifications (e.g., Redis)
- Lazy loading for older notifications

### Trade-offs:

- Pagination improves performance but adds complexity
- Caching improves speed but requires cache management

---

## Stage 5: Reliable Notification System

### Issues in Current Implementation:

- If email sending fails, notification is still stored in DB
- No retry mechanism
- Tight coupling between DB and email service

### Improved Solution:

- Use a message queue (Kafka / RabbitMQ)
- First store notification in DB
- Then push event to queue
- Worker service processes queue and sends emails
- Failed messages can be retried

### Benefits:

- Decouples system components
- Improves reliability
- Supports scalability

---

## Stage 6: Priority Notifications

### Goal:

Display top important notifications based on priority.

### Priority Calculation:

```
Priority Score = Weight + Recency
```

### Weight Assignment:

- Placement → 3
- Event → 2
- Result → 1

Recent notifications are given higher importance.

### Steps:

1. Fetch notifications from API
2. Assign priority score based on type and timestamp
3. Sort notifications based on score
4. Return top 10 notifications

### Result:

Efficient prioritization and better user experience.

---

## Conclusion

The notification system is designed to be scalable, efficient, and reliable. By using proper API design, database optimization, caching, and asynchronous processing, the system can handle large-scale real-time notifications effectively.
