### Events

## Backend

- **Framework**: NestJS (TypeScript)
- **Validation**: `class-validator` / `class-transformer`
- **Queue**: BullMQ + Redis
- **Docs**: Swagger

### Backend setup

```bash
cd backend
npm install

npm run start:dev
```

- API base URL: `http://localhost:3001`
- Swagger docs: `http://localhost:3001/api`

### Backend endpoints (short)

**Events**

- `GET /events`
  - Returns a paginated list of events.
  - Query params: `page`, `limit`, `search`, `dateFrom`, `dateTo`.
  - Response shape:

    ```
    {
      "data": [],
      "total": 0,
      "page": 1,
      "limit": 10,
      "totalPages": 1
    }
    ```

- `GET /events/:id`
  - Returns full event details by id.
  - `404 Not Found` if event does not exist.

**Registrations**

- `POST /events/:id/register`
  - Body:

    ```
    {
      "fullName": "string",
      "email": "string",
      "phone": "string"
    }
    ```

  - Validates input, stores registration in memory and enqueues a BullMQ job.

- `GET /registrations`
  - Returns all registrations:
    - `eventId`, `eventTitle`, `fullName`, `email`, `phone`, `createdAt`.

---

## Frontend

- **Framework**: Next.js (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **API**: uses the backend from this repo (`NEXT_PUBLIC_API_BASE_URL`)

### Frontend setup

```bash
cd frontend
npm install

npm run dev
```

- App URL: `http://localhost:3000`

