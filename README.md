# theLab.ms Kiosk Project Test APIs

This project provides test APIs for theLab.ms Kiosk/Calender project

## Running the Project

The default port for this project is **3030**. To change the port, update the `.env` file.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Alternatively, you can use Docker Compose to run the server: `docker compose up -d`

Use [Postman](https://www.postman.com) to test the APIs or check out the events API at [http://localhost:3030/api/events]. There is a Postman collection, `theLabKiosk.postman_collection.json`, that can be used to test/explore the APIs using the collection variables.

## API Reference

### `GET /api/events`

**Description**

Retrieves a list of all events.

**Response**

A JSON array of event objects, in the format:

```typescript
{
    id: number,
    name: string,
    description: string,
    start: number,
    end: number,
    membersOnly: boolean,
    totalSeats: number,
    availableSeats: number
}
```

### `POST /api/kiosk/login`

**Description**

Authenticates a user and returns a session token.

**Headers**

```http
Content-Type: application/json
```

**Body Parameters**

Required:

- `fobid` *integer* - The unique identifier for the user's fob.

**Response**

| Status | Description |
| - | - |
| 200 | Authentication successful. Returns a session token in format ```{ accessToken: <JWT> }```. |
| 401 | Invalid\missing `fobid`. |

### `POST /api/events/:id/rsvp`

**Description**

RSVPs to an event using an `accessToken` from the login API.

**Path Parameters**

- `id` *integer* - The unique identifier for the event.

**Headers**

```http
Authentication: "Bearer <accessToken>"
```

**Response**

| Status | Description |
| - | - |
| 200 | RSVP successful. |
| 401 | Invalid\missing `accessToken`. |
| 404 | Event not found. |
