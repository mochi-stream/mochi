# 🍡 Mochi - Anime Streaming Platform
Mochi is an anime streaming platform designed to provide a seamless and high-quality viewing experience. With a user-friendly interface and support for community interactions, Mochi makes it easy for users to enjoy their favorite anime series and connect with fellow fans.

## Table of Contents
  - [Features](#features)
  - [Upcoming Features](#upcoming-features)
  - [Getting Started](#getting-started)
  - [Technology Stack](#technology-stack)
  - [Credits](#credits)

## Features

- **User-Friendly & Interface:** Intuitive and easy-to-navigate design with a minimal aesthetic.
- **Comments on Stream Page:** Engage with other users by leaving comments on the stream page.
- **Social Integration and Authentication:** Secure sign-in options through Clerk, enabling social features and user authentication.
- **Watch History:** Track your viewing history to easily pick up where you left off.
- **Collections:** Organize your anime content into collections such as "Watching," "Planning to Watch," and more.

## Upcoming Features

- **Advanced Search:** Improved search capabilities to help users find their favorite anime more easily.
- **Ambience Around Player:** (TBD) Enhance the viewing experience with ambient design elements around the player.
- **Personalized Recommendations:** Suggestions based on viewing history and preferences.
- **Enhanced Community Features:** Additional social interaction options and community engagement tools.
- **Mobile App Enhancements:** Further improvements to the mobile app experience with new features and optimizations.

## Getting Started
To get started with Mochi, follow these steps:

1. Clone the Repository
    ```
    git clone https://github.com/mochi-stream/mochi
    ```
2. Navigate to the Project Directory
    ```
    cd mochi
    ```
3. Install Dependencies. Make sure you have [Node.js](https://nodejs.org/) installed. Then run:
   ```
   npm install
   ```
4. Create a Clerk Account and Set Up a Project
    
    - Go to [Clerk](https://clerk.dev) and sign up for an account if you don't have one.
    - Create a new project within your Clerk dashboard.
    - Obtain the **Publishable Key** and **Secret Key** from the Clerk project settings.
5. Create a Webhook
    - In your Clerk dashboard, navigate to the Webhooks section.
    - Create a new webhook and configure it to point to the following URL:
        - **Production:** `https://yourdomain.com/api/webhooks/clerk`
        - **Development (using ngrok):** Set up an ngrok tunnel to expose your local server and use the generated URL, e.g., `https://abcdefg.ngrok.io/api/webhooks/clerk`.
4. Set Up Environment Variables. Copy the content of `.env.example` and paste that into a new file `.env`
    - **`NEXT_PUBLIC_CONSUMET_URL`**: URL for the consumet API.
    - **`NEXT_PUBLIC_CORS_URL`**: URL for CORS configuration.
    - **`POSTGRES_PRISMA_URL`**: Prisma connection URL for PostgreSQL.
    - **`POSTGRES_URL_NON_POOLING`**: PostgreSQL URL for non-pooling connection.
    - **`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`**: Clerk publishable key obtained from the Clerk project settings.
    - **`CLERK_SECRET_KEY`**: Clerk secret key obtained from the Clerk project settings.
    - **`CLERK_WEBHOOK_SECRET`**: Webhook secret key used to validate incoming requests from Clerk.
5. Run the Development Server
   ```
   npm run dev
   ```

If you encounter any issues setting up the environment variables or configuring Clerk, please create an issue on for assistance.


## Technology Stack

- **Frontend:** Next.js, TypeScript, Shadcn
- **Backend:** Prisma, GraphQL
- **Database:** PostgreSQL
- **Authentication:** Clerk

## Credits

Mochi's user interface design is heavily inspired by the **[Kurosaw Anime Streaming Web App](https://dribbble.com/shots/22982773-Kurosaw-Anime-Streaming-Web-App)** on Dribbble. We would like to give credit to the original designer for their excellent work that inspired many of our design choices.
